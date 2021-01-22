import React, { useReducer } from 'react';
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import authApi from '../../axios/AuthApi'
import setAuthToken from '../../utils/setAuthToken'

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: localStorage.getItem('isAuth'),
        user: JSON.parse(localStorage.getItem('user')) ,
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

    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: 'Invalid Credentials!'
        })
    }
}


   return (
       <AuthContext.Provider 
       value={{
           token: state.token,
           isAuthenticated: state.isAuthenticated,
           user: state.user,
           error: state.error,
           login
       }}>

           {props.children}
       </AuthContext.Provider>
   )

}
export default AuthState