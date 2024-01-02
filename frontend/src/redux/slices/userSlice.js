import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    isUpdated: null,
    isSingleUserUpdated: false,
    singleUser: null,
    allUsers: [],
    isUserDeleted: false,
    isLoading: true,
    isUserLoading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        login: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.success;
        },
        register: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.success;
        },
        updateUser: (state, action) => {
            state.user = action.payload.updatedUser;
            state.isUpdated = true;
        },
        updatePassword: (state, action) => {

            state.user = action.payload.user;
            state.isUpdated = true;
        },
        resetUpdateStatus: (state, action) => {
            state.isUpdated = null;
        },
        forgotPassword: (state, action) => {
            state.forgotPasswordMessage = action.payload;
        },
        resetForgotPasswordStatus: (state, action) => {
            state.forgotPasswordMessage = null;
        },
        resetPassword: (state, action) => {
            state.isUpdated = true;
            state.forgotPasswordMessage = action.payload;
        },
        getAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        getSingleUser: (state, action) => {
            state.singleUser = action.payload;
        },
        updateSingleUser: (state, action) => {
            state.isSingleUserUpdated = true;
            state.singleUser = action.payload.user;
        },
        resetUpdateSingleUserStatus: (state, action) => {
            state.isSingleUserUpdated = action.payload;
        },
        deleteUser: (state, action) => {
            state.isUserDeleted = action.payload
        },
        resetDeleteUserStatus: (state, action) => {
            state.isUserDeleted = action.payload;
        },
        setIsUserLoading: (state, action) => {
            state.isUserLoading = action.payload;
        }
    }
});

export default userSlice;