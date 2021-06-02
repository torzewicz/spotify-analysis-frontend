import { FormatColorResetSharp } from '@material-ui/icons';
import {
    ERROR_VERIFICATION,
    NOT_VERIFIED,
    VERIFIED,
    VERIFY
} from '../actions/types/verificationActionsTypes';

const initialState = {
    logged: false,
    loading: false,
    error: null,
    verified: false,
};

const verificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY:
            return {
                ...state,
                loading: true,
                logged: true,
                verified: false,
                error: null
            };
        case NOT_VERIFIED:
            return {
                ...state,
                loading: false,
                logged: true,
                verified: false,
                error: null
            };
        case VERIFIED:
            return {
                ...state,
                loading: false,
                logged: true,
                verified: true,
                error: null
            };
        case ERROR_VERIFICATION:
            return {
                ...state,
                loading: false,
                logged: true,
                verified: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default verificationReducer;