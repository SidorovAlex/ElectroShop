import './ProcessOrder.css';
import { Fragment, useEffect, useState } from 'react';
import MetaData from '../../layout/MetaData';
import { Link, useParams } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { Typography } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { AccountTree } from '@mui/icons-material';
import {
  clearUpdateOrderStatusAction,
  getSingleOrderAction,
  updateOrderAction,
} from '../../../redux/actions/orderAction';
import { clearErrorAction } from '../../../redux/actions/appAction';
import Loader from '../../Loader/Loader';
import NotFound from '../../layout/NotFound/NotFound';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProcessOrder = () => {
  const [status, setStatus] = useState('');
  const { order, updateOrderStatus, isLoading } = useSelector(
    (state) => state.orderState
  );
  const { error } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (updateOrderStatus) {
      toast.success('Order Updated Successfully.');
      dispatch(clearUpdateOrderStatusAction());
    }

    dispatch(getSingleOrderAction(id));
  }, [dispatch, id, updateOrderStatus]);

  if (error) {
    toast.error(error.response.data.message);
    dispatch(clearErrorAction());
  }

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateOrderAction(status, id));
  };

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
              <MetaData title="Process Order -- Admin" />
              <div className="dashboard">
                <SideBar />
                <div className="processorder-container">
                  <div
                    className="order-details-page"
                    style={{
                      display:
                        order?.orderStatus === 'Delivered' ? 'block' : 'grid',
                    }}
                  >
                    <div>
                      <div className="process-shipping-area">
                        <Typography>Shipping Info</Typography>
                        <div className="process-shipping-area-box">
                          <p>Name:</p>
                          <span>{order.user?.name}</span>
                          {/* Add more shipping details as needed */}
                        </div>

                        <Typography>Payment</Typography>
                        <div className="process-shipping-area-box">
                          <p
                            className={
                              order.paymentInfo &&
                              order.paymentInfo.status === 'succeeded'
                                ? 'green-color'
                                : 'red-color'
                            }
                          >
                            {order.paymentInfo &&
                            order.paymentInfo.status === 'succeeded'
                              ? 'PAID'
                              : 'NOT PAID'}
                          </p>
                          <p>Amount:</p>
                          <span>{order.totalPrice && order.totalPrice}</span>
                          {/* Add more payment details as needed */}
                        </div>

                        <Typography>Order Status</Typography>
                        <div className="process-shipping-area-box">
                          <p
                            className={
                              order.orderStatus &&
                              order.orderStatus === 'Delivered'
                                ? 'green-color'
                                : 'red-color'
                            }
                          >
                            {order.orderStatus && order.orderStatus}
                          </p>
                          {/* Add more order status details as needed */}
                        </div>
                      </div>
                      <div className="process-cart-items">
                        <Typography>Your Cart Items:</Typography>
                        <div className="process-cart-items-container">
                          {order.orderItems &&
                            order.orderItems.map((item) => (
                              <div key={item.product}>
                                <img src={item.image} alt="Product" />
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>{' '}
                                <span>
                                  {item.quantity} X ${item.price} ={' '}
                                  <b>${item.price * item.quantity}</b>
                                </span>
                              </div>
                            ))}
                          {/* Add more cart item details as needed */}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display:
                          order.orderStatus === 'Delivered' ? 'none' : 'block',
                      }}
                    >
                      <form
                        className="processorder-form"
                        onSubmit={updateOrderSubmitHandler}
                      >
                        <h1>Process Order</h1>

                        <div>
                          <AccountTree />
                          <select
                            onChange={(e) => setStatus(e.target.value)}
                            required
                          >
                            <option value="">Choose Status</option>
                            {order.orderStatus === 'Processing' && (
                              <option value="Shipped">Shipped</option>
                            )}

                            {order.orderStatus === 'Shipped' && (
                              <option value="Delivered">Delivered</option>
                            )}
                          </select>
                        </div>

                        <button className="processorder-btn" type="submit">
                          Process Order
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default ProcessOrder;
