import React from "react";
import Shopmen from "../../assets/shopMens.jpg";
import Shopwomen from "../../assets/shopWomens.jpg";

import "./styles.scss";

const Directory = () => {
  return (
    <div className='directory'>
      <div className='wrap'>
        <div className='item' style={{ backgroundImage: `url(${Shopwomen})` }}>
          <a href='#'>Shop Women</a>
        </div>
        <div className='item' style={{ backgroundImage: `url(${Shopmen})` }}>
          <a href='#'>Shop Men</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
