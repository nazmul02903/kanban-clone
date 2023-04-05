import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../service/auth";
import { boardApi } from "../service/board";
import authReducer from "../app/authSlice";
import boardReducer from "../app/boardSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
    [authApi.reducerPath]: authApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, boardApi.middleware]),
});
