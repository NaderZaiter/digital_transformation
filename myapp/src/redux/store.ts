import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import budgetReducer from "./slices/budgetSlice";

const reducer = {
  auth: authReducer,
  user: userReducer,
  budget: budgetReducer,
};

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});
