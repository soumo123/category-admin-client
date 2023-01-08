import React from 'react'
import {Link} from "react-router-dom";
import '../../css/home.css'

const Home = () => {
  return (
    <>
    <Link to="/login">
    <button className='btn btn-primary lgn-btn'>login</button>
    </Link>
    </>
  )
}

export default Home