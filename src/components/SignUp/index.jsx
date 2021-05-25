import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthWrapper from "../AuthWrapper";
import { signUp } from "../../redux/User/user.actions";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
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

  const dispatch = useDispatch();

  const signUpErrors = useSelector(({ user }) => user.signUpErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    if (signUpErrors.length > 0) {
      setInputValues({ ...inputValues, errors: signUpErrors });
    }
  }, [signUpErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp({ displayName, email, password, confirmPassword }));
  };

  return (
    <AuthWrapper headline='Sign Up'>
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
    </AuthWrapper>
  );
};

export default SignUp;
