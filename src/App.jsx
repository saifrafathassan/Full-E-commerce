import { BrowserRouter as Router , Route , Routes, Navigate } from "react-router-dom";
import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import Account from './pages/account/Account';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState'
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import Allproducts from './pages/allproducts/AllProducts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withTranslation  } from 'react-i18next';

function App({ t }) {

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account/>
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
                <Dashboard/>
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/productinfo/:id' element={<ProductInfo/>} />
          <Route path='/addproduct' element={
            <ProtectedRouteForAdmin>
              <AddProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path="/*" element={<NoPage/>} />
        </Routes>
        <ToastContainer/>
      </Router>
    </MyState>
  )
}

export default withTranslation()(App);

// user 

export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user')
  if(user) {
    return children

  } else {
    return <Navigate to={'/login'}/>
  }
}

// admin

const ProtectedRouteForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  if(admin.user.email === 'saif@gmail.com') {
    return children
  }
  else {
    return <Navigate to={'/login'}/>
  }
}