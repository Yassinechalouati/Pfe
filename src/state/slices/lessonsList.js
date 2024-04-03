import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    firstlessonList: [],
    allLessons: []
}


export const lessons = createSlice( {
    name: "lessons",
    initialState,
    reducers: {
        setFirstLessonList: (state, action) => {
            state.firstlessonList = action.payload
        },
        setAllLessons: (state, action) => {
            state.allLessons = action.payload
        },
    }
})


export const {
    setFirstLessonList, 
    setAllLessons
} = lessons.actions

export default lessons.reducer