import React, {Component} from 'react'
import {View, Text} from 'react-native'

import StyleSheet from '../styles'

export default class TextBox extends Component {

  render() {
    return (
      <View style={StyleSheet.textBox.container}>
        <Text style={StyleSheet.textBox.header}>Welcome To Higher App!</Text>
        <Text style={StyleSheet.textBox.text}>
            Before you start, let's create an account.
            Register using one of the following options to 
            receive exclusive freebies.
        </Text>
      </View>
    )
  }
}