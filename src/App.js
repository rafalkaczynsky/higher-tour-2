import React from 'react'
import {
  StackNavigator,
} from 'react-navigation';

import {_SignIn, _Welcome} from './containers'

export default App = StackNavigator(
  {
    Welcome: { screen: _Welcome },
    SignIn: { screen: _SignIn },
//   .........................
  },
  { 
      headerMode: 'none', 
      initialRouteName: 'SignIn'
  }
);
