import React, { Fragment, useEffect, useState } from 'react';
import './NewProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import {
    MdAccountTree,
    MdDescription,
    MdStorage,
    MdSpellcheck
} from 'react-icons/md';
import {
    FaRupeeSign
} from 'react-icons/fa';
import Sidebar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate, useParams } from 'react-router-dom';


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "Watches",
];



const UpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, product } = useSelector((state) => state.productDetails);
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.deleteProduct);
    const {id} = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    useEffect(() => {
        if (product && product._id !== id)
        {
            dispatch(getProductDetails(id));
        }
        else
        {
            setName(product?.name);
            setDescription(product?.description);
            setCategory(product?.category);
            setPrice(product?.price);
            setStock(product?.stock);
            setOldImages(product?.images);
        }
        if (error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError)
        {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated)
        {
            alert.success("Product Updated Successfully");
            navigate("/admin/products");
            dispatch({
                type: UPDATE_PRODUCT_RESET
            });
        }
    }, [dispatch, alert, updateError, navigate, isUpdated, error, product, id]);


    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(id, myForm));
    };


    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
          reader.readAsDataURL(file);
        });
    };


    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className='dashboard'>
                <Sidebar />
                <div className='newProductContainer'>
                    <form 
                        className='createProductForm'
                        encType='multipart/form-data'
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Create Product</h1>
                        <div>
                            <MdSpellcheck />
                            <input 
                                type="text"
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <FaRupeeSign />
                            <input 
                                type="number"
                                placeholder='Price'
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <MdDescription />
                            <textarea
                                placeholder='Product Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="10"
                                rows="1"
                            >

                            </textarea>
                        </div>
                        <div>
                            <MdAccountTree />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">
                                    Choose Category
                                </option>
                                {
                                    categories.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <MdStorage />
                            <input 
                                type="number"
                                placeholder='Stock'
                                required
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>
                        <div id="createProductFormImage">
                            {
                                oldImages && oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))
                            }
                        </div>
                        <div id="createProductFormImage">
                            {
                                imagesPreview.map((image, index) => (
                                    <img key={index} src={image} alt="Product Preview" />
                                ))
                            }
                        </div>
                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update Product
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProduct;