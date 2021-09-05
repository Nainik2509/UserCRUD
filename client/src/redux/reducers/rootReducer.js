// ** THIRD party imports
import { combineReducers } from "redux";

import auth from "./auth";
import user from "./user";

// ** Root Ruducers to combine all store datas
const rootReducer = combineReducers({
  authApp: auth,
  userApp: user,
});

export default rootReducer;
