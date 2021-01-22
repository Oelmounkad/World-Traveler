import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../types'


export default (state,action) => {
    switch(action.type){

        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.accessToken)
            localStorage.setItem('isAuth','true')
            localStorage.setItem('user',JSON.stringify(action.payload) )
            return {
                ...state,
                user: action.payload,
                token: action.payload.accessToken,
                isAuthenticated: true,
                error: null
            }
            case LOGIN_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('isAuth')
            localStorage.removeItem('user')
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
            
        default:
            return state
    }
}