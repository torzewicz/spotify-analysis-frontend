import {LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT} from './types/loginActions';
import axios from "axios";

const {
    REACT_APP_BACKEND_URL,
} = process.env;

export const logIn = (loginRequest) => (dispatch, getState) => {
    dispatch({type: LOG_IN})
    const {
        username,
        password
    } = loginRequest;


    axios.post(`${REACT_APP_BACKEND_URL}/auth/login`, {
        username: username,
        password: password
    }).then(({data}) => {
        dispatch({
            type: LOG_IN_SUCCESS,
            payload: data
        });
    }).catch(e => {
        dispatch({
            type: LOG_IN_FAILURE,
            payload: e
        })
    })


};

export const logOut = () => (dispatch, getState) => {
    dispatch({type: LOG_OUT});
};

// export const connectedToSpotify = (payload) => (dispatch, getState) => {
//     dispatch({
//         type: CONNECTED_TO_SPOTIFY,
//         payload: payload
//     })
// };
//
// export const injectAccessToken = (payload) => (dispatch, getState) => {
//     dispatch({
//         type: INJECT_ACCESS_TOKEN,
//         payload: payload
//     })
// };