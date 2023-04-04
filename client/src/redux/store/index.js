import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../service/auth";
import authReducer from "../app/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
