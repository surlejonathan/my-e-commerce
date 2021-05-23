import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles.scss";

import Logo from "../../assets/MODE.png";
import { auth } from "../../firebase/utils";

const Header = ({ currentUser }) => {
  const signOut = () => {
    auth.signOut();
  };

  return (
    <header className='header'>
      <div className='wrap'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='My E-Commerce logo' />
          </Link>
        </div>
        {!currentUser ? (
          <>
            <div className='linkToRegistration'>
              <Link to='/registration'>Register</Link>
            </div>
            <div className='linkToLogin'>
              <Link to='/login'>Login</Link>
            </div>
          </>
        ) : (
          <div className='linkToLogin'>
            <Link onClick={signOut}>Logout</Link>
          </div>
        )}
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};
export default Header;
