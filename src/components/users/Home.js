import React from 'react'
import {Link} from "react-router-dom";
import '../../css/home.css'

const Home = () => {
  return (
    <>
     <h1 className="h1">Sellers Dashboard Portal</h1>
    <Link to="/login">
   
      <div className=" login-button">  
    <button type="button" className="btn btn-primary">Please login or Register</button>
    </div>
    </Link>
    </>
  )
}

export default Home