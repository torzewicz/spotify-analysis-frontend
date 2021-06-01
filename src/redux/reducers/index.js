import {combineReducers} from 'redux';


import layoutReducer from './layoutReducer';
import logInReducer from './logInReducer';
import userReducer from "./userReducer";
import registerReducer from "./registerReducer";
import verificationReducer from "./verificationReducer"

export default combineReducers({
    layout: layoutReducer,
    logIn: logInReducer,
    user: userReducer,
    register: registerReducer,
    verification: verificationReducer,
});
