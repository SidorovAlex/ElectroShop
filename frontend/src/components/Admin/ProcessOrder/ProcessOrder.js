import './ProcessOrder.css';
import { Fragment, useEffect, useState } from 'react';
import MetaData from '../../layout/MetaData';
import { useParams } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AccountTree } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux'; // Add this line
import {
  clearUpdateOrderStatusAction,
  getSingleOrderAction,
  updateOrderAction,
} from '../../../redux/actions/orderAction';
import { clearErrorAction } from '../../../redux/actions/appAction';
import Loader from '../../Loader/Loader';
import NotFound from '../../layout/NotFound/NotFound';

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
  }, [dispatch, id, updateOrderStatus]); // eslint-disable-line react-hooks/exhaustive-deps

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
                        {/* ... existing code ... */}
                      </div>
                      <div className="process-cart-items">
                        {/* ... existing code ... */}
                      </div>
                    </div>
                    {/*  */}
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

                        <Button className="processorder-btn" type="submit">
                          Process Order
                        </Button>
                      </form>
                    </div>
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

export default ProcessOrder;
