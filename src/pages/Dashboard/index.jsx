import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";

const Dashboard = (props) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  return (
    <div className='dashboard'>
      <h1>Hello {currentUser.displayName}, you're logged in !</h1>
    </div>
  );
};

export default Dashboard;
