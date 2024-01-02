import './UpdateAccount.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../../../redux/actions/userAction';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrorAction } from '../../../redux/actions/appAction';
import Loader from '../../Loader/Loader';
import MetaData from '../../layout/MetaData';

const UpdateAccount = () => {
  const dispatch = useDispatch();
  const { user, isUpdated, isUserLoading } = useSelector(
    (state) => state.userState
  );
  const { error } = useSelector((state) => state.appState);
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

  const changeAvatar = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onloadend = (e) => {
      setAvatar(reader.result);
      setAvatarPreview(reader.result);
    };
  };

  const updateUserData = (e) => {
    e.preventDefault();
    dispatch(updateUserAction({ name, email, avatar }));
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
          <div className="update-profile">
            <div className="update-form-container">
              <h3 className="update-profile-heading">Update Profile</h3>
              <form className="update-form" onSubmit={updateUserData}>
                <div className="update-name">
                  <PermIdentityIcon />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="update-Email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="update-fileUpload">
                  <img src={avatarPreview} alt="Avatar" />
                  <input
                    type="file"
                    name="avatar"
                    placeholder="Upload avatar"
                    accept="image/*"
                    onChange={changeAvatar}
                  />
                </div>
                <button className="update-button">Update</button>
              </form>
            </div>
          </div>
        )}
      </Fragment>
    </Fragment>
  );
};

export default UpdateAccount;
