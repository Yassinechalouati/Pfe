import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    email: '',
    password: '',
    tutorError: '',
    recaptchaRef: '',
    learnerError: '',
    recaptchaToken: '',
}


export const loginSlice = createSlice({
    name: 'login_data',
    initialState,
    reducers : {
        setEmail: (state, action)=>{
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setTutorError: (state, action) => {
            state.tutorError = action.payload
        },
        setLearnerError: (state, action) => {
            state.learnerError = action.payload
        },
        setRecaptchaToken: (state, action) => {
            state.recaptchaToken = action.payload
        },
        setRecaptchaRef: (state, action) => {
            
        }
    }
})

export const { setEmail, setPassword, setLearnerError, setTutorError, setRecaptchaToken} = loginSlice.actions
export default loginSlice.reducer