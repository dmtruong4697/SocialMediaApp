const initialState = {
    inputType: 'Mark',
    markId: null,
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHANGE_INPUT_TYPE':
        return {
          ...state,
          inputType: action.payload,
        };
      case 'CHANGE_MARK_ID':
        return {
          ...state,
          markId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default postReducer;
  