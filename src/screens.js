import React from 'react';
import * as FirebaseInit from './actions/firebase-init';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import {
  _SignIn, 
  _Welcome, 
  _Settings, 
  _FindSession, 
  _FindChurch, 
  _SessionItem, 
  _UserProfile, 
  _HigherBibleReadings, 
  _Read, 
  _Think, 
  _Respond, 
  _WeekList, 
  _BibleReadingList, 
  _ReadingContentList
} from './containers'

let MyTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
      inputRange,
      outputRange: [.2, 1, 1],
  });

  const scaleY = position.interpolate({
      inputRange,
      outputRange: ([0.8, 1, 1]),
  });

  return {
      opacity,
      transform: [
          {scaleY}
      ]
  };
};

let TransitionConfiguration = () => {
  return {
      // Define scene interpolation, eq. custom transition
      screenInterpolator: (sceneProps) => {

          const {position, scene} = sceneProps;
          const {index} = scene;

          return MyTransition(index, position);
      }
  }
};

export const AppNavigator = StackNavigator({
  Welcome: {screen: _Welcome },
  SignIn: {screen: _SignIn },
  Settings : {screen: _Settings},
  FindSession: {screen: _FindSession},
  FindChurch: {screen: _FindChurch},
  SessionItem: {screen: _SessionItem},
  UserProfile: {screen: _UserProfile},
  HigherBibleReadings: {screen: _HigherBibleReadings},
  BibleReadingList: { screen: _BibleReadingList},
  ReadingContentList: {screen: _ReadingContentList},
  WeekList: {screen: _WeekList},
  Read: {screen: _Read},
  Think: {screen: _Think},
  Respond: {screen: _Respond}
},{ 
  headerMode: 'none', 
  initialRouteName: 'SignIn',
  transitionConfig: TransitionConfiguration

});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

/**
 * 
 * 
 * import React from 'react'

import {
  StackNavigator,
} from 'react-navigation';


import {
  _SignIn, 
  _Welcome, 
  _Settings, 
  _FindSession, 
  _FindChurch, 
  _SessionItem, 
  _UserProfile, 
  _HigherBibleReadings, 
  _Read, 
  _Think, 
  _Respond, 
  _WeekList, 
  _BibleReadingList, 
  _ReadingContentList
} from './containers'


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
    BibleReadingList: { screen: _BibleReadingList},
    ReadingContentList: {screen: _ReadingContentList},
    WeekList: {screen: _WeekList},
    Read: {screen: _Read},
    Think: {screen: _Think},
    Respond: {screen: _Respond}
//   .........................
  },
  { 
      headerMode: 'none', 
      initialRouteName: 'SignIn',
      lazy: true
  }
);
 */