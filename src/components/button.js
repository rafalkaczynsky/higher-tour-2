import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import {Icon} from './'
import StyleSheet from '../styles'

export default class Button extends Component {
    render(){
        const {type, text, iconName, bgColor, textColor, buttonStyle, textStyle} = this.props

        return(
            <TouchableOpacity style={[StyleSheet.buttons[type].container, StyleSheet.colorMode[bgColor], buttonStyle]}>
                {!iconName &&
                    <Text style={[StyleSheet.buttons[type].text, StyleSheet.textColorMode[textColor], textStyle]}>
                        {text}
                    </Text>
                }
                {iconName && (
                    <View style={StyleSheet.buttons[type].wraper}>
                        <View style={StyleSheet.buttons[type].iconContainer}>
                            <Icon name={iconName} style={StyleSheet.buttons[type].iconStyle}/>
                        </View>
                        <View style={StyleSheet.buttons[type].textContainer}>
                            <Text style={[StyleSheet.buttons[type].text, StyleSheet.textColorMode[textColor], textStyle]}>
                                {text}
                            </Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        )
    }
} 


