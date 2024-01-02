import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    order: undefined,
    allOrders: [],
    deleteOrderStatus: false,
    updateOrderStatus: false,
    isLoading: true
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createNewOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        getMyOrders: (state, action) => {
            state.orders = action.payload;
        },
        getSingleOrder: (state, action) => {
            state.order = action.payload;
        },
        getAllOrders: (state, action) => {
            state.allOrders = action.payload;
        },
        deleteOrderStatus: (state, action) => {
            state.deleteOrderStatus = action.payload;
        },
        updateOrderStatus: (state, action) => {
            state.updateOrderStatus = action.payload;
        },
        setOrderLoader: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export default orderSlice;