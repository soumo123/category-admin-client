import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllOrders, getProclearErrors, deleteOrder } from '../../actions/orderAction'
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from './Sidebar'
import Metadata from '../layout/Metadata'
import 'react-toastify/dist/ReactToastify.css';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';
import { useAlert } from 'react-alert'
import '../../css/sidebar.css';

const OrderList = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { error, orders } = useSelector((state) => state.allOrders)
    const { isDeleted } = useSelector((state) => state.order)
    const{user} = useSelector((state)=>state.user)
    

    // const deleteOrderHandler = (id) => {
    //     dispatch(deleteOrder(id))

    // }

    useEffect(() => {
        if (error) {
            alert.error("Oops...Order Not Deleted")
            dispatch({type:DELETE_ORDER_RESET})
            
        }
        
        if(isDeleted){
         alert.success("Order Deleted Successfully")
          dispatch({type:DELETE_ORDER_RESET})
          
        }
        
        dispatch(getAllOrders({user_id:user?._id}));
       
    }, [error, dispatch,alert, isDeleted]);





    return (
        <>
            <Metadata title={`ALL ORDERS - Admin`} />

            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <Sidebar />
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                    <div className="productListContainer ml-4">
                        <h4 className="mt-4" id="productListHeading">ALL Orders</h4>
                        <p>{orders&&orders.length} orders</p>
                        <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Total</th>
                    {/* <th scope="col">Created Time</th> */}
                    <th scope="col">Delivery Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders && orders.map((ele) => (
                      <tr className={ele.done==="1"?"disabled":""}>
                        <th scope="row">{ele._id}</th>
                        <td>{ele.quantity}</td>
                        <td>{ele.price}</td>
                        <td>{ele.price*ele.quantity}</td>
                        {/* <td>{new Date(ele.createdAt).toLocaleDateString('en-GB')}</td> */}
                        <td>{new Date(ele.deliveryTime).toLocaleDateString('en-GB')}</td>
                        <td>
                            {
                                ele.done==="1" ?
                                <p className="text-success">Delivered</p>:<p className="text-danger">Processing</p>
                            }
                            
                        </td>
                       {
                        ele.done==="1" ?<Link to=""><td><EditIcon /></td></Link>:
                        <Link to={`/admin/order/${ele._id}`}><td><EditIcon /></td></Link>
                       }
                       
                        
                       
                      </tr>

                    ))
                  }


                </tbody>
              </table>
                        {/* <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable mt-3"
                            autoHeight
                        /> */}


                       
                    </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default OrderList