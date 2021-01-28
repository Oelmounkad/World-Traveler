import { PERSIST_COMM_PROFILES } from "../types";

export default (state,action) => {
    switch(action.type){

        case PERSIST_COMM_PROFILES:
            return{
                ...state,
                communityProfiles: action.payload
            }

    }



}