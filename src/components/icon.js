import React, {Component} from 'react'
import {Image, View} from 'react-native'

import StyleSheet from '../styles'

export default class Icon extends Component {
  render() {
    const {name, active, style} = this.props
    const image = StyleSheet.icons[name + (active ? 'Active' : '')]

    return (
        <Image key={image} source={image} style={[StyleSheet.icon, style]}/>
    );
  }
}