import './ConfirmOrder.css';
import { Fragment } from 'react';
import MetaData from '../../layout/MetaData';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmOrder = ({ activeSteps }) => {
  const { user } = useSelector((state) => state.userState);
  const { shippingInfo, cartItems } = useSelector((state) => state.cartState);
  const navigate = useNavigate();

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharge = subTotal < 1000 ? 200 : 0;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + shippingCharge + tax;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharge,
      tax,
      totalPrice,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/process/payment');
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />

      <div className="confirm-order">
        <div>
          <div className="confirm-shipping-area">
            <Typography>Shipping Info</Typography>
            <div className="confirm-shipping-area-box">
              <div>
                <p>Name: </p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone: </p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address: </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirm-cart-items">
            <Typography>Your Cart Items: </Typography>
            <div className="confirm-cart-items-container">
              {cartItems &&
                cartItems.map((item, index) => (
                  <div key={index}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{' '}
                    {'  '}
                    <span>
                      {item.quantity} X {item.price} $
                    </span>{' '}
                    ={'  '}
                    <b>{item.price * item.quantity} $</b>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="order-summary">
            <Typography>Order Summary: </Typography>
            <div>
              <div>
                <p>SubTotal: </p>
                <span>{subTotal} $</span>
              </div>
              <div>
                <p>Shipping Charge: </p>
                <span>{shippingCharge} $</span>
              </div>
              <div>
                <p>GST: </p>
                <span>{tax} $</span>
              </div>
            </div>
            <div className="order-summary-total">
              <p>
                <b>Total:</b>
              </p>
              <span>{totalPrice}</span>
            </div>
            <button onClick={() => proceedToPayment()}>
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
