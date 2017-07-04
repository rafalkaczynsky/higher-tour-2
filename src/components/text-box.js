import React, {Component} from 'react'
import {View, Text} from 'react-native'

import StyleSheet from '../styles'

export default class TextBox extends Component {

  render() {

    const {header, paragraph, style} = this.props

    return (
      <View style={[StyleSheet.textBox.container, style]}>
        <Text style={StyleSheet.textBox.header}>{header}</Text>
        <Text style={StyleSheet.textBox.text}>{paragraph}</Text>
      </View>
    )
  }
}