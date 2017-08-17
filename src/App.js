import React from 'react'
import * as FirebaseInit from './actions/firebase-init';
import {
  StackNavigator,
} from 'react-navigation';


import {_SignIn, _Welcome, _Settings, _FindSession, _SessionItem, _UserProfile} from './containers'

export default App = StackNavigator(
  {
    Welcome: { screen: _Welcome },
    SignIn: { screen: _SignIn },
    Settings : { screen: _Settings},
    FindSession: {screen: _FindSession},
    SessionItem: {screen: _SessionItem},
    UserProfile: {screen: _UserProfile},
//   .........................
  },
  { 
      headerMode: 'none', 
      initialRouteName: 'SignIn'
  }
);
