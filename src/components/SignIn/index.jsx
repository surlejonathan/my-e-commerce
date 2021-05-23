import React from "react";
import Button from "../forms/Button";
import "./styles.scss";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../firebase/utils";

const SignIn = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='signin'>
      <div className='wrap'>
        <h2>Login</h2>
      </div>
      <div className='formWrap'>
        <form onSubmit={handleSubmit}>
          <div className='socialSignIn'>
            <div className='row'>
              <div className='icon'>
                <FcGoogle size={20} />
              </div>
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
