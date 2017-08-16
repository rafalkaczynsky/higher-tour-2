import React, {Component} from 'react'
import {Image, View} from 'react-native'

import StyleSheet from '../styles'

export default class Picture extends Component {
  render() {
    const {name, active, style} = this.props
    const image = StyleSheet.images[name]

    return (
        <Image key={image} source={image} style={[StyleSheet.image, style]}/>
    );
  }
}