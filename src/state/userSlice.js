import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  password: '',
  confpass: '',
  pic: ''
}

export const userSlice = createSlice({
  name: 'user_data',
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
    setPic: (state, action) => {
      state.pic = action.payload
    },
  },
})


export const { setEmail, setPassword, setConfpass, setPic } = userSlice.actions
export default userSlice.reducer