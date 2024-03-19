import React, { Fragment, useEffect, useRef, useState } from 'react';
import './LoginSignUp.css';
import Loader from '../layout/Loader/loader';
import { Link } from 'react-router-dom';
import { MdFace, MdMailOutline } from 'react-icons/md';
import { MdLockOpen } from 'react-icons/md';
import Profile from '../../images/Profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors, register } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginSignUp = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();

    const { error, loading, isAuthenticated } = useSelector(state => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const {name, email, password} = user;

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");


    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar")
        {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) //0- Initial, 1- Processing, 2- Finished
                {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        else
        {
            setUser({ ...user, [e.target.name]: e.target.value})
        }
    };

    // console.log(location.search.split("=")[1]);
    // const redirect = location.search ? location.search.split("=")[1] : "/account";
    // console.log(redirect);

    useEffect (() => {
        if (error)
        {
            alert.error(error);
            dispatch (clearErrors());
        }
        if (isAuthenticated)
        {
            if (location.search && location.search.split("=")[1] === "shipping")
            {
                navigate("/shipping");
            }
            else
            {
                navigate("/account");
            }
        }
    },[dispatch, error, alert, isAuthenticated, navigate]);

    const switchTabs = (e, tab) => {
        if (tab === "login")
        {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register")
        {
            switcherTab.current.classList.remove("shiftToNeutral");
            switcherTab.current.classList.add("shiftToRight");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };


    return (
        <Fragment>
            {
                loading ?
                <Loader />
                :
                <Fragment>
                <div className='LoginSignUpContainer'>
                <div className='LoginSignUpBox'>
                    <div>
                        <div className='login_signup_toggle'>
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            <MdMailOutline />
                            <input
                                type="email"
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className='loginPassword'>
                            <MdLockOpen />
                            <input
                                type="password"
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot">Forget Password</Link>
                        <input type="submit" value="Login" className='loginBtn' />
                    </form>
                    <form className='signUpForm'
                        ref={registerTab}
                        encType="multipart/form-data" 
                        onSubmit={registerSubmit}>
                        <div className='signUpName'>
                            <MdFace />
                            <input type="text"
                                placeholder='Name'
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='signUpEmail'>
                            <MdMailOutline />
                            <input type="email"
                                placeholder='E-Mail'
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='signUpPassword'>
                            <MdLockOpen />
                            <input type="password"
                                placeholder='Password'
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className='registerImage'>
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type="submit"
                            value="Register"
                            className='signUpBtn'
                        />
                    </form>
                </div>
            </div>
            </Fragment>
            }
        </Fragment>
  )
}

export default LoginSignUp