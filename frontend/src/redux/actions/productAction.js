import productSlice from "../slices/productSlice";
import appSlice from "../slices/appSlice";
import axios from 'axios';

const { getAllProducts, getProductDetails, newReview, clearNewReviewedStatus, getAdminAllProducts, CreateProductStatus, deleteProductStatus, updateProductStatus, getProductReviews, deleteProductReviewStatus, setProductLoader } = productSlice.actions;
const { setLoader, setError, } = appSlice.actions;

export const getAllProductsAction = (keyword = "", currentPage = 1, priceRange = [0, 1000000], category, ratings) => async (dispatch) => {

    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`;

    if (category && category !== 'All') {
        link = link + `&category=${category}`;
    }

    if (ratings && ratings !== null) {
        link = link + `&ratings=${ratings}`;
    }

    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(link);
        dispatch(getAllProducts(data));
        dispatch(setLoader(false))

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

export const getProductDetailsAction = (id) => async (dispatch) => {
    try {
        dispatch(setProductLoader(true));
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(getProductDetails(data.product));
        dispatch(setProductLoader(false))
    } catch (err) {
        dispatch(setError(err));
        dispatch(setProductLoader(false));
    }
}

export const newReviewAction = (reviewData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.put(`/api/v1/review`, reviewData, { headers: { "Content-Type": "application/json" } });
        dispatch(newReview(data.success));
        dispatch(setLoader(false));
    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader());
    }
}

export const clearNewReviewedStatusAction = () => (dispatch) => {
    dispatch(clearNewReviewedStatus(false))
}

// Get all products --- admin
export const getAdminAllProductsAction = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/v1/admin/products');
        dispatch(getAdminAllProducts(data.products));
    } catch (err) {
        dispatch(setError(err));
    }
}


// Create New Prouduct --admin
export const createNewProductAction = (productData) => async (dispatch) => {
    try {
        dispatch(setProductLoader(true));
        const { data } = await axios.post('/api/v1/admin/product/new', productData, { headers: { "Content-Type": "application/json" } });

        dispatch(CreateProductStatus(data.success));
        dispatch(setProductLoader(false));
    } catch (err) {
        dispatch(setError(err));
        dispatch(setProductLoader(false));
    }
}

// Clear create Product Status --admin
export const clearCreateProductStatusAction = () => (dispatch) => {
    dispatch(CreateProductStatus(false));
}

// Delete Prouduct --admin
export const deleteProductAction = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

        dispatch(deleteProductStatus(data.success));
    } catch (err) {
        dispatch(setError(err));
    }
}

// Clear delete product Status --admin
export const clearDeleteProductStatusAction = () => (dispatch) => {
    dispatch(deleteProductStatus(false));
}

// Update Product --admin
export const updateProductAction = (productData, id) => async (dispatch) => {
    try {
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, { headers: { "Content-Type": "application/json" } });

        dispatch(updateProductStatus(data.success))
    } catch (err) {
        dispatch(setError(err));
    }
}

// 

// clear update product status --admin
export const clearUpdateProductStatusAction = () => (dispatch) => {
    dispatch(updateProductStatus(false));
}

// get product reviews -- admin
export const getProductReviewsAction = (productId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/reviews?id=${productId}`);

        dispatch(getProductReviews(data.reviews));
    } catch (err) {
        dispatch(setError(err));
    }
}

// Delete product review
export const deleteProductReviewAction = (productId, reviewId) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/reviews?productId=${productId}&&reviewId=${reviewId}`);

        dispatch(deleteProductReviewStatus(data.success));
    } catch (err) {
        dispatch(setError(err));
    }
}

// clear delete product review status
export const clearDeleteReviewStatusAction = () => (dispatch) => {
    dispatch(deleteProductReviewStatus(false));
}