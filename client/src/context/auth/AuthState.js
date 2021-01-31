import React, { useReducer } from 'react';
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import authApi from '../../axios/AuthApi'
import generalApi from '../../axios/GeneralApi'
import setAuthToken from '../../utils/setAuthToken'

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    PERSIST_PROFILE,
    REGISTER_FAIL,
    LOGOUT
} from '../types'

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: localStorage.getItem('isAuth'),
        isRegistered: false,
        user: JSON.parse(localStorage.getItem('user')) ,
        profile: JSON.parse(localStorage.getItem('profile')),
        error: null
    }

   const [state, dispatch] = useReducer(AuthReducer, initialState)

   // Action :

   // Login User
   const login = async formData => {

    try {
        const res = await authApi.post('/api/auth/signin', formData)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        setAuthToken(res.data.accessToken)
        loadProfile(res.data.id)

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: 'Invalid Credentials!'
        })
    }
}

 // Resister User
 const signup = async formData => {

    try {
       const res = await authApi.post('/api/auth/signup', formData)

        dispatch({
            type: REGISTER_SUCCESS
        })

    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.message
        })
    }
}

// Load User Profile
const loadProfile = async userId => {

    try {
       const res = await generalApi.get(`/api/profiles/user/${userId}`)
       console.log('profile data : ',res.data)

        dispatch({
            type: PERSIST_PROFILE,
            payload: res.data
        })

    } catch (err) {
        console.log(err)
    }
}

   // Logout
   const logout = () => {
    dispatch({type: LOGOUT})
    }


   return (
       <AuthContext.Provider 
       value={{
           token: state.token,
           isAuthenticated: state.isAuthenticated,
           isRegistered: state.isRegistered,
           user: state.user,
           profile : state.profile,
           error: state.error,
           login,
           signup,
           loadProfile,
           logout
       }}>

           {props.children}
       </AuthContext.Provider>
   )

}
export default AuthState