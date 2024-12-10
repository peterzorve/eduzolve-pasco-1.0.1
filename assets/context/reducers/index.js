import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import subscriptionReducer from "./subscriptionReducer"

const myReducer = combineReducers({
  user: userAuthReducer,
  subscription: subscriptionReducer, 
});

export default myReducer;
