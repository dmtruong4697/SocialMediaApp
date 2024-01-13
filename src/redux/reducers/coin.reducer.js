const initialState = {
  coin: 0,
  errorMessage: "",
};
const coinReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BUY_COIN_SUCCESS":
      return {
        ...state,
        coin: action.payload,
        errorMessage: null,
      };
    case "BUY_COIN_FAILURE":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "UPDATE_COIN_SUCCESS":
      return {
        ...state,
        coin: action.payload,
        errorMessage: null,
      };
    case "UPDATE_COIN_FAILURE":
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default coinReducer;
