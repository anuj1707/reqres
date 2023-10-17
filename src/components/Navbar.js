import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './images/logos.png.png'
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-elements">
      <img src={logo} className='logocss' />
      &nbsp;&nbsp;&nbsp;
 <h1><Link to="/"><i className="fa-brands fa-node-js"></i> ACME </Link></h1>
        <div className="menuIcon">
          {/* {close ? <i className="fa-solid fa-xmark" onClick={handleOnClick}></i> : 
         <i className="fa-solid fa-bars" onClick={handleOnClick}></i>} */}
          <ul className='nav-items'>

          </ul>
        </div>
      </div>
    </div>


  );
};

export default Navbar;
