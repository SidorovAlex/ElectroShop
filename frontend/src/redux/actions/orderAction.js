import axios from "axios";
import appSlice from "../slices/appSlice";
import orderSlice from "../slices/orderSlice";
import cartSlice from '../slices/cartSlice';

const { setError, setLoader } = appSlice.actions;
const {removeAllCartItems } = cartSlice.actions;
const { createNewOrder, getMyOrders, getSingleOrder, updateOrderStatus, getAllOrders, deleteOrderStatus, setOrderLoader } = orderSlice.actions;

// Create New Order
export const createNewOrderAction = (order) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/order/new', order, { headers: { "Content-Type": "application/json" } });
        
        dispatch(createNewOrder(data.order));
        localStorage.removeItem("cartItems")
        dispatch(removeAllCartItems());
        dispatch(setLoader(false));
        
    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// Get My Orders
export const getMyOrdersAction = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/v1/me/orders');
        dispatch(getMyOrders(data.orders));
        dispatch(setLoader(false))
    } catch (err) {
        dispatch(setLoader(false));
        dispatch(setError(err));
    }
}

// Get Single Order
export const getSingleOrderAction = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/order/${id}`);
        dispatch(getSingleOrder(data.order));
        dispatch(setOrderLoader(false))
        
    } catch (err) {
        dispatch(setError(err));
        dispatch(setOrderLoader(false));
    }
}

// get all orders --admin
export const getAllOrdersAction = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/v1/admin/orders');

        dispatch(getAllOrders(data.orders))
    } catch (err) {
        dispatch(setError(err));
    }
}

// update order --admin
export const updateOrderAction = (status, id) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, {status}, { headers: { "Content-Type": "application/json" } });

        dispatch(updateOrderStatus(data.success))
    } catch (err) {
        dispatch(setError(err));
    }
}

// Clear update order Status
export const clearUpdateOrderStatusAction = () => (dispatch) => {
    dispatch(updateOrderStatus(false));
}

// delete order --admin
export const deleteOrderAction = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch(deleteOrderStatus(data.success))
    } catch (err) {
        dispatch(setError(err));
    }
}

// Clear delete order Status
export const clearDeleteOrderStatusAction = () => (dispatch) => {
    dispatch(deleteOrderStatus(false));
}
