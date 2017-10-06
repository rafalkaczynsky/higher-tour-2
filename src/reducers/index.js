import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

// Reducers
import formReducer2 from './formReducer'
import userReducer from './userReducer'
import eventsReducer from './eventsReducer'
import churchesReducer from './churchesReducer'
import coordsReducer from './coordsReducer'
import appReducer from './appReducer'
import selectedEventReducer from './selectedEventReducer'
import selectedChurchReducer from './selectedChurchReducer'
import sessionsReducer from './sessionsReducer'
import bibleReadingReducer from './bibleReadingReducer'
import currentBibleReadingReducer from './currentBibleReadingReducer'
import aaaSessionReducer from './aaaSessionReducer'
import bibleReadingNamesReducer from './bibleReadingNamesReducer'
import appUserBibleReadingReducer from './appUserBibleReadingReducer'
import appUserBibleReadingNamesReducer from './appUserBibleReadingNamesReducer'
import nav from './navReducer'

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const formCombinedReducer = combineReducers({
  formReducer,
  formReducer2

})


export const reducers = combineReducers({
    nav,
    auth,
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
    bibleReadingNames: bibleReadingNamesReducer,
    appUserBibleReading: appUserBibleReadingReducer,
    appUserBibleReadingNames: appUserBibleReadingNamesReducer,
    selectedChurch: selectedChurchReducer,
})