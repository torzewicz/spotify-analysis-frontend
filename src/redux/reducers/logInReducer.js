import {LOG_IN, CONNECTED_TO_SPOTIFY} from '../actions/types';

const initialState = {
    logged: false,
    accessToken: undefined,
    connectedToSpotify: false
};

const logInReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                logged: true,
                accessToken: action.payload.token
            };
        case CONNECTED_TO_SPOTIFY: {
            return {
                ...state,
                connectedToSpotify: action.payload.connectedToSpotify
            }
        }
        default:
            return state;
    }
};

export default logInReducer;