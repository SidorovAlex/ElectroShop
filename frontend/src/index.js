import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ToastContainer position="bottom-center" autoClose={5000} />
    <App />
  </Provider>
);
