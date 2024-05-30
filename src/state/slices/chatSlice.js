import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    convo: [],
    Notifications: []
  }


export const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers: {
        setConvo:(state, action) => {  
            state.convo = action.payload
        },
        appendMessage:(state, action) => {
            console.log("first message", action.payload)
                if(action.payload.Sender ==="Learner") {
                    const friendId = action.payload.IdTutor 
                    console.log("FRIEND", friendId)
                    const isThisConvo = state.convo.some(item => item.IdTutor === friendId)
                    console.log("FIRSTTHISISCONVO", isThisConvo)
               if(isThisConvo) {
                    state.convo = [...state.convo, action.payload]
           }
            }else {
               const friendId = action.payload.IdLearner
                const isThisConvo = state.convo.some(item => item.IdLearner === friendId)
            if(isThisConvo) {
                state.convo = [...state.convo, action.payload]
           }
           }
           
            state.Notifications = [action.payload , ...state.Notifications] 
        }
    }
})

export const {
    setConvo,
    appendMessage

} = chatSlice.actions
export default chatSlice.reducer