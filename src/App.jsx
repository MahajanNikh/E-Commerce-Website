import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Nopage from './pages/nopage/Nopage'
import MyState from './context/data/myState'
import Login from './pages/registration/Login'
import Signup from './pages/registration/Signup'
import ProductInfo from './pages/productInfo/ProductInfo'
import AddProduct from './pages/admin/pages/AddProduct'
import UpdateProduct from './pages/admin/pages/UpdateProduct'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './pages/allproducts/AllProducts'

const App = () => {
  // console.log(import.meta.env.VITE_APIKEY)
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/productinfo/:id" element={
            <ProtectedRoute>
              <ProductInfo />
            </ProtectedRoute>} />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct" element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/allproducts' element={<Allproducts />} />
          <Route path="/*" element={<Nopage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  )
}

export default App

// User 

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }
}

//Admin

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))

  if (admin.user.email === import.meta.env.VITE_ADMIN_EMAIL) {
    return children
  }
  else {
    return <Navigate to={'/login'} />
  }
}