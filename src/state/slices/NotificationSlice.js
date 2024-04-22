import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    notificationsList: [],
    pendingNotificationNumber: 0,
    pageNumber: 1, //indicator for pagination
    maxPageNumber: 0, //number of pages indicator
    

}


export const notificationSlice = createSlice({
    name: 'notification_data',
    initialState,
    reducers : {
        setNotificationsList: (state, action ) => {
            state.notificationsList = action.payload
        },
        appendNotifications: (state, action ) => {
            state.notificationsList = [...state.notificationsList, ...action.payload]
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload
        },
        setMaxPageNumber: (state, action) => {
            state.maxPageNumber = action.payload
        },
        updateNotification: (state, action) => {
            const { notification, accepted } = action.payload
        
            // Find the index of the notification to update
            const index = state.notificationsList.findIndex(item => item.lesson_id === notification.lesson_id);

        
            // If the notification is found, update it
            if (index !== -1) {
                const updatedNotification = {
                    ...notification,
                    Accepted: accepted
                };
        
                // Use map to update the specific notification, maintaining immutability
                state.notificationsList = state.notificationsList.map((item, i) =>
                    i === index ? updatedNotification : item
                );
        
                
            }
        },
        addNotification: (state, action )=> {

            state.notificationsList = [...state.notificationsList, action.payload]
            
            // If you need to sort the list, do it here
            state.notificationsList.sort((a, b) => a.start_time < b.start_time ? -1 : 1);
        },
        removeNotification: (state, action) => {
            const lessonIdToRemove = action.payload

            state.notificationsList = state.notificationsList.filter(notification => notification.lesson_id !== lessonIdToRemove);
        },   
        setPendingNotificationNumber: (state, action )=> {
            state.pendingNotificationNumber = action.payload
        },
        incrementNumberOfNotificaitions: (state, action) => {
            state.pendingNotificationNumber = state.pendingNotificationNumber+1
        },
        resetFields: () => initialState
    }
})

export const {
    resetFields,
    setNotificationsList,
    updateNotification,
    removeNotification,
    setPendingNotificationNumber,
    addNotification,
    incrementNumberOfNotificaitions,
    setPageNumber, 
    setMaxPageNumber,
    appendNotifications
} = notificationSlice.actions
export default notificationSlice.reducer