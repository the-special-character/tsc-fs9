import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './style.css';
import Products from './pages/products';
import Cart from './pages/cart';
import configureStore from './configureStore';

const store = configureStore();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Products />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
]);

const rootEle = document.getElementById('root');

const root = createRoot(rootEle);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
