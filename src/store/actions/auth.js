import * as actionTypes from './actionType';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    return{
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeOut = (expirationTime) =>{
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let urlMethod = '';
        const urlSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRxT3zIb0G9c5olFh5ObhT7Il0keFSvNc';
        const urlSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRxT3zIb0G9c5olFh5ObhT7Il0keFSvNc';
        if(isSignUp){
            urlMethod = urlSignUp;
        }else{
            urlMethod = urlSignIn;
        }

        axios.post(urlMethod, authData)
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.local));
            dispatch(checkAuthTimeOut(response.data.expiresIn));
        })
        .catch(err =>{
            dispatch(authFailed(err.response.data.error));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}