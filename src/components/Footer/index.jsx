import React from "react";
import "./styles.scss";
import Logo from "../../assets/MODE.png";

const Footer = (props) => {
  return (
    <footer className='footer'>
      <div className='wrap'>
        <div className='copyRight'>&copy;</div>
        <div className='logo'>
          <img src={Logo} alt='logo' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
