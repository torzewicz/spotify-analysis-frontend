import {LOG_IN, CONNECTED_TO_SPOTIFY} from './types';

export const logIn = (payload) => (dispatch, getState) => {
    dispatch({
        type: LOG_IN,
        payload: payload
    })
};

export const connectedToSpotify = (payload) => (dispatch, getState) => {
    dispatch({
        type: CONNECTED_TO_SPOTIFY,
        payload: payload
    })
};