import React from 'react';
import {ReactNavbar} from 'overlay-navbar';
import logo from '../../../images/logo.png';
import { MdAccountCircle } from 'react-icons/md';
import { MdSearch } from 'react-icons/md';
import { MdAddShoppingCart } from 'react-icons/md';
import './Header.css'
const Header = () => {
  return (
    <>
    <div>
    <ReactNavbar 
        burgerColor = "rgb(11, 101, 121)" 
        burgerColorHover = "grey" 
        logo = {logo} 
        logoWidth = "20vmax"
        navColor1 = "lightblue"
        logoHoverSize = "10px"
        logoHoverColor = "lightGrey"
        link1Text = "Home"
        link2Text = "Products"
        link3Text = ""
        link4Text=""
        link1Url = "/"
        link2Url = "/products"
        link1Size = "1.3vmax"
        link1Color = "rgba(35, 35, 35, 0.8)"
        nav1justifyContent = "flex-end"
        nav2justifyContent = "flex-end"
        link1ColorHover = "darkcyan"
        link2ColorHover = "darkcyan"
        link1Margin = "1vmax"
        link2Margin = "1vmax"
        profileIcon = "true"
        profileIconColor = "rgba(35, 35, 35, 0.8)"
        profileIconUrl = "/login"
        ProfileIconElement = {MdAccountCircle}
        searchIcon = "true"
        searchIconColor = "rgba(35, 35, 35,0.8)"
        SearchIconElement = {MdSearch}
        cartIcon = "true"
        cartIconColor = "rgba(35, 35, 35,0.8)"
        CartIconElement = {MdAddShoppingCart}
        profileIconColorHover = "darkcyan"
        searchIconColorHover = "darkcyan"
        cartIconColorHover = "darkcyan"
        cartIconMargin = "1vmax"
    />
    </div>
    </>
  )
}

export default Header