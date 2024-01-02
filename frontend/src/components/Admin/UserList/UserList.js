import React, { Fragment, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../../layout/MetaData';
import SideBar from '../SideBar/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserAction,
  getAllUsersAction,
  resetDeleteUserStatusAction,
} from '../../../redux/actions/userAction';
import { clearErrorAction } from '../../../redux/actions/appAction';
import Loader from '../../Loader/Loader';
import './UserList.css';

const UserList = () => {
  const dispatch = useDispatch();
  const { allUsers, isUserDeleted, isLoading } = useSelector(
    (state) => state.userState
  );
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.appState);

  useEffect(() => {
    dispatch(getAllUsersAction());

    if (isUserDeleted) {
      toast.success('User Deleted Successfully.');
      navigate('/admin/dashboard');
      dispatch(resetDeleteUserStatusAction());
    }
  }, [dispatch, isUserDeleted]); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteUser = (id) => {
    dispatch(deleteUserAction(id));
  };

  if (error) {
    dispatch(clearErrorAction());
  }

  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 300, flex: 1 },
    {
      field: 'role',
      headerName: 'Role',
      minWidth: 150,
      flex: 0.25,
      cellClassName: (params) => {
        return params.row.role === 'user' ? 'green-color' : 'red-color';
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 400,
      flex: 1,
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
            <Link to={`/admin/user/${params.row.id}`}>
              <Edit />
            </Link>
            <Button onClick={() => deleteUser(params.row.id)}>
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  allUsers &&
    allUsers.forEach((user) => {
      rows.push({
        name: user.name,
        id: user._id,
        role: user.role,
        email: user.email,
      });
    });

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="All Users-Admin" />
          <ToastContainer autoClose={3000} position="top-right" />
          <div className="dashboard">
            <SideBar />
            <div className="userlist-container">
              <h1 className="userlist-heading">All Users</h1>
              <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                disableSelectionOnClick
                pageSize={10}
                rowsPerPageOptions={[10]}
                className="userlist-table"
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserList;
