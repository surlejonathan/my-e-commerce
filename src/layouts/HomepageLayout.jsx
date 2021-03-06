import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomepageLayout = ({ children, ...props }) => {
  return (
    <div className='fullHeight'>
      <Header {...props} />
      {children}
      <Footer />
    </div>
  );
};

export default HomepageLayout;
