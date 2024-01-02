import './Payment.css';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutSteps from '../Shipping/CheckoutSteps/CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useRef } from 'react';
import MetaData from '../layout/MetaData';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CreditCard, VpnKey, Event } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createNewOrderAction } from '../../redux/actions/orderAction';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.userState);
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  useEffect(() => {
    if (!orderInfo) {
      navigate('/cart');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const paymentData = {
    amount: Math.round(orderInfo && orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo && orderInfo.subTotal,
    taxPrice: orderInfo && orderInfo.tax,
    shippingPrice: orderInfo && orderInfo.shippingCharge,
    totalPrice: orderInfo && orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createNewOrderAction(order));
          navigate('/payment/success');
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (err) {
      payBtn.current.disabled = false;
      toast.error(err.response.data.message);
    }
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="payment-container">
        <form className="payment-form" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className="payment-input" />
          </div>
          <div>
            <Event />
            <CardExpiryElement className="payment-input" />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className="payment-input" />
          </div>
          <input
            type="submit"
            value={`Pay - ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="payment-form-btn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
