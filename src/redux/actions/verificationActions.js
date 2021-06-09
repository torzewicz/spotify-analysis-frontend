import axios from 'axios';

import {
    LOG_OUT
} from "./types/loginActions";

import {
    ERROR_VERIFICATION, VERIFIED, VERIFY, CANCEL_VERIFICATION
} from "./types/verificationActionsTypes";

const {
    REACT_APP_BACKEND_URL,
} = process.env;

export const verifyAction = (verifyRequest) => (dispatch, getState) => {
    dispatch({type: VERIFY})
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
    }).catch(e => {
        dispatch({
            type: ERROR_VERIFICATION,
            payload: new Error(e.response.data.message || "Error")
        })    
    })
};

export const relog = () => (dispatch, getState) => {
        dispatch({
            type: LOG_OUT,
        })
};

export const cancelVerification = () => (dispatch, getState) => {
    dispatch({
        type: CANCEL_VERIFICATION,
    })
    dispatch({
        type: LOG_OUT,
    })
};
