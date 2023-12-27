const initialState = {
  currentUser: null,
  errorMessage: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        currentUser: null,
        errorMessage: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null,
      };
    case "LOGOUT_FAILURE":
      return {
        ...state,
        currentUser: null,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
