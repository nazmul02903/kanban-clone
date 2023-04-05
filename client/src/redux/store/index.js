import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../service/auth";
import { boardApi } from "../service/board";
import authReducer from "../app/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, boardApi.middleware]),
});
