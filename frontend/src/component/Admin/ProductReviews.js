import React, { Fragment, useEffect, useState } from 'react';
import './ProductList.css';
import './ProductReviews.css';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import {
    clearErrors,
    getAllReviews,
    deleteReviewsOfAProduct
} from '../../actions/productAction';
import {useAlert} from 'react-alert';
import {Button} from '@material-ui/core';
import MetaData from '../layout/MetaData';
import {
    MdStar,
    MdDelete
} from 'react-icons/md';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

const ProductReviews = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {error, reviews, loading } = useSelector((state) => state.productReviews);
    const {error: deleteReviewError, isDeleted} = useSelector((state) => state.deleteReview);
    
    
    const [productId, setProductId] = useState("");
    
    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviewsOfAProduct(reviewId, productId));
    };


    const productReviewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };


    useEffect(() => {
        if (productId.length === 24) 
        {
            dispatch(getAllReviews(productId));
        }
        if (error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteReviewError)
        {
            alert.error(deleteReviewError);
            dispatch(clearErrors());
        }
        if (isDeleted)
        {
            alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({
                type: DELETE_REVIEW_RESET,
            });
        }
    }, [dispatch, alert, error, navigate, deleteReviewError, isDeleted, productId]);
    const columns =[
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,
            renderCell: (cellValues) => {
                const val = cellValues?.value;
                if (val < 3)
                {
                    return (
                        <div style={{color: "red"}}>{val}</div>
                    );
                }
                if (val)
                {
                    return (
                        <div style={{color: "green"}}>{val}</div>
                    );
                }
            }
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
                return (
                    <Fragment>
                        <Button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))}>
                            <MdDelete />
                        </Button>
                    </Fragment>
                );
            }
        },
    ];

    const rows =[];


    reviews && reviews.forEach((item1) => {
        rows.push({
        id: item1._id,
        rating: item1.rating,
        comment: item1.comment,
        name: item1.name,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL REVIEWS - Admin`} />
            <div className='dashboard'>
                <Sidebar />
                <div className='productReviewsContainer'>
                <form 
                        className='productReviewsForm'
                        onSubmit={productReviewSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
                        <div>
                            <MdStar />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>
                        
                        
                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                    {
                        reviews && reviews.length > 0 ? (
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className='productListTable'
                                autoHeight
                            />
                        ) : (
                        <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductReviews;