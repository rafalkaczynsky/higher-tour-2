import React from 'react'
import {
  StackNavigator,
} from 'react-navigation';

import {_SignIn, _Welcome, _Settings} from './containers'

export default App = StackNavigator(
  {
    Welcome: { screen: _Welcome },
    SignIn: { screen: _SignIn },
    Settings : { screen: _Settings}
//   .........................
  },
  { 
      headerMode: 'none', 
      initialRouteName: 'SignIn'
  }
);
