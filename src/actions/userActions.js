import { GET_USERS, SET_LOADING, USERS_ERROR, ADD_USER } from './types';

// Get all users
export const getUsers = () => async dispatch => {
    try {
        setLoading();

        const res = await fetch('/users');
        const data = await res.json();

        dispatch({
            type: GET_USERS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USERS_ERROR,
            payload: err.response.data
        })
    }
};

// Add new user
export const addUser = (user) => async dispatch => {
    try {
        setLoading();

        const res = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();

        dispatch({
            type: ADD_USER,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USERS_ERROR,
            payload: err.response.data
        })
    }
};

//set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}