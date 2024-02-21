import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import errorReducer from './slices/errorSlice'
import tutorReducer from './slices/tutorSlice'
import loginReducer from './slices/loginSlice'

//store that contains a global state
export const store = configureStore({
  reducer: {
    userData: userReducer, //contains signup user Data
    Error: errorReducer, // contains Errors to show
    tutorData: tutorReducer, //contains tutor signup Data
    loginData: loginReducer, //contains user login Data
  }
})