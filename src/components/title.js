import React, {Component} from 'react'
import {View, Text} from 'react-native'

import StyleSheet from '../styles'

export default class Title extends Component {
    render(){
        const {text, bgColor, textColor, style, textStyle} = this.props
        return(
            <View style={[StyleSheet.title.container, StyleSheet.colorMode[bgColor], style]}>
               <Text style={[StyleSheet.title.textStyle,StyleSheet.textColorMode[textColor], textStyle]}>{text}</Text> 
            </View>
        )
    }
} 

