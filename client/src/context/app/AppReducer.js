import { PERSIST_COMM_PROFILES,
        PERSIST_CHOSEN_PROFILE,
        UPDATE_PROFILE,
        CLEAR_FILTER_REC,
        FILTER_REC_LOC,
        FILTER_REC_THEME,
        PERSIST_RECOMMANDATIONS,
        PERSIST_QUESTIONS,
        CLEAR_FILTER_QUE,
        FILTER_QUE_THEME,
        FILTER_QUE_LOC} from "../types";

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
            case PERSIST_QUESTIONS:
            return{
                ...state,
                questions: action.payload
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

                                        case FILTER_QUE_LOC:
                                    return {
                                        ...state,
                                        filteredQuestions: state.questions.filter(rec => {
                                            const regex = new RegExp(`${action.payload}`, 'gi')
                                            return rec.city.match(regex) || rec.location.match(regex)
                                        })
                                    }
                                case FILTER_QUE_THEME:
                                        return {
                                            ...state,
                                            filteredQuestions: state.questions.filter(rec => {
                                                const regex = new RegExp(`${action.payload}`, 'gi')
                                                return rec.theme.match(regex)
                                            })
                                        }
                                case CLEAR_FILTER_QUE:
                                    return {
                                        ...state,
                                        filteredQuestions: null
                                    } 
           
    }



}