import './App.css';
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router } from 'react-router-dom';
import {Route, Routes } from 'react-router-dom';
import webFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer';
import Home from './component/home/Home';
import Loader from './component/layout/Loader/loader';
import ProductDetails from './component/Product/ProductDetails';
import ProductsPage from './component/Product/ProductsPage.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './component/User/Profile.js';
import UpdatedProfile from './component/User/UpdatedProfile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import axios from 'axios';
import Payment from './component/Cart/Payment.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Cart/MyOrders';
import OrderDetails from './component/Cart/OrderDetails.js';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loadUser());

    getStripeApiKey();

  }, []);
  return (
    <Router>
        <Header />

        { isAuthenticated === true && <UserOptions user={user} /> }
        <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/product/:id" element={<ProductDetails />} />
        <Route path = "/products" element={<ProductsPage />} />
        <Route path = "/products/:keyword" element={<ProductsPage />} />
        <Route path = "/search" element={<Search />} />
        <Route path = "/account" element={isAuthenticated === true ? <Profile /> : <LoginSignUp />} />
        <Route path = "/me/update" element={isAuthenticated === true ? <UpdatedProfile /> : <LoginSignUp />} />
        <Route path = "/login" element={<LoginSignUp />} />
        <Route path = "/password/update" element={isAuthenticated === true ? <UpdatePassword /> : <LoginSignUp />} />

        <Route path = "/password/forgot" element={<ForgotPassword />} />

        <Route path = "/password/reset/:token" element={<ResetPassword />} />

        <Route path = "/cart" element={isAuthenticated === true ? <Cart /> : <LoginSignUp />} />

        <Route path = "/shipping" element={isAuthenticated === true ? <Shipping /> : <LoginSignUp />} />

        <Route path = "/payment/process" element={isAuthenticated === true && stripeApiKey ? <Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements> : <LoginSignUp />} />
        
        <Route path="/success" element={isAuthenticated === true ? <OrderSuccess /> : <LoginSignUp />} />
        
        <Route path="/orders/me" element={isAuthenticated === true ? <MyOrders /> : <LoginSignUp />} />

        <Route path="/order/:id" element={isAuthenticated === true ? <OrderDetails /> : <LoginSignUp />} />
       
        <Route path = "/orders/confirm" element={isAuthenticated === true ? <ConfirmOrder /> : <LoginSignUp />} />

        <Route isAdmin={true} path = "/admin/dashboard" element={isAuthenticated === true && user.role === "admin" ? <Dashboard /> : <LoginSignUp />} />



        <Route isAdmin={true} path = "/admin/products" element={isAuthenticated === true && user.role === "admin" ? <ProductList /> : <LoginSignUp />} />


        <Route isAdmin={true} path = "/admin/product/new" element={isAuthenticated === true && user.role === "admin" ? <NewProduct /> : <LoginSignUp />} />


        <Route isAdmin={true} path = "/admin/product/:id" element={isAuthenticated === true && user.role === "admin" ? <UpdateProduct /> : <LoginSignUp />} />


        <Route isAdmin={true} path = "/admin/orders" element={isAuthenticated === true && user.role === "admin" ? <OrderList /> : <LoginSignUp />} />


        <Route isAdmin={true} path = "/admin/order/:id" element={isAuthenticated === true && user.role === "admin" ? <ProcessOrder /> : <LoginSignUp />} />



        <Route isAdmin={true} path = "/admin/users" element={isAuthenticated === true && user.role === "admin" ? <UsersList /> : <LoginSignUp />} />


        <Route isAdmin={true} path = "/admin/user/:id" element={isAuthenticated === true && user.role === "admin" ? <UpdateUser /> : <LoginSignUp />} />



        <Route isAdmin={true} path = "/admin/reviews" element={isAuthenticated === true && user.role === "admin" ? <ProductReviews /> : <LoginSignUp />} />




        </Routes>

        <Footer />
    </Router>
  );
}

export default App;
