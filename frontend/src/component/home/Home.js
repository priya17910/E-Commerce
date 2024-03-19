import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import Product from './Product.js';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../layout/Loader/loader';
import { useAlert } from 'react-alert';

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products, productCount} = useSelector(state => state.products);
    useEffect (() => {
        if (error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());

    }, [dispatch, error, alert]);

    return (
    <Fragment>
        {
            loading ? (
                <Loader />
            ) : 
            (
                <>
                <MetaData title = "E-COMMERCE"></MetaData>
                    <div className='banner'>
                        <p>Welcome to <span>Click And Collect</span></p>
                        <h1>Find Amazing Products Below</h1>

                        <a href = "#container">
                        <button>
                            Scroll <CgMouse />
                        </button>
                        </a>
                    </div>
                    <h2 className='homeHeading'>Featured Products</h2>
                    <div className='container' id='container'>
                    {
                        products && products.map(product => (
                        <Product product={product} />
                        ))
                    }
                    </div>
                </>
            )
        }
    </Fragment>
  )
}

export default Home