import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../service/auth'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath] : authApi.reducer
  },
})