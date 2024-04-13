import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import errorReducer from './slices/errorSlice'
import tutorReducer from './slices/tutorSlice'
import loginReducer from './slices/loginSlice'
import listReducer from './slices/listSlice'
import scheduleReducer from './slices/Schedule'
import showMoreReducer from './slices/ShowMore'
import lessonsListReducer from './slices/lessonsList'
import notificationsReducer from './slices/NotificationSlice'

//store that contains a global state
export const store = configureStore({
  reducer: {
    userData: userReducer, //contains signup user Data
    Error: errorReducer, // contains Errors to show
    tutorData: tutorReducer, //contains tutor signup Data
    loginData: loginReducer, //contains user login Data
    listData: listReducer, //contains the lists of the tutor personalization part
    scheduleData: scheduleReducer, //contains the information about scheduling a lesson
    showMoreData:  showMoreReducer, //contains the data concering the show more modal
    lessonsList: lessonsListReducer, //contains the lessons
    notificationsData: notificationsReducer, //contains the notifications
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['tutor_data/setIntroductionVideo'],
      },
    }),
})