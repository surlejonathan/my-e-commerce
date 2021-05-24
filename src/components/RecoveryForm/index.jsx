import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import "./styles.scss";

const RecoveryForm = () => {
  const initialState = { email: "", errors: [] };
  const [inputValues, setInputValues] = useState(initialState);

  const { email, errors } = inputValues;

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { url: "http://localhost:3000/login" };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => history.push("/login"))
        .catch(() => {
          const err = ["Email not found. Please try again."];
          setInputValues({ ...inputValues, errors: err });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthWrapper headline='Recovery'>
      {errors.length > 0 && (
        <ul className='errors'>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          name='email'
          placeholder='your email'
          value={email}
          handleChange={handleChange}
        />
        <Button type='submit'>Reset my password</Button>
      </form>
    </AuthWrapper>
  );
};

export default RecoveryForm;
