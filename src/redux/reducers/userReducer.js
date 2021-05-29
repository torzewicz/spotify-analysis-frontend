import {
    CONNECT_SPOTIFY, CONNECT_SPOTIFY_FAILURE,
    CONNECT_SPOTIFY_SUCCESS,
    FETCH_USER,
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS
} from "../actions/types/userActionTypes";

const initialState = {
    loading: false,
    user: undefined,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
        case CONNECT_SPOTIFY:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_USER_SUCCESS:
        case CONNECT_SPOTIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            };
        case FETCH_USER_FAILURE:
        case CONNECT_SPOTIFY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;