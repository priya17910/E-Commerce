import React, {useEffect} from 'react';
import Sidebar from './Sidebar.js';
import './Dashobard.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAdmin } from '../../actions/productAction.js';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userAction.js';




const Dashboard = () => {

    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    const {orders} = useSelector((state) => state.allOrders);
    const {users} = useSelector((state) => state.allUsers);
    const productList = products[0];
    console.log(productList);
    console.log(productList?.length);
    let outOfStock = 0;
    productList && productList?.forEach((item) => {
        if (item.stock === 0)
        {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAllProductsAdmin());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);



    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["indianred"],
                hoverBackgroundColor: ["rgb(197, 72, 49"],
                data: [0, 4000],
            },
        ],
    };


    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#008B8B", "#35014F"],
            data: [outOfStock, productList?.length - outOfStock],
          },
        ],
    };



    return (
    <div className='dashboard'>
        <Sidebar />
        <div className='dashboardContainer'>
            <Typography component='h1'>Dashboard</Typography>
            <div className='dashboardSummary'>
                <div>
                    <p>
                        Total Amount <br /> ₹2000
                    </p>
                </div>
                <div className='dashboardSummaryBox2'>
                    <Link to='/admin/products'>
                        <p>Product</p>
                        <p>{productList && productList?.length}</p>
                    </Link>
                    <Link to='/admin/orders'>
                        <p>Orders</p>
                        <p>{orders && orders.length}</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>{users && users.length}</p>
                    </Link>
                </div>
            </div>
            <div className='lineChart'>
                <Line data={lineState} />
            </div>
            <div className="doughnutChart">
                <Doughnut data={doughnutState} />
            </div>
        </div>
    </div>
    )
}

export default Dashboard;