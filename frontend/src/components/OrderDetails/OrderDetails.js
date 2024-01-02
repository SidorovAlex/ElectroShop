import './OrderDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleOrderAction } from '../../redux/actions/orderAction';
import { clearErrorAction } from '../../redux/actions/appAction';
import MetaData from '../layout/MetaData';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import NotFound from '../layout/NotFound/NotFound';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { order, isLoading } = useSelector((state) => state.orderState);
  const { error } = useSelector((state) => state.appState);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleOrderAction(id));
  }, [id, dispatch]);

  if (error) {
    toast.error(error.response.data.message); // Replace alert with toast.error
    dispatch(clearErrorAction());
  }

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {!order ? (
            <NotFound />
          ) : (
            <Fragment>
              <MetaData title="Order Details" />
              <div className="order-details">
                <div className="order-details-container">
                  <Typography component="h1">
                    Order #{order && order._id}
                  </Typography>
                  <Typography>Shipping Info</Typography>
                  <div className="order-details-containerbox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Payment</Typography>
                  <div className="order-details-containerbox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === 'succeeded'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === 'succeeded'
                          ? 'PAID'
                          : 'NOT PAID'}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="order-details-containerbox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === 'Delivered'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="order-details-cart-items">
                  <Typography>Order Items:</Typography>
                  <div className="order-details-cart-items-container">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{' '}
                          <span>
                            {item.quantity} X ₹{item.price} ={' '}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
