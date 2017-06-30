import React, {Component} from 'react'
import {View, Text} from 'react-native'

import StyleSheet from '../styles'
import TextBox from '../components/text-box'

export default class SignIn extends Component {

  render() {
    return (
      <View style={StyleSheet.window.default}>
        <TextBox />
      </View>
    )
  }
}
