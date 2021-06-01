import axios from 'axios';

import {
    LOG_OUT
} from "./types/loginActions";

import {
    ERROR_VERIFICATION, VERIFIED
} from "./types/verificationActionsTypes";

const {
    REACT_APP_BACKEND_URL,
} = process.env;

export const verifyAction = (verifyRequest) => (dispatch, getState) => {
    const {
        email,
        code
    } = verifyRequest;

    axios.post(`${REACT_APP_BACKEND_URL}/auth/verify`, {
        email: email,
        code: code
    }).then(({data}) => {
        dispatch({
            type: VERIFIED,
            payload: data
        })
    }).catch(error => {
        dispatch({
            type: ERROR_VERIFICATION,
        })    
    })
};

export const relog = () => (dispatch, getState) => {
        dispatch({
            type: LOG_OUT,
        })
};
