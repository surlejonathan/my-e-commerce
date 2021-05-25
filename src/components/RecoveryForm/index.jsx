import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/User/user.actions";
import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import "./styles.scss";

const RecoveryForm = () => {
  const initialState = { email: "", errors: [] };
  const [inputValues, setInputValues] = useState(initialState);

  const { email, errors } = inputValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const history = useHistory();

  const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordErrors: user.resetPasswordErrors,
  });
  const { resetPasswordSuccess, resetPasswordErrors } = useSelector(mapState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (resetPasswordErrors.length > 0) {
      setInputValues({ ...inputValues, errors: resetPasswordErrors });
    }
  }, [resetPasswordErrors]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      history.push("/login");
    }
  }, [resetPasswordSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
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
