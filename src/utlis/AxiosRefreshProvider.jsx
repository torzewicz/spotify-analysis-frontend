import React from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from "../redux/actions/logInActions";
import {useHistory} from 'react-router-dom';

const RefreshProvider = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {isAuthenticated, exp} = useSelector(state => state.logIn);


    axios.interceptors.request.use(async request => {
        const expTemp = localStorage.getItem('exp') || exp;
        if (isAuthenticated && expTemp < new Date().getTime()) {
            dispatch(logOut());
            history.push('/login');
        }
        return request;
    });


    return null;
};

export default RefreshProvider;
