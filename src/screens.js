import React from 'react'
import * as FirebaseInit from './actions/firebase-init';
import {
  StackNavigator,
} from 'react-navigation';


import {_SignIn, _Welcome, _Settings, _FindSession, _FindChurch, _SessionItem, _UserProfile, _HigherBibleReadings, _Read, _Think, _Respond, _WeekList} from './containers'

export default Screens = StackNavigator(
  {
    Welcome: {screen: _Welcome },
    SignIn: {screen: _SignIn },
    Settings : {screen: _Settings},
    FindSession: {screen: _FindSession},
    FindChurch: {screen: _FindChurch},
    SessionItem: {screen: _SessionItem},
    UserProfile: {screen: _UserProfile},
    HigherBibleReadings: {screen: _HigherBibleReadings},
    WeekList: {screen: _WeekList},
    Read: {screen: _Read},
    Think: {screen: _Think},
    Respond: {screen: _Respond}
//   .........................
  },
  { 
      headerMode: 'none', 
      initialRouteName: 'SignIn'
  }
);
