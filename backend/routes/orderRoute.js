const express = require('express');
const { newOrder, getSingleOrder, getMyOrders, updateOrderStatus, getAllOrders, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizedRole } = require('../middlewares/auth');

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/me/orders").get(isAuthenticatedUser, getMyOrders);
router.route("/admin/orders").get(isAuthenticatedUser,authorizedRole("admin",), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizedRole('admin'), updateOrderStatus).delete(isAuthenticatedUser, authorizedRole('admin'), deleteOrder);

module.exports = router; 