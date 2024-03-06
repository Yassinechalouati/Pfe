import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstname: '',
  lastname: '',
  hasPassword: '', // this indicates whether the learner is signed up using gmail or not
  country:'', 
  tel: '', 
  life_goals: '',
  focus_themes: '',
  comfortlevel: '',
  Birthday: '',
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
  error: '',
  verificationPlaceholder: false
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
    setVerificationLearner: (state, action) => {
      state.verificationPlaceholder = action.payload
    },
    setFirstName: (state, action) => {
      state.firstname= action.payload
    },
    setLastName: (state, action) => {
      state.lastname = action.payload
    },
    setCountry: (state, action) => {
      state.country = action.payload
    },
    setTel: (state, action) => {
      state.tel = action.payload
    },
    setLife_Goals: (state, action) => {
      state.life_goals = action.payload
    },
    setFocusThemes: (state, action) => {
      state.focus_themes = action.payload
    },
    setComfortLevel: (state, action) => {
      state.comfortlevel = action.payload
    },
    setBirthday: (state, action) => {
      state.Birthday = action.payload
    },
    setHasPassword: (state, action) => {
      state.hasPassword = action.payload
    },
    resetUserData: () => initialState
  },
})


export const { setEmail, setPassword, setConfpass, setPic, setProficiency, setGoals, setTopics, setSignUpStep, resetUserData, setError, setIsLoading, setIsVerified, setVerificationLearner, setBirthday,setComfortLevel,setCountry,setFirstName,setFocusThemes,setHasPassword,setLastName,setLife_Goals,setTel} = userSlice.actions
export default userSlice.reducer