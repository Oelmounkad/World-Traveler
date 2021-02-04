import React, { useReducer , useContext} from 'react';
import AppContext from './AppContext'
import AppReducer from './AppReducer'

import generalApi from '../../axios/GeneralApi'
import {PERSIST_COMM_PROFILES,
        PERSIST_CHOSEN_PROFILE,
        UPDATE_PROFILE,
        CLEAR_FILTER_REC,
        FILTER_REC_LOC,
        FILTER_REC_THEME,
        PERSIST_RECOMMANDATIONS} from '../types'
import setAuthToken from '../../utils/setAuthToken'

const AppState = props => {

    const initialState = {
        communityProfiles: [],
        chosenProfile: null,
        recommandations: [],
        filteredRecommandations:null,
        questions: [],
        filteredQuestions: null
    }

    

   const [state, dispatch] = useReducer(AppReducer, initialState)

   // Action :

   const getProfiles = async () => {

       try{
        const res = await generalApi.get('/api/profiles')

        dispatch({
            type: PERSIST_COMM_PROFILES,
            payload: res.data
        })

       } catch(err){
           console.log(err.message)
       }

   }

   // get Chosen Profile

   const getChosenProfile = async id => {

    try{
     const res = await generalApi.get(`/api/profiles/user/${id}`)

     dispatch({
         type: PERSIST_CHOSEN_PROFILE,
         payload: res.data
     })

    } catch(err){
        console.log(err.message)
    }

}


const updateProfile = async data => {
    
    setAuthToken(localStorage.token)
    console.log('Hey update here')
    try{
     
      const res = await generalApi.patch(`/api/profiles/${data._id}`,data)
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
    })

    } catch(err){
        console.log(err.message)
    }

}
const addPhotoToPortfolio = async (data,id) => {
    
    setAuthToken(localStorage.token)
    //console.log('Hey update here')
    try{
     
        const res = await generalApi.patch(`/api/profiles/portfolio/${id}`,data)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
    } catch(err){
        console.log(err.message)
    }

}

const editProfilePhoto = async (data,id) => {
    
    setAuthToken(localStorage.token)
    //console.log('Hey update here')
    try{
     
        const res = await generalApi.patch(`/api/profiles/${id}`,data)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
    } catch(err){
        console.log(err.message)
    }

}

    //get all recommandations

    const getAllRecommandations = async () => {
        try{
     
            const res = await generalApi.get(`/api/recommandations`)
            dispatch({
                type: PERSIST_RECOMMANDATIONS,
                payload: res.data
            })
        } catch(err){
            console.log(err.message)
        }
    }

   // Filter Recommandations by Location

   const filterRecByLocation = text => {
    dispatch({type: FILTER_REC_LOC , payload: text })
}

   // Filter Recommandations by Theme

const filterRecByTheme = text => {
    dispatch({type: FILTER_REC_THEME , payload: text })
}

   // Clear Filter Recommandation
   const clearFilterRec = () => {
    dispatch({type: CLEAR_FILTER_REC })
}

   return (
       <AppContext.Provider 
       value={{
        communityProfiles: state.communityProfiles,
        chosenProfile: state.chosenProfile,
        recommandations: state.recommandations,
        filteredRecommandations: state.filteredRecommandations,
        questions: state.questions,
        filteredQuestions: state.filteredQuestions,
        getProfiles,
        getChosenProfile,
        updateProfile,
        addPhotoToPortfolio,
        editProfilePhoto,
        getAllRecommandations,
        filterRecByTheme,
        filterRecByLocation,
        clearFilterRec
       }}>

           {props.children}
       </AppContext.Provider>
   )

}
export default AppState