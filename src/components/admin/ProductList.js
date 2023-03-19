import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAdminProducts, getProclearErrors, deleteProduct } from '../../actions/productAction'
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from './Sidebar'
import Metadata from '../layout/Metadata'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import { useAlert } from 'react-alert'

const ProductList = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState("")

  const { error, products } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.user)
  const { isDeleted } = useSelector((state) => state.productAdmin)

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))

    // navigate("/admin/dashboard");
    // dispatch({type:DELETE_PRODUCT_RESET})

  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(getProclearErrors());
    }
    dispatch(getAdminProducts({ user_id: user?._id, name: searchData }));

    if (isDeleted) {
      alert.success("Product Deleted Succesfully")
      dispatch({ type: DELETE_PRODUCT_RESET })
      // navigate("/admin/dashboard");
    }
  }, [error, alert, dispatch, navigate, isDeleted, searchData]);




  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      flex: 0.5,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "discount",
      headerName: "Discount",
      type: "number",
      flex: 0.3,
    },
    {
      field: "actualpricebydiscount",
      headerName: "Actual-Price",
      type: "number",
      flex: 0.3,
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            {/* <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button> */}
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.map((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: `₹` + item.price,
        discount: item && item.discount == 0 ? "No Discount" : item.discount + `%`,
        actualpricebydiscount: `₹` + item.actualpricebydiscount,
        name: item.name,
        createdAt: new Date(item.createdAt).toLocaleDateString('en-GB')
      });
    });



  return (
    <>
      <Metadata title={`ALL PRODUCTS - Admin`} />

      <div className="container-fluid display-table">
        <div className="row display-table-row">
          <Sidebar />
          <div className="col-md-10 col-sm-11 display-table-cell v-align">
            <div className="productListContainer ml-4">
              <div className="input-group">
                <div class="form-outline">
                  <input type="search" id="form1" class="form-control" placeholder='search..' onChange={(e) => setSearchData(e.target.value)} />
                  {/* <label className="form-label" for="form1">Search Products..</label> */}
                </div>
                <button type="button" className="btn btn-primary" style={{ position: 'absolute', left: '88%', top: '5px' }}>
                  <i class="fas fa-search" ></i>
                </button>
              </div>
              <h4 className="mt-3" id="productListHeading">All Products</h4>
              <p>{products && products.length} products..</p>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Created Time</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Actual Price</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products && products.map((ele) => (
                      <tr>
                        <th scope="row">{ele._id}</th>
                        <td>{ele.name}</td>
                        <td>{new Date(ele.createdAt).toLocaleDateString('en-GB')}</td>
                        <td>{ele.stock}</td>
                        <td>{ele.price}</td>
                        <td>{ele && ele.discount == 0 ? "No Discount" : ele.discount + `%`}</td>
                        <td>{`₹` + ele.actualpricebydiscount}</td>
                        
                         <Link to={`/admin/product/${ele._id}`}><td><EditIcon /></td></Link>
                       
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

export default ProductList