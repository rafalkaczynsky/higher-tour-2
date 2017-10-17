import React, {Component} from 'react'
import {Image, View} from 'react-native'

import StyleSheet from '../styles'

export default class Icon extends Component {
  componentWillMount(){
    const {name, active} = this.props
    this.image = StyleSheet.icons[name + (active ? 'Active' : '')]
    this.style = this.props.style ? this.props.style : null 
  }
  render() {

    return (
        <Image key={this.image} source={this.image} style={[this.style]}/>
    );
  }
}