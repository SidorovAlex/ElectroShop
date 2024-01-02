import './OrderList.css';
import { Fragment, useEffect } from 'react';
import MetaData from '../../layout/MetaData';
import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrorAction } from '../../../redux/actions/appAction';
import {
  clearDeleteOrderStatusAction,
  deleteOrderAction,
  getAllOrdersAction,
} from '../../../redux/actions/orderAction';

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allOrders, deleteOrderStatus } = useSelector(
    (state) => state.orderState
  );
  const { error } = useSelector((state) => state.appState);

  useEffect(() => {
    dispatch(getAllOrdersAction());

    if (deleteOrderStatus) {
      toast.success('Order Deleted Successfully.');
      navigate('/admin/dashboard');
      dispatch(clearDeleteOrderStatusAction());
    }
  }, [dispatch, deleteOrderStatus, allOrders]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    toast.error(error.response.data);
    dispatch(clearErrorAction());
  }

  const deleteOrder = (id) => {
    dispatch(deleteOrderAction(id));
  };

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === 'Delivered' ? 'green-color' : 'red-color';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.row.id}`}>
              <Edit />
            </Link>
            <Button onClick={() => deleteOrder(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  allOrders &&
    allOrders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  return (
    <Fragment>
      <MetaData title="All Orders-Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="orderlist-container">
          <h1 className="orderlist-heading">All Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            disableSelectionOnClick
            pageSize={10}
            rowsPerPageOptions={[10]}
            className="orderlist-table"
          />
        </div>
      </div>
    </Fragment>
  );
};
export default OrderList;
