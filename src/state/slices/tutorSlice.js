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
  wifiQuality: '',
  languages: [{id:0, language:'English'}],
  workExperience: [{id:0, title:'', tag:'Advertising', description:''}],
  education: [{id:0, title:'', tag:'Advertising', description:''}],
  error: '',
  steps:0,
  verificationPlaceholder: false,
  TeachingStyle: '',
  AboutMe: '',
  Country: ''

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
    setWorkExperience: (state, action) => {
      state.workExperience = action.payload
    },
    setEducation: (state, action) => {
      state.education = action.payload
    },
    setWifiQuality: ( state, action )=> {
      state.wifiQuality = action.payload
    },
    setCountry: (state, action )=> {
      state.Country = action.payload
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
  setLanguages,
  setEducation, 
  setWorkExperience,
  setWifiQuality,
  setCountry
} = userSlice.actions
export default userSlice.reducer