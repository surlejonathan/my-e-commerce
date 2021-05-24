import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";

import "./styles.scss";
import { FcGoogle } from "react-icons/fc";
import { auth, signInWithGoogle } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";

const SignIn = (props) => {
  const initialState = {
    email: "",
    password: "",
  };

  const [inputValues, setInputValues] = useState(initialState);

  const { email, password } = inputValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      auth.signInWithEmailAndPassword(email, password);
      setInputValues(initialState);
    } catch (err) {
      console.log(err);
    }
  };

  const authWrapperProps = {
    headline: "Sign In",
  };

  return (
    <AuthWrapper {...authWrapperProps}>
      <form onSubmit={handleSubmit}>
        <div className='emailPasswordSignIn'>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='your email'
            label='Email'
            handleChange={handleChange}
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            placeholder='Your password'
            label='Password'
            handleChange={handleChange}
          />
          <Button type='submit'>Sign in</Button>
        </div>
        <div>
          <p style={{ textAlign: "center" }}>OR</p>
        </div>
        <div className='socialSignIn'>
          <div className='row'>
            <div className='icon'>
              <FcGoogle size={20} />
            </div>
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          </div>
        </div>
        <div className='recoveryLink'>
          <Link to='/recovery'>I forgot my password</Link>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default SignIn;
