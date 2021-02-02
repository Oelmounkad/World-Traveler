import React, { useReducer , useContext} from 'react';
import AppContext from './AppContext'
import AppReducer from './AppReducer'

import generalApi from '../../axios/GeneralApi'
import {PERSIST_COMM_PROFILES,
        PERSIST_CHOSEN_PROFILE,
        UPDATE_PROFILE} from '../types'
import setAuthToken from '../../utils/setAuthToken'

const AppState = props => {

    const initialState = {
        communityProfiles: [],
        chosenProfile: null
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



   return (
       <AppContext.Provider 
       value={{
        communityProfiles: state.communityProfiles,
        chosenProfile: state.chosenProfile,
        getProfiles,
        getChosenProfile,
        updateProfile,
        addPhotoToPortfolio,
        editProfilePhoto
       }}>

           {props.children}
       </AppContext.Provider>
   )

}
export default AppState