import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    time: '',
    selectedTutor: '',
    lessonTopic:'',
    lessonDifficulty: '',
    step: 0

}


export const listSlice = createSlice({
    name: 'Schedule_data',
    initialState,
    reducers: {
        setTime: (state, action) => {
            state.time = action.payload
        },
        setSelectedTutor: (state, action) => {
            state.selectedTutor = action.payload
        },
        setLessonTopic: (state, action) => {
            state.lessonTopic = action.payload
        },
        setLessonDifficulty: (state, action) => {
            state.lessonDifficulty = action.payload
        },
        setSteps: (state, action) => {
            state.step = action.payload
        },
        resetData: () => initialState

    }
})


export const { 
    setTime,
    setSelectedTutor, 
    setLessonDifficulty, 
    setLessonTopic,
    resetData,
    setSteps
} = listSlice.actions
export default listSlice.reducer