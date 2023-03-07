import './App.css';
import React from "react";
import {useEffect,useState} from 'react'
import { BrowserRouter , Routes,Route} from "react-router-dom";
import Header from './components/layout/Header/Header.js'
import Footer from './components/layout/Footer/Footer'
// import Home from './components/Home/Home.js'
import Authentication from './components/users/Authentication';
import store from './store'
import axios from 'axios'
import { loadUser } from './actions/userAction';
import {useSelector} from 'react-redux'
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import Home from './components/users/Home'
import Approved from './components/users/Approved';
import OtpVerification from './components/users/OtpVerification';

function App() {



  const[stripeApiKey,setStripeApiKey] = useState("")
const token = localStorage.getItem('token')
  async function getStripeApiKey(){
    const {data} = await axios.get(`${process.env.REACT_APP_PRODUCTION_URL}/api/soummya/stripeApiKey/${token}`)
    setStripeApiKey(data.stripeApiKey)
  }

useEffect(() => {
  store.dispatch(loadUser())
  getStripeApiKey()
}, [])


const {isAuthenticated,user} = useSelector((state)=>state.user)  
console.log("isAuthenticated",isAuthenticated)
const {order} = useSelector((state)=>state.newOrder)


  return (
    
    <BrowserRouter>
      <Header/>
      
    {/* {isAuthenticated && <UserOptions user={user}/> } */}
      <Routes>
     
       <Route exact path="/login" element={<Authentication />} />
       <Route exact path="/otp/verification" element={<OtpVerification />} />
      {user?.role === "admin" ?  <Route exact path="/" element={<Dashboard/>}/> : user?.role=="user" ? <Route exact path="/" element={<Approved/>}/>:<Route exact path="/" element={<Home/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/products" element={<ProductList/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Dashboard/>}/> : <Route exact path="/admin/dashboard" element={<Dashboard/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/create" element={<NewProduct/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Dashboard/>}/> : <Route exact path="/admin/dashboard" element={<Dashboard/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/product/:id" element={<UpdateProduct/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Dashboard/>}/> : <Route exact path="/admin/dashboard" element={<Dashboard/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/orders" element={<OrderList/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Dashboard/>}/> : <Route exact path="/admin/dashboard" element={<Dashboard/>}/>}
      {user?.role === "admin" ?  <Route exact path="/admin/order/:id" element={<ProcessOrder/>}/> : user?.role ==="user" ? <Route exact path="/admin/prducts" element={<Dashboard/>}/> : <Route exact path="/admin/dashboard" element={<Dashboard/>}/>}
      

      </Routes>
    <Footer />
  </BrowserRouter>
  );
}


export default App;
