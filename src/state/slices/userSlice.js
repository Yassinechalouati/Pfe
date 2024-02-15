import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  password: '',
  confpass: '',
  pic: 'user.png',
  proficiency:'',
  goals: [],
  topics: [],
  isLoading: false, 
  signupStep: 0, //indicates the user is currently at which step in the sign up process
  isVerified: false,
  error: ''
}

//slice that contains all the sign_up user informations
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
    setProficiency: (state, action) => {
      state.proficiency = action.payload
    },
    setGoals: (state, action) => {
      const index = state.goals.indexOf(action.payload);
      if (index !== -1) {
          // If the goal exists, remove it from the array
          state.goals = state.goals.filter((item, idx) => idx !== index)
      }
      else {
        // If the goal doesn't exist, add it to the array
        state.goals.push(action.payload)
      }
    },
    setTopics: (state, action) => {
      const index = state.topics.indexOf(action.payload);
      if (index !== -1) {
          // If the topic exists, remove it from the array
          state.topics = state.topics.filter((item, idx) => idx !== index)
      }
      else {
        // If the topic doesn't exist, add it to the array
        state.topics.push(action.payload)
      }
    },
    setSignUpStep: (state, action) => {
      state.signupStep = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    }
    ,
    setError: (state, action) => {
      state.error = action.payload
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload
    },
    resetUserData: (state, action) => {
      state.email = ''
      state.password = ''
      state.confpass = ''
      state.proficiency = ''
      state.goals= []
      state.topics= []
      state.signupStep = 0
      state.isLoading = false
    }
  },
})


export const { setEmail, setPassword, setConfpass, setPic, setProficiency, setGoals, setTopics, setSignUpStep, resetUserData, setError, setIsLoading, setIsVerified} = userSlice.actions
export default userSlice.reducer