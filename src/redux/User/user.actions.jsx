import { auth, handleUserProfile, GoogleProvider } from "../../firebase/utils";

export const userTypes = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SIGN_UP_ERRORS: "SIGN_UP_ERRORS",
  RESET_PASSWORD_ERRORS: "RESET_PASSWORD_ERRORS",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
};

export const setUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInWithEmailAndPassword =
  ({ email, password }) =>
  async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(err);
    }
  };

export const signInWithGoogle = () => async () => {
  try {
    await auth.signInWithPopup(GoogleProvider);
  } catch (err) {
    console.log(err);
  }
};

export const signUp =
  ({ displayName, email, password, confirmPassword }) =>
  async (dispatch) => {
    if (password.length < 8) {
      const err = ["Password must be at least 8 characters"];
      dispatch({
        type: userTypes.SIGN_UP_ERRORS,
        payload: err,
      });
      return;
    }
    if (confirmPassword !== password) {
      const err = ["Passwords don't match"];
      dispatch({
        type: userTypes.SIGN_UP_ERRORS,
        payload: err,
      });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
    } catch (err) {
      console.log(err);
    }
  };

export const resetPassword =
  ({ email }) =>
  async (dispatch) => {
    const config = { url: "http://localhost:3000/login" };
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() =>
          dispatch({
            type: userTypes.RESET_PASSWORD_SUCCESS,
            payload: true,
          })
        )
        .catch(() => {
          const err = ["Email not found. Please try again."];
          dispatch({
            type: userTypes.RESET_PASSWORD_ERRORS,
            payload: err,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
