import { GET_USERS, SET_LOADING, USERS_ERROR, ADD_USER } from '../actions/types';


const initialState = {
    users: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS:
            return{
                ...state,
                users: action.payload,
                loading: false
            }
        case ADD_USER:
            return{
                ...state,
                users: [...state, action.payload],
                loading: false
            }
        case SET_LOADING:
            return{
                ...state,
                loading: true
            };
        case USERS_ERROR:
            console.error(action.payload)
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}