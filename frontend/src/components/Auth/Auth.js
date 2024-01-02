import './Auth.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import { clearErrorAction } from '../../redux/actions/appAction';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AvatarPreview from '../../images/Profile.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginAction,
  registerAction,
  resetForgotPasswordStatusAction,
} from '../../redux/actions/userAction';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import MetaData from '../layout/MetaData';

const LogIn = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authType, setAuthType] = useState('Login');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = user;
  const [avatar, setAvatar] = useState('');
  const [avatarPrev, setAvatarPrev] = useState(AvatarPreview);

  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.appState);
  const isAuthenticated = useSelector(
    (state) => state.userState.isAuthenticated
  );
  const navigate = useNavigate();
  const location = useLocation();

  const loginRef = useRef();
  const registerRef = useRef(null);

  useEffect(() => {
    const redirect = location.search
      ? `/${location.search.split('=')[1]}`
      : '/account';
    if (isAuthenticated) {
      navigate(redirect);
    }

    dispatch(resetForgotPasswordStatusAction());
  }, [dispatch, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    toast.error(error.response.data.message); // Use toast.error instead of alert.error
    dispatch(clearErrorAction());
  }

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginAction(loginEmail, loginPassword));
  };

  const registerHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Password does not match'); // Use toast.error instead of alert.error
    }

    const userInfo = {
      name,
      email,
      password,
      avatar,
    };

    dispatch(registerAction(userInfo));
  };

  const registerFormChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onloadend = (e) => {
        setAvatar(reader.result);
        setAvatarPrev(reader.result);
      };
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const switchAuthType = (e, type) => {
    if (type === 'login') {
      e.target.nextElementSibling.classList.remove('active');
      e.target.classList.add('active');

      loginRef.current.classList.add('active');
      registerRef.current.classList.remove('active');
      setAuthType('Login');
    }

    if (type === 'register') {
      e.target.previousElementSibling.classList.remove('active');
      e.target.classList.add('active');

      registerRef.current.classList.add('active');
      loginRef.current.classList.remove('active');
      setAuthType('Register');
    }
  };

  return (
    <Fragment>
      <MetaData title={authType} />
      <Fragment>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="auth">
            <div className="auth-container">
              <div className="auth-toggle">
                <p
                  className="login-heading active"
                  onClick={(e) => switchAuthType(e, 'login')}
                >
                  LOGIN
                </p>
                <p
                  className="register-heading"
                  onClick={(e) => switchAuthType(e, 'register')}
                >
                  REGISTER
                </p>
              </div>
              <div className="form-container">
                {/* login form */}
                <form
                  className="login-form active"
                  ref={loginRef}
                  onSubmit={loginHandler}
                >
                  <div className="loginEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      autoComplete="on"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      autoComplete="on"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <NavLink to="/password/forgot" className="forget-password">
                    Forget Password?
                  </NavLink>
                  <button className="login-button">Log In</button>
                </form>

                {/* register  form */}
                <form
                  className="register-form"
                  ref={registerRef}
                  onSubmit={registerHandler}
                >
                  <div className="regName">
                    <PermIdentityIcon />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={name}
                      required
                      autoComplete="off"
                      onChange={registerFormChange}
                    />
                  </div>
                  <div className="regEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      required
                      autoComplete="off"
                      onChange={registerFormChange}
                    />
                  </div>
                  <div className="regPassword">
                    <LockOpenIcon />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      required
                      autoComplete="off"
                      onChange={registerFormChange}
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
                      autoComplete="off"
                      onChange={registerFormChange}
                    />
                  </div>
                  <div className="regFileUpload">
                    <img src={avatarPrev} alt="Avatar" />
                    <input
                      type="file"
                      name="avatar"
                      placeholder="Upload avatar"
                      accept="image/*"
                      onChange={registerFormChange}
                    />
                  </div>
                  <button className="register-button">Register</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    </Fragment>
  );
};

export default LogIn;
