import './Orders.css';
import { Fragment, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import { clearErrorAction } from '../../redux/actions/appAction';
import { getMyOrdersAction } from '../../redux/actions/orderAction';
import Loader from '../Loader/Loader';

const Orders = () => {
  const { user } = useSelector((state) => state.userState);
  const { orders } = useSelector((state) => state.orderState);
  const { error, isLoading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
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
          <Link to={`/order/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  if (orders && orders.length > 0) {
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  }

  if (error) {
    toast.error(error.response.data.message); // Replace alert with toast.error
    dispatch(clearErrorAction());
  }

  useEffect(() => {
    dispatch(getMyOrdersAction());
  }, [dispatch]);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Orders" />
          <div className="my-orders">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              rowsPerPageOptions={[10]}
              className="my-orders-table"
              autoHeight
            />

            <Typography className="my-orders-heading">
              {user.name}'s Orders
            </Typography>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Orders;
