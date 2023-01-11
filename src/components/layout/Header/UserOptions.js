import React from 'react'
import '../../../css/user.css'
import { Link } from 'react-router-dom'
import {Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import profileImage from '../../../images/profile.png'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const UserOptions = () => {

  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)



  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("profile")
    toast.success("Logout Succesfully ");
    navigate('/')

    setInterval(() => {
      window.location.reload();
    }, 2000);



  }



  return (


    <Nav className="align-items-center">

      {
        !isAuthenticated ?
          <>
            <Nav.Link>
              <li className="nav-item dropdown">
                <Link className="nav-link" to="" data-bs-toggle="dropdown" aria-expanded="true">
                  <img src={profileImage} />
                </Link>
              </li>
            </Nav.Link>
          </>
          : <>
            <Nav.Link>
              <li className="nav-item"> {user?.name}</li>

            </Nav.Link>
            <Nav.Link>
              <li className="nav-item dropdown">

                <Link to="" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true">
                  <img src={user?.avatar?.url} />
                </Link>

                {
                  user?.role === "admin" ?

                    <ul class="dropdown-menu">
                      <li><p className="dropdown-item" onClick={logout} ><i class="fa fa-sign-out" aria-hidden="true"></i>
                        Logout</p></li>


                    </ul> :<></>
                }



                <ToastContainer
                  position="top-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover />
              </li>
            </Nav.Link></>

      }



    </Nav>


  )
}

export default UserOptions