import { userTypes } from "./user.actions";

const {
  SET_CURRENT_USER,
  SIGN_UP_ERRORS,
  RESET_PASSWORD_ERRORS,
  RESET_PASSWORD_SUCCESS,
} = userTypes;

const initialState = {
  currentUser: null,
  signUpErrors: [],
  resetPasswordErrors: [],
  resetPasswordSuccess: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        resetPasswordErrors: [],
        signUpErrors: [],
      };
    case SIGN_UP_ERRORS:
      return { ...state, signUpErrors: action.payload };
    case RESET_PASSWORD_ERRORS:
      return { ...state, resetPasswordErrors: action.payload };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
        resetPasswordErrors: [],
        signUpErrors: [],
      };
    default:
      return state;
  }
};

export const user = ({ user }) => user.currentUser;

export default userReducer;
