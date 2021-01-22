import GeneralApi from '../axios/GeneralApi'

const setAuthToken = token => {
    if(token){
        GeneralApi.defaults.headers.common['x-auth-token'] = token
    }else{
        delete GeneralApi.defaults.common['x-auth-token']
    }
}

export default setAuthToken