import { userTypes } from "./user.actions";

const { SET_CURRENT_USER } = userTypes;

const initialState = {
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export const user = ({ user }) => user.currentUser;

export default userReducer;
