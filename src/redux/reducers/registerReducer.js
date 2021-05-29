import {SIGN_UP, SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from "../actions/types/registerActions";

const initialState = {
    loading: false,
    user: undefined,
    error: null
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            };
        case SIGN_UP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default registerReducer;