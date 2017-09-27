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
import bibleReadingReducer from './bibleReadingReducer';
import currentBibleReadingReducer from './currentBibleReadingReducer'
import aaaSessionReducer from './aaaSessionReducer'

export const reducers = combineReducers({
    form: formReducer,     
    user: userReducer,
    events: eventsReducer,
    bibleReading: bibleReadingReducer,
    churches: churchesReducer,
    coords: coordsReducer,
    app: appReducer,
    eventSelected: selectedEventReducer,
    sessions: sessionsReducer,
    currentBibleReading: currentBibleReadingReducer,
    aaaSession: aaaSessionReducer,
})