// subscriptionReducer.js
const subscriptionReducer = (state = { status: null }, action) => {
    switch (action.type) {
      case "SET_SUBSCRIPTION_STATUS":
        return {
          ...state,
          status: action.status,
        };
      case "RESET_SUBSCRIPTION_STATUS":
        return {
          ...state,
          status: null,
        };
      default:
        return state;
    }
  };
  
  export default subscriptionReducer;
  