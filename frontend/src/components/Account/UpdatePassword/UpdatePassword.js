import { Fragment, useEffect, useState } from 'react';
import './UpdatePassword.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordAction } from '../../../redux/actions/userAction';
import Loader from '../../Loader/Loader';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrorAction } from '../../../redux/actions/appAction';
import MetaData from '../../layout/MetaData';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { isUpdated, isUserLoading } = useSelector((state) => state.userState);
  const { error } = useSelector((state) => state.appState);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    if (
      oldPassword.length < 8 &&
      newPassword.length < 8 &&
      confirmPassword.length < 8
    ) {
      return toast.error('Password length should be minimum 8 characters');
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password doesn't match with confirm password");
    }

    dispatch(
      updatePasswordAction({ oldPassword, newPassword, confirmPassword })
    );
  };

  useEffect(() => {
    if (isUpdated) {
      navigate('/account');
    }
  }, [dispatch, isUpdated, error]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    toast.error(error.response.data.message);
    dispatch(clearErrorAction());
  }

  return (
    <Fragment>
      <MetaData title="Update Password" />
      <Fragment>
        {isUserLoading ? (
          <Loader />
        ) : (
          <div className="update-password">
            <div className="update-form-container">
              <h3 className="update-password-heading">Change password</h3>
              <form
                className="update-password-form"
                onSubmit={updatePasswordSubmit}
              >
                <div className="old-password">
                  <LockOpenIcon />
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={oldPassword}
                    required
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="regPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="regConfirmPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button className="update-password-button">Update</button>
              </form>
            </div>
          </div>
        )}
      </Fragment>
    </Fragment>
  );
};

export default UpdatePassword;
