import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    notificationsList: []
}


export const notificationSlice = createSlice({
    name: 'notification_data',
    initialState,
    reducers : {
        setNotificationsList: (state, action ) => {
            state.notificationsList = action.payload
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
        
                // If you need to sort the list, do it here
                state.notificationsList.sort((a, b) => a.start_time < b.start_time ? -1 : 1);
            }
        },
        removeNotification: (state, action) => {
            const lessonIdToRemove = action.payload

            state.notificationsList = state.notificationsList.filter(notification => notification.lesson_id !== lessonIdToRemove);
        },        
        resetFields: () => initialState
    }
})

export const {
    resetFields,
    setNotificationsList,
    updateNotification,
    removeNotification

} = notificationSlice.actions
export default notificationSlice.reducer