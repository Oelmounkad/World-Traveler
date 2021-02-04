import { PERSIST_COMM_PROFILES,
        PERSIST_CHOSEN_PROFILE,
        UPDATE_PROFILE,
        CLEAR_FILTER_REC,
        FILTER_REC_LOC,
        FILTER_REC_THEME,
        PERSIST_RECOMMANDATIONS } from "../types";

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
            case PERSIST_RECOMMANDATIONS:
            return{
                ...state,
                recommandations: action.payload
            }
            case FILTER_REC_LOC:
                return {
                    ...state,
                    filteredRecommandations: state.recommandations.filter(rec => {
                        const regex = new RegExp(`${action.payload}`, 'gi')
                        return rec.city.match(regex) || rec.location.match(regex)
                    })
                }
            case FILTER_REC_THEME:
                    return {
                        ...state,
                        filteredRecommandations: state.recommandations.filter(rec => {
                            const regex = new RegExp(`${action.payload}`, 'gi')
                            return rec.theme.match(regex)
                        })
                    }
            case CLEAR_FILTER_REC:
                return {
                    ...state,
                    filteredRecommandations: null
                } 
    }



}