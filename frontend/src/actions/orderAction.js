import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CLEAR_ERRORS,
    My_ORDER_REQUEST,
    My_ORDER_SUCCESS,
    My_ORDER_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILURE,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAILURE,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILURE,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_RESET,
} from '../constants/orderConstants';
import axios from 'axios';

// CREATE ORDER
export const createOrder = (order) => async (dispatch) => {
    try
    {
        dispatch({
            type: CREATE_ORDER_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/order/new", order, config);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    }
    catch(error)
    {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.response.data.message,
        });
    }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch ({
        type: CLEAR_ERRORS,
    });
};


// MY ORDERS
export const myOrders = () => async (dispatch) => {
    try
    {
        dispatch({
            type: My_ORDER_REQUEST,
        });
        const { data } = await axios.get("/api/v1/orders/me");
        dispatch({
            type: My_ORDER_SUCCESS,
            payload: data.orders,
        });
    }
    catch(error)
    {
        dispatch({
            type: My_ORDER_FAILURE,
            payload: error.response.data.message,
        });
    }
};


// ORDER DETAILS
export const orderDetails = (id) => async (dispatch) => {
    try
    {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });
        const { data } = await axios.get(`/api/v1/order/${id}`);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
        });
    }
    catch(error)
    {
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: error.response.data.message,
        });
    }
};




// GET ALL ORDERS --- ADMIN
export const getAllOrders = () => async (dispatch) => {
    try
    {
        dispatch({
            type: ALL_ORDER_REQUEST,
        });
        const { data } = await axios.get("/api/v1/admin/orders");
        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload: data.orders,
        });
    }
    catch(error)
    {
        dispatch({
            type: ALL_ORDER_FAILURE,
            payload: error.response.data.message,
        });
    }
};



// UPDATE ORDER --- ADMIN
export const updateOrders = (id, order) => async (dispatch) => {
    try
    {
        dispatch({
            type: UPDATE_ORDER_REQUEST,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);
        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success,
        });
    }
    catch(error)
    {
        dispatch({
            type: UPDATE_ORDER_FAILURE,
            payload: error.response.data.message,
        });
    }
};


// DELETE ORDERS --- ADMIN
export const deleteOrders = (id) => async (dispatch) => {
    try
    {
        dispatch({
            type: DELETE_ORDER_REQUEST,
        });
        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success,
        });
    }
    catch(error)
    {
        dispatch({
            type: DELETE_ORDER_FAILURE,
            payload: error.response.data.message,
        });
    }
};



