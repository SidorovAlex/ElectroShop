const express = require('express');
const { createProduct, getAllProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview, getAdminAllProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();

router.route('/admin/product/new').post(isAuthenticatedUser, authorizedRole('admin'), createProduct);
router.route('/products').get(getAllProduct);
router.route('/admin/products').get(isAuthenticatedUser, authorizedRole('admin'), getAdminAllProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizedRole('admin'), updateProduct).delete(isAuthenticatedUser, authorizedRole('admin'), deleteProduct);
router.route('/product/:id').get(getProductDetails);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/admin/reviews').get(isAuthenticatedUser, authorizedRole('admin'), getProductReviews).delete(isAuthenticatedUser, authorizedRole('admin'), deleteProductReview);

module.exports = router;