import React, { Fragment, useEffect, useState } from 'react';
import './ProductList.css';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import {
    clearErrors,
    getAllProductsAdmin,
    deleteProduct
} from '../../actions/productAction';
import { Link } from 'react-router-dom';
import {useAlert} from 'react-alert';
import {Button} from '@material-ui/core';
import MetaData from '../layout/MetaData';
import {
    MdEdit,
    MdDelete
} from 'react-icons/md';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {error, products} = useSelector((state) => state.products);
    const productList = products[0];
    const {error: deleteProductError, isDeleted} = useSelector((state) => state.deleteProduct);
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };


    useEffect(() => {
        if (error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteProductError)
        {
            alert.error(deleteProductError);
            dispatch(clearErrors());
        }
        if (isDeleted)
        {
            alert.success("Product Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({
                type: DELETE_PRODUCT_RESET,
            });
        }
        dispatch(getAllProductsAdmin());
    }, [dispatch, alert, error, navigate, deleteProductError, isDeleted]);
    const columns =[
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const id = params.getValue(params.id, "id");
                // {`/admin/product/${id}`}
                return (
                    <Fragment>
                        <Link to={`/admin/product/${id}`} style={{cursor: 'pointer'}}>
                            <MdEdit />
                        </Link>
                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
                            <MdDelete />
                        </Button>
                    </Fragment>
                );
            }
        },
    ];

    const rows =[];


    productList && productList.forEach((item1) => {
        rows.push({
        id: item1._id,
        stock: item1.stock,
        price: item1.price,
        name: item1.name,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id="productListHeading">
                        ALL PRODUCTS
                    </h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;