import { createSlice } from '@reduxjs/toolkit'

const initialState ={
    listOfLanguages: [
        {id:0, language: 'English'}
    ],
    listOfLanguagesVisibility: false,
    listOfWorkExperience: [
        {id: 0, title:'', tag:'', description:''}
    ],
    listOfWorkExperienceVisibility: false,


}


export const listSlice = createSlice({
    name: 'list_data',
    initialState,
    reducers: {
        setListOfLanguages: (state, action) => {
            const { id, language } = action.payload;
            const existingLanguageIndex = state.listOfLanguages.findIndex(item => item.id === id);
            
            if (existingLanguageIndex !== -1) {
                // If the language with the given id exists, update its value
                state.listOfLanguages[existingLanguageIndex].language = language;
            } else {
                // If the language with the given id doesn't exist, add it to the list
                state.listOfLanguages.push(action.payload);
            }
        },
        deleteLanguageItem: (state, action) => {
            const {id} = action.payload
            // Filter out the language with the specified id
            state.listOfLanguages = state.listOfLanguages.filter(item => item.id !== id);

        },
        resetLanguageList: (state, action) => {
            state.listOfLanguages = [
                {id:0, language: 'English'}
            ]
        },
        setListOfLanguagesVisibility: (state, action) => {
            state.listOfLanguagesVisibility = action.payload
        },
        setListOfWorkExperienceVisibility: (state, action) => {
            state.listOfWorkExperienceVisibility = action.payload
        },
        setWorkExperienceTitle: (state, action) => {
            const { id, title } = action.payload;
            const existingWorkIndex = state.listOfWorkExperience.findIndex(item => item.id === id);
            
            if (existingWorkIndex !== -1) {
                // If the work with the given id exists, update its value
                state.listOfWorkExperience[existingWorkIndex].title = title
            } else {
                // If the work with the given id doesn't exist, add it to the list
                state.listOfWorkExperience.push(action.payload);
            }
        },
        setWorkExperienceTag: (state, action) => {
            const { id, tag } = action.payload;
            const existingWorkIndex = state.listOfWorkExperience.findIndex(item => item.id === id);
            
            if (existingWorkIndex !== -1) {
                // If the work with the given id exists, update its value
                state.listOfWorkExperience[existingWorkIndex].tag = tag
            } else {
                // If the work with the given id doesn't exist, add it to the list
                state.listOfWorkExperience.push(action.payload);
            }
        },
        setWorkExperienceDescription: (state, action) => {
            const { id, description } = action.payload;
            const existingWorkIndex = state.listOfWorkExperience.findIndex(item => item.id === id);
            
            if (existingWorkIndex !== -1) {
                // If the work with the given id exists, update its value
                state.listOfWorkExperience[existingWorkIndex].description = description
            } else {
                // If the work with the given id doesn't exist, add it to the list
                state.listOfWorkExperience.push(action.payload);
            }
        },
        addWorkExperience: (state, action) => {
            state.listOfWorkExperience.push(action.payload)
        }
    }
})


export const { setListOfLanguages, deleteLanguageItem, resetLanguageList, setListOfLanguagesVisibility, setListOfWorkExperienceVisibility, setWorkExperienceDescription, setWorkExperienceTitle, setWorkExperienceTag, addWorkExperience} = listSlice.actions
export default listSlice.reducer