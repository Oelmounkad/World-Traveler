import React, { useReducer } from 'react';
import AppContext from './AppContext'
import AppReducer from './AppReducer'

import generalApi from '../../axios/GeneralApi'
import {PERSIST_COMM_PROFILES} from '../types'

const AppState = props => {

    const initialState = {
        communityProfiles: []
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


   return (
       <AppContext.Provider 
       value={{
        communityProfiles: state.communityProfiles,
        getProfiles
       }}>

           {props.children}
       </AppContext.Provider>
   )

}
export default AppState