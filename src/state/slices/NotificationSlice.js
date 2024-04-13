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
        resetFields: () => initialState
    }
})

export const {
    resetFields,
    setNotificationsList

} = notificationSlice.actions
export default notificationSlice.reducer