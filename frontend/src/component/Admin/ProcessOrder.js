import React, {Fragment, useEffect, useState} from 'react';
import './ProcessOrder.css';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { clearErrors, loadUser } from '../../actions/userAction';
import Sidebar from './Sidebar';
import {
    MdAccountTree
} from 'react-icons/md';
import { orderDetails, updateOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/loader';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import {useAlert} from 'react-alert';
const ProcessOrder = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const {order, error, loading} = useSelector((state) => state.orderDetails);
    const {error: updateError, isUpdated} = useSelector((state) => state.deleteUpdateOrders);
    const [status, setStatus] = useState('');
    const alert = useAlert();

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("status", status);
    
        dispatch(updateOrders(params.id, myForm));
    };
    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(updateError)
        {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated)
        {
            alert.success("Order Updated Successfully");
            dispatch({
                type: UPDATE_ORDER_RESET
            });
        }
        dispatch(orderDetails(params.id));
    }, [dispatch, error, alert, params.id, isUpdated, updateError]);
    return (
        <Fragment>
            <MetaData title="Process Order" />
            <div className='dashboard'>
                <Sidebar />
                <div className='newProductContainer'>
                    {
                        loading ? (<Loader />)
                        :
                        (
                            <>
                            <div className='confirmOrderPage'>
                                <div>
                                    <div className='confirmShippingArea'>
                                        <Typography>Shipping Info</Typography>
                                        <div className='orderDetailsContainerBox'>
                                            <div>
                                                <p>Name: </p>
                                                <span>
                                                    {
                                                        order.user && order.user.name
                                                    }
                                                </span>
                                            </div>
                                            <div>
                                                <p>Phone: </p>
                                                <span>
                                                {
                                                    order.shippingInfo && order.shippingInfo.phoneNo
                                                }
                                                </span>
                                            </div>
                                            <div>
                                                <p>Address: </p>
                                                <span>
                                                    {
                                                        order &&
                                                        order.shippingInfo && 
                                                        `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.pinCode}, ${order?.shippingInfo?.country}`
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <Typography>Payment</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p
                                                    className={
                                                    order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                        ? "greenColor"
                                                        : "redColor"
                                                    }
                                                >
                                                {
                                                    order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"
                                                }
                                                </p>
                                            </div>
                                            <div>
                                                <p>Amount:</p>
                                                <span>{order.totalPrice && order.totalPrice}</span>
                                            </div>
                                        </div>
                                        <Typography>Order Status</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p
                                                    className={
                                                    order.orderStatus && order.orderStatus === "Delivered"
                                                    ? "greenColor"
                                                    : "redColor"
                                                    }
                                                >
                                                    {order.orderStatus && order.orderStatus}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='confirmCartItems'>
                                        <Typography>Your Cart Items:</Typography>
                                        <div className='confirmCartItemsContainer'>
                                        {
                                            order.orderItems && 
                                            order.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                                                <span>
                                                    {item.quantity} x ₹{item.price} = {" "}
                                                    <b>
                                                        ₹{item.price * item.quantity}
                                                    </b>
                                                </span>
                                            </div>
                                            ))
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div 
                                style=
                                {{
                                    display: order.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form 
                                    className='updateOrderForm'
                                    encType='multipart/form-data'
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>
                                    <div>
                                        <MdAccountTree />
                                        <select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="">
                                                Choose Status
                                            </option>
                                            {
                                                order.orderStatus === "Processing" && (
                                                    <option value="Shipped">
                                                        Shipped
                                                    </option>
                                                )
                                            }
                                            {
                                                order.orderStatus === "Shipped" && (
                                                    <option value="Delivered">
                                                        Delivered
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={loading ? true : false || status === "" ? true : false}
                                    >
                                        Update Order
                                    </Button>
                                </form>
                            </div>
                            </>
                    )
                }
            </div>
        </div>
    </Fragment>
    )
}

export default ProcessOrder;