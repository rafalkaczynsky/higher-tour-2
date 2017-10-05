import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

// Reducers
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

import { NavigationActions } from 'react-navigation'

import { AppNavigator } from '../screens'

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('SignIn');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initialNavState = AppNavigator.router.getStateForAction({firstAction});

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'WelcomeAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'Welcome',
          params: {
            transition: 'WelcomeAnimation'
          } 
        }),
        state
      );
      break;

    case 'UserProfileAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'UserProfile',
          params: {
            transition: 'UserProfileAnimation'
          }  
        }),
        state
      );
      break;

      case 'SettingsInAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'Settings',
          params: {
            transition: 'SettingsInAnimation'
          }  
        }),
        state
      );
      break;

      case 'UserProfileAfterSettingsAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'UserProfile',
          params: {
            transition: 'UserProfileAfterSettingsAnimation'
          }  
        }),
        state
      );
      break; 

      case 'LogoutAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'SignIn',
          params: {
            transition: 'LogoutAnimation'
          }  
        }),
        state
      );
      break; 

      case 'SignInAfterSettingsAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'SignIn',
          params: {
            transition: 'SignInAfterSettingsAnimation'
          }  
        }),
        state
      );
      break; 

      case 'BibleAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'HigherBibleReadings',
          params: {
            transition: 'BibleAnimation'
          }  
        }),
        state
      );
      break; 

      case 'GoToReadLeftToRightAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'Read',
          params: {
            transition: 'GoToReadLeftToRightAnimation'
          }  
        }),
        state
      );
      break;

      case 'GoToThinkLeftToRightAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'Think',
          params: {
            transition: 'GoToThinkLeftToRightAnimation'
          }  
        }),
        state
      );
      break;

      case 'GoToRespondLeftToRightAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'Respond',
          params: {
            transition: 'GoToRespondLeftToRightAnimation'
          }  
        }),
        state
      );
      break;

      case 'GoToThinkRightToLeftAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'Think',
          params: {
            transition: 'GoToThinkRightToLeftAnimation'
          }  
        }),
        state
      );
      break;

      case 'GoToReadRightToLeftAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'Read',
          params: {
            transition: 'GoToReadRightToLeftAnimation'
          }  
        }),
        state
      );
      break;

      case 'GoToHigherRightToLeftAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'HigherBibleReadings',
          params: {
            transition: 'GoToHigherRightToLeftAnimation'
          }  
        }),
        state
      );
      break;

      case 'GoToUserProfileLeftToRightAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'UserProfile',
          params: {
            transition: 'GoToUserProfileLeftToRightAnimation'
          }  
        }),
        state
      );
      break;

      case 'AppUserBibleReadingAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'HigherBibleReadings',
          params: {
            transition: 'AppUserBibleReadingAnimation'
          }  
        }),
        state
      );
      break;

      case 'GoToWeekListRightToLeftAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'WeekList',
          params: {
            transition: 'GoToWeekListRightToLeftAnimation'
          }  
        }),
        state
      );
      break;

      case 'FindSessionAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'FindSession',
          params: {
            transition: 'FindSessionAnimation'
          }  
        }),
        state
      );
      break;

      case 'FindChurchesAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'FindChurch',
          params: {
            transition: 'FindChurchesAnimation'
          }  
        }),
        state
      );
      break;

      case 'SessionItemAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'SessionItem',
          params: {
            transition: 'SessionItemAnimation'
          }  
        }),
        state
      );
      break;

      case 'UserProfileOnStartSessionAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'UserProfile',
          params: {
            transition: 'UserProfileOnStartSessionAnimation'
          }  
        }),
        state
      );
      break;

      case 'GotoWelcomeAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'Welcome',
          params: {
            transition: 'GotoWelcomeAnimation'
          }  
        }),
        state
      );
      break;

      case 'GotoChurchItemAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'ChurchItem',
          params: {
            transition: 'GotoChurchItemAnimation'
          }  
        }),
        state
      );
      break;

      case 'UserProfileOnHomeAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'UserProfile',
          params: {
            transition: 'UserProfileOnHomeAnimation'
          }  
        }),
        state
      );
      break;

      case 'SignInOnHomeAnimation':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ 
          routeName: 'SignIn',
          params: {
            transition: 'SignInOnHomeAnimation'
          }  
        }),
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
    selectedChurch: selectedChurchReducer,
})