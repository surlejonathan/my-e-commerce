import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

import Logo from "../../assets/MODE.png";

const Header = (props) => {
  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='My E-Commerce logo' />
          </Link>
        </div>
        <div className='linkToRegistration'>
          <Link to='/registration'>Register</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
