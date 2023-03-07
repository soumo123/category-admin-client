
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getOrderDetails, shipmentDetails, updateOrder } from '../../actions/orderAction'
import Metadata from '../layout/Metadata'
import { Button } from "@material-ui/core";
import Loader from "../layout/loader/Loader";
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/processorder.css'

const ProcessOrder = () => {

  const { isUpdated } = useSelector((state) => state.order)
  const { order, error, loading } = useSelector((state) => state.orderDetails)

  const statusData = useSelector((state) => state.statusCheck?.data)
  let track = statusData && statusData[0].paymentStatus

  const paramsId = useParams()
  const dispatch = useDispatch()

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    console.log("status", status)
    dispatch(updateOrder(paramsId.id, { paymentStatus: status }));
  };


  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }
    // if (updateError) {
    //   alert.error(updateError);
    //   dispatch(clearErrors());
    // }
    if (isUpdated) {
      toast.success(`Order ${status} Successfully`);
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(paramsId.id));
    dispatch(shipmentDetails(paramsId.id))
  }, [dispatch, alert, isUpdated, paramsId, toast]);





  return (
    <>
      {
        loading ? <Loader /> :

          <>
            <Metadata title="Process Order" />
            <div className="container">
              <div className="row mt-5 mb-5 justify-content-center">

                <div className="col-sm-12">

                  <h2 className="text-center mb-5">Order Summary</h2>
                  {
                    order && order?.orders?.map((item) => (

                      <div className="d-sm-flex justify-content-center">

                        <div key={item.product} className="processimg mr-4">
                          <img className="img-fluid" src={item.image} alt="Product" />

                        </div>

                        <div className="processdetails border border-secondary mr-4">
                          <h5><u>Product Details</u></h5>
                          <ul>
                            <li>Prodcut Name : <span className="processitem">{item.name}</span></li>
                            <li>Price :₹ <span className="processitem">{item.price}</span></li>
                            <li>Quantity : <span className="processitem">{item.quantity}</span></li>
                            <li>Delivery Date :  <span className="processitem">{new Date(item.deliveryTime).toLocaleDateString('en-GB')}</span></li>
                            <li>Customer Id :  <span className="processitem">{item.user}</span></li>
                            <li>Order Status :  <span className={
                              track === "Delivered" ?
                                "text-success" : "text-danger"
                            }>  {track}</span></li>


                          </ul>
                          <div>
                            <div
                              style={{
                                display: item.status === "Delivered" ? "none" : "block",
                              }}
                            >
                              <form
                                className="updateOrderForm"
                                onSubmit={updateOrderSubmitHandler}
                              >
                                {/* <h1>Process Order</h1> */}

                                <div>

                                  <select className="form-control inputtext" onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    {track === "Processing" && (
                                      <option value="Shipped">Shipped</option>
                                    )}

                                    {track === "Shipped" && (
                                      <option value="Delivered">Delivered</option>
                                    )}
                                  </select>
                                </div>

                                <button
                                  className="btn btn-primary mt-3"
                                  id="createProductBtn"
                                  type="submit"
                                  disabled={
                                    track==="Delivered" ? true:false
                                  }
                                >
                                  Process
                                </button>
                              </form>
                              <ToastContainer
                                position="top-center"
                                autoClose={1000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover />


                            </div>





                          </div>
                        </div>


                        <div className="processdetails border border-secondary">

                          <h5><u>Customer Details</u></h5>
                          <ul>

                            <li>Customer Name :  <span className="processitem">{order?.customer_name}</span></li>
                            <li>Address : <span className="processitem">{order?.shippingDetails.address}</span></li>
                            <li>City : <span className="processitem">{order?.shippingDetails.city}</span></li>
                            <li>State : <span className="processitem">{order?.shippingDetails.state}</span></li>
                            <li>Country : <span className="processitem">{order?.shippingDetails.country}</span></li>
                            <li>Pincode : <span className="processitem">{order?.shippingDetails.pinCode}</span></li>
                            <li>Phone Number  : <span className="processitem">+91 {order?.shippingDetails.phoneNo}</span></li>

                          </ul>


                        </div>

                      </div>


                    ))
                  }

                </div>

              </div>


            </div>

          </>
      }

    </>

  )
}



export default ProcessOrder