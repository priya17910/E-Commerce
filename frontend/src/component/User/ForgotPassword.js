import React, { Fragment, useEffect, useState } from 'react';
import Loader from '../layout/Loader/loader';
import { MdMailOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import MetaData from '../layout/MetaData';
import './ForgotPassword.css';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, message, loading } = useSelector(state => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };



    useEffect (() => {
        if (error)
        {
            alert.error(error);
            dispatch (clearErrors());
        }
        if (message)
        {
            alert.success(message);
        }
    },[dispatch, error, alert, navigate, message]);




    return (
    <Fragment>
            {
                loading ? <Loader />
                :
                <Fragment>
            <MetaData title="Forgot Password" />
            <div className='forgotPasswordContainer'>
                <div className='forgotPasswordBox'>
                <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                <form className='forgotPasswordForm'
                        onSubmit={forgotPasswordSubmit}>
                        <div className='forgotPasswordEmail'>
                            <MdMailOutline />
                            <input type="email"
                                placeholder='E-Mail'
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <input type="submit"
                            value="Send"
                            className='forgotPasswordBtn'
                        />
                    </form>
                </div>
            </div>
        </Fragment>
            }
        </Fragment>
  )
}

export default ForgotPassword