import { combineReducers } from "redux";
import 'bootstrap/dist/css/bootstrap.min.css'
import userReducer from './userReducer'

export default combineReducers({
    user: userReducer
});