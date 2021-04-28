import {LOG_IN} from './types';

export const logIn = (payload) => (dispatch, getState) => {
    dispatch({
        type: LOG_IN,
        payload: payload
    })
};
