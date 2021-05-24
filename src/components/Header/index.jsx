import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./styles.scss";

import Logo from "../../assets/MODE.png";
import { auth } from "../../firebase/utils";
import { user } from "../../redux/User/user.reducer";

const Header = () => {
  const history = useHistory();

  const signOut = () => {
    auth.signOut();
    history.push("/login");
  };

  const currentUser = useSelector(user);

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
          <>
            <div className='dashboard'>
              <Link to='/dashboard'>My Account</Link>
            </div>
            <div className='linkToLogin'>
              <Link onClick={signOut}>Logout</Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
