import {combineReducers} from 'redux';


import layoutReducer from './layoutReducer';
import logInReducer from './logInReducer';

export default combineReducers({
    layout: layoutReducer,
    logIn: logInReducer
});
