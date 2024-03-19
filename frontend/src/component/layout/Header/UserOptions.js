import React, { Fragment, useState } from 'react'
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { MdDashboard, MdPerson, MdExitToApp, MdListAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import { MdShoppingCart } from 'react-icons/md';

const UserOptions = ({ user }) => {

    const { cartItems } = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    //const imageUrl = user.avatar.url ? user.avatar.url : Profile;
    const options = [
        { icon: <MdListAlt />, name: "Orders", func: orders },
        { icon: <MdPerson />, name: "Profile", func: account },
        { icon: <MdShoppingCart style={{color: cartItems.length > 0 ? 'cadetblue' : "unset" }} />, 
        name: `Cart(${cartItems.length})`, 
        func: cart },
        { icon: <MdExitToApp />, name: "Logout", func: logoutUser },
    ];
    
    if (user.role === "admin")
    {
        options.unshift({ 
            icon: <MdDashboard />,
            name: "Dashboard",
            func: dashboard 
        });
    }

    function dashboard() {
        navigate('/admin/dashboard');
    }

    function orders() {
        navigate('/orders/me');
    }

    function account() {
        navigate('/account');
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
        navigate('/');
    }

    function cart() {
        navigate('/cart');
    }

    return (
    <Fragment>
        <Backdrop open={open} style={{zIndex: "10"}}/>
        <SpeedDial
            className='speedDial'
            ariaLabel='SpeedDial tooltip example'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{zIndex: "11"}}
            open={open}
            direction="down"
            icon={<img
                    className='speedDialIcon'
                    src={user.avatar.url ? user.avatar.url : '/Profile.png'}
                    alt="Profile"
                />}
                sx={{ position: 'absolute', bottom: 16, right: 16, '& .MuiFab-primary': { backgroundColor: 'lightGray', width: 40, height: 40, '& .MuiSpeedDialIcon-icon': { fontSize: 30 }, '&:hover': {backgroundColor: 'lightGray'} } }}
        >
            {
                options.map((item) => (
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <= 600 ? true: false} />
                ))
            }
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions