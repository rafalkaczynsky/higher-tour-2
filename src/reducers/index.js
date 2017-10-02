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
import bibleReadingNamesReducer from './bibleReadingNamesReducer'
import appUserBibleReadingReducer from './appUserBibleReadingReducer'
import appUserBibleReadingNamesReducer from './appUserBibleReadingNamesReducer'

import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../screens';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('SignIn');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SignIn' }),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Welcome' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

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
})