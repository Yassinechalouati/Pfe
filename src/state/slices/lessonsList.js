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
        appendLesson: (state, action) => {
            state.firstlessonList = [...state.firstlessonList, action.payload]
        },
        Addlesson: (state, action) => {
            state.allLessons = [...state.allLessons, action.payload]
        },
        replaceFirstLessonItem: (state, action) => {
            const { data, index } = action.payload;
            console.log("data: ", action, "index: ", index);
            // Clone the current state array to avoid mutation
            const lessonsCopy = [...state.firstlessonList]
            lessonsCopy[index] = data

            state.firstlessonList = lessonsCopy
        },
        resetAllLessons: (state, action) => {
            state.allLessons = []
        }
    }
})


export const {
    setFirstLessonList, 
    setAllLessons,
    appendLesson,
    Addlesson,
    resetAllLessons,
    replaceFirstLessonItem
} = lessons.actions

export default lessons.reducer