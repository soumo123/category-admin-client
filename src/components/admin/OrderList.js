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


const OrderList = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { error, orders } = useSelector((state) => state.allOrders)
    const { isDeleted } = useSelector((state) => state.order)
    const{user} = useSelector((state)=>state.user)
    

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))

    }

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




    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        // {
        //     field: "status",
        //     headerName: "Status",
           
        //     flex: 0.5,
        //     cellClassName: (params) => {
        //         return params.getValue(params.id, "status") === "Delivered"
        //             ? "greenColor"
        //             : "redColor";
        //     },
        // },
        {
            field: "createdAt",
            headerName: "Order Date",
           
            flex: 0.5,
          },
          {
            field: "deliveredAt",
            headerName: "Delivery Date",
            minWidth: 250,
            flex: 0.3,
          },
          {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
           
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
           
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                    
                        <Link to={`/admin/order/${params.id}`}>
                            
                            <EditIcon />
                        </Link>
                    </>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.map((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.quantity,
                amount: item.price,
                // status: item.status,
                createdAt:new Date(item.createdAt).toLocaleDateString('en-GB'),
                deliveredAt:new Date(item.deliveryTime).toLocaleDateString('en-GB'),
              
            });
        });



    return (
        <>
            <Metadata title={`ALL ORDERS - Admin`} />

            <div className="container-fluid display-table">
                <div className="row display-table-row">
                    <Sidebar />
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                    <div className="productListContainer ml-4">
                        <h4 className="mt-4" id="productListHeading">ALL Orders</h4>

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable mt-3"
                            autoHeight
                        />
                       
                    </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default OrderList