import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    PERSIST_PROFILE,
    REGISTER_FAIL,
    LOGOUT
} from '../types'


export default (state,action) => {
    switch(action.type){

        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.accessToken)
            localStorage.setItem('isAuth',"true")
            localStorage.setItem('user',JSON.stringify(action.payload) )
            return {
                ...state,
                user: action.payload,
                token: action.payload.accessToken,
                isAuthenticated: "true",
                error: null
            }
            case LOGIN_FAIL:
            case REGISTER_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('isAuth')
            localStorage.removeItem('user')
            return {
                ...state,
                token:null,
                isAuthenticated: 'false',
                user: null,
                error: action.payload
            }
                case REGISTER_SUCCESS:
                return {
                    ...state,
                    isRegistered: true
                }
                case LOGOUT:
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    localStorage.setItem('isAuth','false')
                    localStorage.removeItem('profile')
                    return {
                        ...state,
                        token:null,
                        isAuthenticated: "false",
                        user: null,
                        profile: null,
                        error: action.payload
                    }
            case PERSIST_PROFILE:
                localStorage.setItem('profile',JSON.stringify(action.payload) )
            return {
                ...state,
               profile: action.payload
            }
            
        default:
            return state
    }
}