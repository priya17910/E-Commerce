import React, { Fragment, useEffect, useState } from 'react';
import './ProductList.css';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
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
import { deleteOrders, getAllOrders, clearErrors } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

const OrderList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {error, orders} = useSelector((state) => state.allOrders);
    //const productList = products[0];
    const {error: deleteOrderError, isDeleted} = useSelector((state) => state.deleteUpdateOrders);
    const deleteOrdersHandler = (id) => {
        dispatch(deleteOrders(id));
    };


    useEffect(() => {
        if (error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteOrderError)
        {
            alert.error(deleteOrderError);
            dispatch(clearErrors());
        }
        if (isDeleted)
        {
            alert.success("Order Deleted Successfully");
            navigate("/admin/orders");
            dispatch({
                type: DELETE_ORDER_RESET,
            });
        }
        dispatch(getAllOrders());
    }, [dispatch, alert, error, navigate, deleteOrderError, isDeleted]);
    const columns =[
      {
        field: "id", 
        headerName: "Order ID", 
        minWidth: 300, 
        flex: 1
    },
    {
        field: "status", 
        headerName: "Status", 
        minWidth: 150, 
        flex: 0.5,
        renderCell: (cellValues) => {
            const val = cellValues?.value;
            if (val === 'Processing')
            {
                return (
                    <div style={{color: "red"}}>{val}</div>
                );
            }
            if (val === 'Delivered')
            {
                return (
                    <div style={{color: "green"}}>{val}</div>
                );
            }
        }
    },
    {
        field: "itemsQty", 
        headerName: "Items Qty", 
        type: "number", 
        minWidth: 150, 
        flex: 0.4
    },
    {
        field: "amount", 
        headerName: "Amount", 
        type: "number", 
        minWidth: 270, 
        flex: 0.5
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
                        <Link to={`/admin/order/${id}`} style={{cursor: 'pointer'}}>
                            <MdEdit />
                        </Link>
                        <Button onClick={() => deleteOrdersHandler(params.getValue(params.id, "id"))}>
                            <MdDelete />
                        </Button>
                    </Fragment>
                );
            }
        },
    ];

    const rows =[];


    orders && orders.forEach((item1) => {
        rows.push({
        id: item1._id,
        itemsQty: item1.orderItems.length,
        amount: item1.totalPrice,
        status: item1.orderStatus,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productListContainer'>
                    <h1 id="productListHeading">
                        ALL ORDERS
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

export default OrderList;