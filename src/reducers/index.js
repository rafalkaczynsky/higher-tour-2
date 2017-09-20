import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

// Reducers
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';
import churchesReducer from './churchesReducer';
import coordsReducer from './coordsReducer';
import appReducer from './appReducer';
import selectedEventReducer from './selectedEventReducer';
import sessionsReducer from './sessionsReducer';

export const reducers = combineReducers({
    form: formReducer,     
    user: userReducer,
    events: eventsReducer,
    churches: churchesReducer,
    coords: coordsReducer,
    app: appReducer,
    eventSelected: selectedEventReducer,
    sessions: sessionsReducer,
})