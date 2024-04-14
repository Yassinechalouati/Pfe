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
            const { notification, accepted } = action.payload;
            console.log("notification: ", notification);
            console.log("accepted: ", accepted);
        
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
        }        
        ,
        resetFields: () => initialState
    }
})

export const {
    resetFields,
    setNotificationsList,
    updateNotification

} = notificationSlice.actions
export default notificationSlice.reducer