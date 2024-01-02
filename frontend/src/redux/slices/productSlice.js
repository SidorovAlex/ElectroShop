import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    productCount: 0,
    product: undefined,
    productPerPage: 5,
    filteredProductCount: 0,
    newReviewed: false,
    createProductSuccess: false,
    deleteProductStatus: false,
    updateProductStatus: false,
    productReviews: [],
    isReviewDeleted: false,
    isLoading: true
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        getAllProducts: (state, action) => {
            state.products = action.payload.products;
            state.productCount = action.payload.productCount;
            state.productPerPage = action.payload.resultPerPage;
            state.filteredProductCount = action.payload.filteredProductCount;
        },
        getProductDetails: (state, action) => {
            state.product = action.payload
        },
        newReview: (state, action) => {
            state.newReviewed = action.payload;
        },
        clearNewReviewedStatus: (state, action) => {
            state.newReviewed = action.payload;
        },
        getAdminAllProducts: (state, action) => {
            state.adminAllProducts = action.payload;
        },
        CreateProductStatus: (state, action) => {
            state.createProductSuccess = action.payload;
        },
        deleteProductStatus: (state, action) => {
            state.deleteProductStatus = action.payload;
        },
        updateProductStatus: (state, action) => {
            state.updateProductStatus = action.payload;
            state.product = null;
        },
        getProductReviews: (state, action) => {
            state.productReviews = action.payload;
        },
        deleteProductReviewStatus: (state, action) => {
            state.isReviewDeleted = action.payload;
        }
    }

});

export default productSlice;