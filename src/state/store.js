import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import errorReducer from './slices/errorSlice'

//store that contains a global state
export const store = configureStore({
  reducer: {
    userData: userReducer, //contains signup user Data
    Error: errorReducer // contains Errors to show
  }
})