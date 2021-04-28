import {LOG_IN} from '../actions/types';

const initialState = {
    logged: false,
    accessToken: undefined,
};

const logInReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                logged: true,
                accessToken: action.payload.access_token
            };
        default:
            return state;
    }
};

export default logInReducer;