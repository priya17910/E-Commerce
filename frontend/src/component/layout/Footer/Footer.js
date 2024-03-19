import React from 'react';
import playstore from '../../../images/playstore.png';
import appstore from '../../../images/Appstore.png';
import './Footer.css';
const Footer = () => {
  return (
      <footer id = "footer">
          <div className = "leftFooter">
              <h4>Download Our App</h4>
              <p>Download App For Android And IOS Mobile Phone</p>
              <img src = {playstore} alt = "playstore" />
              <img src = {appstore} alt = "Appstore" />
          </div>
          <div className = "midFooter">
              <h1>Click And Collect</h1>
              <p>High Quality is our first priority</p>

              <p>Copyrights 2023 &copy; PG</p>
          </div>
          <div className = "rightFooter">
              <h4>Follow Us</h4>
              <a href = "">Instagram</a>
              <a href = "">YouTube</a>
              <a href = "">Facebook</a>
          </div>
      </footer>
  )
}

export default Footer