import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

// Reducers
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';
import churchesReducer from './churchesReducer';
import coordsReducer from './coordsReducer';


export const reducers = combineReducers({
    form: formReducer,     
    user: userReducer,
    events: eventsReducer,
    churches: churchesReducer,
    coords: coordsReducer,
})