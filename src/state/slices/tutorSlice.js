import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: '',
  password: '',
  confpass: '',
  isLoading: false,
  isVerified: 0,
  description: '',
  serverImage: '',
  displayableImage: '',
  introductionVideo:'',
  displayableVideo: '',
  languages: [{id:0, language:'English'}],
  error: '',
  steps:0,
  verificationPlaceholder: false,
  TeachingStyle: '',
  AboutMe: '',

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
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setTeachingStyle: (state, action) => {
      state.TeachingStyle = action.payload
    },
    setAboutMe: (state, action) => {
      state.AboutMe= action.payload
    },
    setSteps: (state, action) => {
      state.steps = action.payload
    },
    setDisplayableImage: (state, action) => {
      state.displayableImage = action.payload
    },
    setIntroductionVideo: (state, action) => {
      state.introductionVideo = action.payload
    },
    setServerImage: (state, action) => {
      state.serverImage = action.payload
    },
    setDisplayableVideo: (state, action) => {
      state.displayableVideo = action.payload
    },
    setLanguages: (state, action) => {
      state.languages = action.payload
    },
    resetUserData: (state, action) => {
      state.email = ''
      state.password = ''
      state.confpass = ''
      state.isLoading = false
    }
  },
})


export const { 
  setEmail, 
  setPassword, 
  setConfpass, 
  setIsLoading, 
  resetUserData, 
  setError, 
  setIsVerified, 
  setVerificationTutor, 
  setDescription, 
  setSteps, 
  setTeachingStyle, 
  setAboutMe,
  setDisplayableImage,
  setIntroductionVideo,
  setDisplayableVideo,
  setServerImage,
  setLanguages
} = userSlice.actions
export default userSlice.reducer