import axios from "axios";
import appSlice from "../slices/appSlice";
import cartSlice from "../slices/cartSlice";

const { setError } = appSlice.actions;
const { addCartItem, removeCartItem, saveShippingInfo } = cartSlice.actions;

// Add to cart
export const addCartItemAction = (quantity, id) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/v1/product/${id}`);

        const item = {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }

        dispatch(addCartItem(item));
        localStorage.setItem("cartItems", JSON.stringify(getState().cartState.cartItems));

    } catch (err) {
        dispatch(setError(err));
    }
}

// Remove from cart
export const removeCartItemAction = (id) => async (dispatch, getState) => {

    dispatch(removeCartItem(id));
    localStorage.setItem("cartItems", JSON.stringify(getState().cartState.cartItems));
}

// Save Shipping Info 
export const saveShippingInfoAction = (data) => (dispatch, getState) => {
    dispatch(saveShippingInfo(data));
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}