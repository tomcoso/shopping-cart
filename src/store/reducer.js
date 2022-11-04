import { combineReducers } from "redux";
import cartDisplayReducer from "./cartDisplayReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  display: cartDisplayReducer,
});

export default rootReducer;
