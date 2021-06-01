import {
    ERROR_VERIFICATION,
    NOT_VERIFIED,
    VERIFIED
} from '../actions/types/verificationActionsTypes';

const initialState = {
    logged: false,
    error: null,
    verified: false,
};

const verificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOT_VERIFIED:
            return {
                ...state,
                logged: true,
                verified: false,
                error: null
            };
        case VERIFIED:
            return {
                ...state,
                logged: true,
                verified: true,
                error: null
            };
        case ERROR_VERIFICATION:
            return {
                ...state,
                logged: true,
                verified: false,
                error: true
            };
        default:
            return state;
    }
};

export default verificationReducer;