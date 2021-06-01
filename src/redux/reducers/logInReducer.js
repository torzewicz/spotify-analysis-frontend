import {LOG_IN, CONNECTED_TO_SPOTIFY, VERIFIED} from '../actions/types';

const initialState = {
    logged: false,
    accessToken: undefined,
    connectedToSpotify: false,
    verified: false
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
        case VERIFIED: {

            return {
                ...state,
                verified: true,
            }
        }
        default:
            return state;
    }
};

export default logInReducer;