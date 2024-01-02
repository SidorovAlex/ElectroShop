import { Fragment, useEffect, useState } from 'react';
import './ResetPassword.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../../../redux/actions/userAction';
import Loader from '../../Loader/Loader';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import MetaData from '../../layout/MetaData';
import { clearErrorAction } from '../../../redux/actions/appAction';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isUpdated, forgotPasswordMessage } = useSelector(
    (state) => state.userState
  );
  const { error, isLoading } = useSelector((state) => state.appState);
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8 && confirmPassword.length < 8) {
      return toast.error('Password length should be minimum 8 characters'); // Replace alert with toast.error
    }

    if (password !== confirmPassword) {
      return toast.error("New password doesn't match with confirm password"); // Replace alert with toast.error
    }

    dispatch(resetPasswordAction(token, { password, confirmPassword }));
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success(forgotPasswordMessage.message); // Replace alert with toast.success
      navigate('/login');
    }
  }, [dispatch, isUpdated, forgotPasswordMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    toast.error(error.response.data.message); // Replace alert with toast.error
    dispatch(clearErrorAction());
  }

  return (
    <Fragment>
      <MetaData title="Reset Password" />
      <Fragment>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="reset-password">
            <div className="reset-password-form-container">
              <h3 className="reset-password-heading">Reset password</h3>
              <form
                className="reset-password-form"
                onSubmit={resetPasswordSubmit}
              >
                <div className="regPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={password}
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
                <button className="reset-password-button">Reset</button>
              </form>
            </div>
          </div>
        )}
      </Fragment>
    </Fragment>
  );
};

export default ResetPassword;
