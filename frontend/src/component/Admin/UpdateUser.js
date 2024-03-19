import React, { Fragment, useEffect, useState } from 'react';
import './NewProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import {
    MdMailOutline,
    MdPerson,
    MdVerifiedUser
} from 'react-icons/md';
import Sidebar from './Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser, clearErrors } from '../../actions/userAction';
import Loader from '../layout/Loader/loader';


const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();
    const { loading, error, user } = useSelector((state) => state.userDetails);

    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);



    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");


    const userId = params.id;
    useEffect(() => {
        if (user && user._id !== userId)
        {
            dispatch(getUserDetails(userId));
        }
        else
        {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
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
            alert.success("User Updated Successfully");
            dispatch(getUserDetails(userId));
            navigate("/admin/users");
            dispatch({
                type: UPDATE_USER_RESET
            });
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);


    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        
        dispatch(updateUser(params.id, myForm));
    };


    return (
        <Fragment>
            <MetaData title="Update User --- Admin" />
            <div className='dashboard'>
                <Sidebar />
                <div className='newProductContainer'>
                    {
                        loading ? (<Loader />)
                        :
                        (
                        <form 
                        className='createProductForm'
                        encType='multipart/form-data'
                        onSubmit={updateUserSubmitHandler}
                    >
                        <h1>Update User</h1>
                        <div>
                            <MdPerson />
                            <input 
                                type="text"
                                placeholder='Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MdMailOutline />
                            <input 
                                type="email"
                                placeholder='Email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <MdVerifiedUser />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">
                                    Choose Role
                                </option>
                                <option value = "admin">
                                    Admin
                                </option>
                                <option value = "user">
                                    User
                                </option>
                            </select>
                        </div>
                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={updateLoading ? true : false || role === "" ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateUser;