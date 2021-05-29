import axios from 'axios';

import {
    SIGN_UP,
    SIGN_UP_FAILURE,
    SIGN_UP_SUCCESS
} from "./types/registerActions";

const {
    REACT_APP_BACKEND_URL: baseUrl,
} = process.env;


export const createUserAction = (request) => (dispatch, getState) => {
    dispatch({type: SIGN_UP});
    axios.post(`${baseUrl}/auth/signup`,
        request)
        .then(({data}) => {
            dispatch({
                type: SIGN_UP_SUCCESS,
                payload: data
            })
        })
        .catch(e => {
            dispatch({
                type: SIGN_UP_FAILURE,
                payload: e
            })
        })

};
