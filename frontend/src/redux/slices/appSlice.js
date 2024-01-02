import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    error: null,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export default appSlice;