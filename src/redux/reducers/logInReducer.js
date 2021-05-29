import {
    LOG_IN,
    LOG_OUT,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE
} from '../actions/types/loginActions';

const getAuthStateFromLocalStorage = () => {
    const token = localStorage.getItem('accessToken');
    const exp = localStorage.getItem('exp');
    if (token) {
        return {
            accessToken: token,
            exp: exp,
            isAuthenticated: true
        };
    }
};

const initialState = {
    loading: false,
    accessToken: undefined,
    exp: undefined,
    isAuthenticated: false,
    error: null,
    ...getAuthStateFromLocalStorage()
};

const logInReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                loading: true,
                accessToken: undefined,
                exp: undefined,
                isAuthenticated: false,
                error: null
            };
        case LOG_IN_SUCCESS:
            localStorage.setItem('accessToken', action.payload.token);
            localStorage.setItem('exp', action.payload.exp);
            return {
                ...state,
                loading: false,
                accessToken: action.payload.token,
                exp: action.payload.exp,
                isAuthenticated: true
            };
        case LOG_IN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false
            };
        case LOG_OUT:
            localStorage.removeItem('accessToken');
            localStorage.removeItem('exp');
            return {
                ...state,
                loading: false,
                accessToken: undefined,
                isAuthenticated: false,
                exp: undefined,
                error: null,
            };
        default:
            return state;
    }
};

export default logInReducer;