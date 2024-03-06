import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    email: '',
    password: '',
    tutorError: '',
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
        resetFields: () => initialState
    }
})

export const { setEmail, setPassword, setLearnerError, setTutorError, resetFields, setRecaptchaToken} = loginSlice.actions
export default loginSlice.reducer