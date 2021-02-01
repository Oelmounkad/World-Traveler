import { PERSIST_COMM_PROFILES,
        PERSIST_CHOSEN_PROFILE,
        UPDATE_PROFILE } from "../types";

export default (state,action) => {
    switch(action.type){

        case PERSIST_COMM_PROFILES:
            return{
                ...state,
                communityProfiles: action.payload
            }
            case PERSIST_CHOSEN_PROFILE:
                return{
                    ...state,
                    chosenProfile: action.payload
                }
                case UPDATE_PROFILE:
            return{
                ...state,
                chosenProfile: action.payload
            }
    }



}