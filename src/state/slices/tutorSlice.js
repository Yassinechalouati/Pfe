import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  password: '',
  confpass: '',
  isLoading: false,
  isVerified: 0,
  error: '',
  verificationPlaceholder: false
}

//slice that contains all the sign_up tutor informations
export const userSlice = createSlice({
  name: 'tutor_data',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setConfpass: (state, action) => {
      state.confpass = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload
    },
    setVerificationTutor: (state, action) => {
      state.verificationPlaceholder = action.payload
    },
    resetUserData: (state, action) => {
      state.email = ''
      state.password = ''
      state.confpass = ''
      state.isLoading = false
    }
  },
})


export const { setEmail, setPassword, setConfpass, setIsLoading, resetUserData, setError, setIsVerified, setVerificationTutor} = userSlice.actions
export default userSlice.reducer