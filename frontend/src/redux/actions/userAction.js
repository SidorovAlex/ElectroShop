import userSlice from "../slices/userSlice";
import appSlice from "../slices/appSlice";
import axios from 'axios';

const { login, register, updateUser, updatePassword, resetUpdateStatus, forgotPassword, resetForgotPasswordStatus, resetPassword, getAllUsers, updateSingleUser, resetUpdateSingleUserStatus, deleteUser, getSingleUser, resetDeleteUserStatus, setUserLoader, setIsUserLoading } = userSlice.actions;
const { setLoader, setError } = appSlice.actions;



// Login User
export const loginAction = (email, password) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/login', { email, password });
        dispatch(login(data));
        dispatch(setLoader(false))

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// Register User
export const registerAction = (userInfo) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/register', userInfo, { headers: { "Content-Type": "application/json" } });
        dispatch(register(data));
        dispatch(setLoader(false));

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// Load user from cookies
export const loadUserAction = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get('/api/v1/me');
        dispatch(login(data));
        dispatch(setLoader(false));

    } catch (err) {
        dispatch(setLoader(false));
    }
}

// LogOut User
export const logoutUserAction = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.get('/api/v1/logout');
        dispatch(login({ user: null, isAuthenticated: false }));
        dispatch(setLoader(false));

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// Update User
export const updateUserAction = (userData) => async (dispatch) => {
    try {
        dispatch(setIsUserLoading(true));
        const { data } = await axios.put('/api/v1/me/update', userData, { headers: { "Content-Type": "application/json" } });
        dispatch(updateUser(data));
        dispatch(setIsUserLoading(false));

    } catch (err) {
        dispatch(setError(err));
        dispatch(setIsUserLoading(false));
    }
}
// Update Passord
export const updatePasswordAction = (passwords) => async (dispatch) => {
    try {
        dispatch(setIsUserLoading(true));
        const { data } = await axios.put('/api/v1/password/update', passwords, { headers: { "Content-Type": "application/json" } });
        dispatch(updatePassword(data));
        dispatch(setIsUserLoading(false));

    } catch (err) {
        dispatch(setError(err));
        dispatch(setIsUserLoading(false));
    }
}

// reset update status while browsing into account page
export const resetUpdateStatusAction = () => dispatch => {
    dispatch(resetUpdateStatus());
}

// forget password email message send
export const forgotPasswordAction = (email) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/password/recovery', email, { headers: { "Content-Type": "application/json" } });
        dispatch(forgotPassword(data));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// clear forget password status 
export const resetForgotPasswordStatusAction = () => (dispatch) => {
    dispatch(resetForgotPasswordStatus());
}

// reset password from mail link
export const resetPasswordAction = (token, passwords) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, { headers: { "Content-Type": "application/json" } });
        dispatch(resetPassword(data));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// get All users --admin
export const getAllUsersAction = () => async (dispatch) => {
    try {
        dispatch(setUserLoader(true));
        const { data } = await axios.get('/api/v1/admin/users');

        dispatch(getAllUsers(data.users));
        dispatch(setUserLoader(false));
    } catch (err) {
        dispatch(setError(err));
        dispatch(setUserLoader(false));
    }
}

// get Single user --admin 
export const getSingleUserAction = (id) => async (dispatch) => {
    try {
        dispatch(setUserLoader(true));
        const { data } = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch(getSingleUser(data.user));
        dispatch(setUserLoader(false));
    } catch (err) {
        dispatch(setError(err));
        dispatch(setUserLoader(false));
    }
}

// updata Single User --admin 
export const updateSingleUserAction = (userData, id) => async (dispatch) => {
    try {
        dispatch(setUserLoader(true));
        const { data } =  await axios.put(`/api/v1/admin/user/${id}`, userData, { headers: { "Content-Type": "application/json" } });

        dispatch(updateSingleUser(data));
        dispatch(setUserLoader(false));
    } catch (err) {
        dispatch(setError(err));
        dispatch(setUserLoader(false));
    }
}

// reset update user status -- admin 
export const resetUpdateSingleUserStatusAction = () => (dispatch) => {
    dispatch(resetUpdateSingleUserStatus(false));
}

// delete user --admin
export const deleteUserAction = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch(deleteUser(data.success));
    } catch (err) {
        dispatch(setError(err));
    }
}

// reset delete user status
export const resetDeleteUserStatusAction = () => (dispatch) => {
    dispatch(resetDeleteUserStatus(false))
}


