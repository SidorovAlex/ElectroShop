import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import { useEffect, useState } from 'react';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { useDispatch } from 'react-redux';
import Products from './components/Products/Products';
import Search from './components/Search/Search';
import Cart from './components/Cart/Cart';
import Shipping from './components/Shipping/Shipping.js';
import Auth from './components/Auth/Auth';
import Account from './components/Account/Account';

import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateAccount from './components/Account/UpdateAccount/UpdateAccount';
import UpdatePassword from './components/Account/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import ConfirmOrder from './components/Shipping/ConfirmOrder/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Payment/Payment';
import OrderSuccess from './components/Payment/OrderSuccess';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Orders from './components/Orders/Orders';
import OrderDetails from './components/OrderDetails/OrderDetails';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import ProductList from './components/Admin/ProductList/ProductList';
import NewProduct from './components/Admin/NewProduct/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct/UpdateProduct';
import OrderList from './components/Admin/OrderList/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder/ProcessOrder';
import UserList from './components/Admin/UserList/UserList';
import UpdateUserRole from './components/Admin/UpdateUserRole/UpdateUserRole';
import ReviewList from './components/Admin/ReviewList/ReviewList';
import NotFound from './components/layout/NotFound/NotFound';
import About from './components/About/About.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Droid Serif'],
      },
    });
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  // disable inspect element in the client side
  window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/update"
            element={
              <ProtectedRoute>
                <UpdateAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={null}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/"
            element={
              <ProtectedRoute isAdmin={true}>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUserRole />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true}>
                <ReviewList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
