import React, { useState } from "react";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { auth, handleUserProfile } from "../../firebase/utils";
import "./styles.scss";

const SignUp = () => {
  const initialState = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: [],
  };

  const [inputValues, setInputValues] = useState(initialState);

  const { displayName, email, password, confirmPassword, errors } = inputValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      const err = ["Password must be at least 8 characters"];
      setInputValues({ ...inputValues, errors: err });
      return;
    }
    if (confirmPassword !== password) {
      const err = ["Passwords don't match"];
      setInputValues({ ...inputValues, errors: err });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      setInputValues(initialState);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='signup'>
      <div className='wrap'>
        <h2>Sign Up</h2>
        {errors.length > 0 && (
          <ul className='errors'>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            placeholder='full name'
            label='Full name'
            handleChange={handleChange}
          />
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
            placeholder='8 characters min'
            label='Password'
            handleChange={handleChange}
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            placeholder='confirm your password'
            label='Confirm password'
            handleChange={handleChange}
          />
          <Button>Register</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;