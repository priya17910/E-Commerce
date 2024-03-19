import React, { Fragment, useEffect, useState } from 'react';
import './ResetPassword.css';
import Loader from '../layout/Loader/loader';
import { MdLockOpen, MdLockOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';




const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { token } = useParams();
    const navigate = useNavigate();

    const { error, success, loading } = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    };


    useEffect (() => {
        if (error)
        {
            alert.error(error);
            dispatch (clearErrors());
        }
        if (success)
        {
            alert.success("Password Updated Successfully");
            navigate("/login");
        }
    },[dispatch, error, alert, navigate, success]);

    return (
        <Fragment>
            {
                loading ? <Loader />
                :
                <Fragment>
                <MetaData title="Reset Password" />
                <div className='resetPasswordContainer'>
                <div className='resetPasswordBox'>
                <h2 className='resetPasswordHeading'>Update Password</h2>
                <form className='resetPasswordForm'
                        onSubmit={resetPasswordSubmit}>
                        <div className='newPassword'>
                            <MdLockOpen />
                            <input
                                type="password"
                                placeholder='New Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='confirmPassword'>
                            <MdLockOutline />
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <input type="submit"
                            value="Reset Password"
                            className='resetPasswordBtn'
                        />
                    </form>
                </div>
            </div>
        </Fragment>
            }
        </Fragment>
  )
}

export default ResetPassword