import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import userReducer from "../feature/user.slice";
import loginReducer from "../feature/login.slice";
export default configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
  },
  middleware: [thunkMiddleware],
});
