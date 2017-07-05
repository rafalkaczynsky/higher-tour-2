import React, {Component} from 'react'
import {Button, View} from 'react-native'

import {SignIn} from '../windows'

export default class _SignIn extends Component {
  
  render() {
    const { navigate } = this.props.navigation
    return (
        <SignIn 
          onNext={()=> navigate('Welcome')}      
          onSettings={()=> navigate('Settings')}  
        />
    )
  }
}
