import React, {Component} from 'react'
import {Button, View} from 'react-native'

import {Settings} from '../windows'

export default class _Settings extends Component {
  
  render() {
    const { navigate } = this.props.navigation;
    return (
        <Settings 
          onHome={()=> navigate('Welcome')}  
          onSignOut={() => navigate('SignIn')}    
        />
    )
  }
}
