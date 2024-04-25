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
        updateFirstLessonList: (state, action) => {
            const {lessonId, accepted} = action.payload
            if(state.firstlessonList) {
                const lessonIndex = state.firstlessonList.findIndex(item => item.lesson_id === lessonId)
                if (lessonIndex !==-1) {
                    state.firstlessonList = state.firstlessonList.map((item, index) => 
                        index === lessonIndex? {...item, Accepted: accepted} : item
                    )
                }   
            }
        },
        deleteRejectedLesson: (state, action) => {
            if(state.firstlessonList) {
                state.firstlessonList = state.firstlessonList.filter(item => item.lesson_id !== action.payload)
            }
            if(state.allLessons) {
                state.allLessons = state.allLessons.filter(item => item.lesson_id !== action.payload)
            }
        },
        updateAllLessonsList: (state, action) => {
            const {lessonId, accepted} = action.payload
            if (state.allLessons) {
                const lessonIndex = state.allLessons.findIndex(item => item.lesson_id === lessonId)
                if (lessonIndex !==-1) {
                    state.allLessons = state.allLessons.map((item, index) => 
                        index === lessonIndex ? {...item, Accepted: accepted} : item
                    )
                }
            }
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
    replaceFirstLessonItem,
    updateAllLessonsList,
    updateFirstLessonList,
    deleteRejectedLesson
} = lessons.actions

export default lessons.reducer