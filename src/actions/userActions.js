import { GET_USERS, SET_LOADING, USERS_ERROR, ADD_USER , DELETE_USER, SET_CURRENT, CLEAR_CURRENT, UPDATE_USER} from './types';

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
            payload: err.response.statusText
        });
    }
};

// Delete user from server 
export const deleteUser = (id) => async dispatch => {
    try {
        setLoading();

        await fetch(`/users/${id}`, {
            method: 'DELETE'
        });

        dispatch({
            type: DELETE_USER,
            payload: id
        })
    } catch (err) {
        dispatch({
            type: USERS_ERROR,
            payload: err.response.data
        })
    }
};

// update User
export const updateUser = (user) => async dispatch => {
    try {
        setLoading();

        const res = await fetch(`/users/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = res.json()

        dispatch({
            type: UPDATE_USER,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: USERS_ERROR,
            payload: err.response.data
        })
    }
};

// Set current User
export const setCurrent = user => {
    return{
        type: SET_CURRENT,
        payload: user
    }
}

// Clear Current
export const clearCurrent = () => {
    return{
        type: CLEAR_CURRENT
    }
}

//set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}