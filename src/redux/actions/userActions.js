import axios from 'axios';

import {
    CONNECT_SPOTIFY,
    CONNECT_SPOTIFY_SUCCESS,
    CONNECT_SPOTIFY_FAILURE,
    FETCH_USER,
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS
} from "./types/userActionTypes";

const {
    REACT_APP_BACKEND_URL: baseUrl,
} = process.env;


export const fetchUserAction = () => (dispatch, getState) => {

    const {accessToken} = getState().logIn;

    dispatch({type: FETCH_USER});
    axios.get(`${baseUrl}/user`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(({data}) => {
            dispatch({
                type: FETCH_USER_SUCCESS,
                payload: data
            })
        })
        .catch(e => {
            dispatch({
                type: FETCH_USER_FAILURE,
                payload: e
            })
        })

};

export const connectSpotifyAction = (code, redirectUri) => (dispatch, getState) => {

    const {accessToken} = getState().logIn;
    dispatch({type: CONNECT_SPOTIFY});
    axios.get(`${baseUrl}/auth/connect`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                code,
                redirectUri
            }
        })
        .then(({data}) => {
            dispatch({
                type: CONNECT_SPOTIFY_SUCCESS,
                payload: data
            })
        })
        .catch(e => {
            dispatch({
                type: CONNECT_SPOTIFY_FAILURE,
                payload: e
            })
        })

};