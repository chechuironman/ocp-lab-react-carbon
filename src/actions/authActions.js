import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';
const login_service = require('../config/keys').login_service;

const register_user_service = require('../config/keys').register_user_service;
// Register User
export const registerUser = (userData, history) => dispatch => {
  console.log('API');

  console.log(register_user_service);
  axios
    .post(register_user_service, userData)
    .then(res => {
      if (res.data.error === undefined) {
        history.push('/login');
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { error: res.data.error },
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: { error: err },
      });
    });
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post(login_service, userData)
    .then(res => {
      if (res.data.error === undefined) {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: { error: res.data.error },
        });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: { error: err },
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
