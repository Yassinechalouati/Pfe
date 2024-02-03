import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

//store that contains a global state
export const store = configureStore({
  reducer: {
    userData: userReducer
  }
})