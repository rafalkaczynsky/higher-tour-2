import React, {Component} from 'react'
import {TouchableHighlight, View, Text} from 'react-native'

import {Icon} from './'
import StyleSheet from '../styles'
import {colors} from '../styles/resources'

export default class TabItem extends Component {
    render(){
        const {active, text, iconName, onPress, activeColor, bgColor, textColor} = this.props
    
        const underlayColor = activeColor ? activeColor : colors.yellow
        const icon = active ? iconName + 'Active' : iconName
        let backgroundColor, color = null

        if (active) {
            color = colors.black
            if (bgColor){
                backgroundColor = bgColor 
            } else {
                backgroundColor = colors.yellow
            }
        } else {
            color = colors.white
            if (bgColor){
                backgroundColor = bgColor
            } else {
                backgroundColor = null
            }
        }   

        return(
          <TouchableHighlight
            style={[StyleSheet.tabItem.container, {backgroundColor}]}
            underlayColor={underlayColor}
            onPress={onPress}>
              <View>
                <Icon 
                    name={icon} 
                    style={StyleSheet.tabItem.iconStyle}
                />
                <Text style={[StyleSheet.tabItem.text, {color}, {backgroundColor: textColor ? textColor : null}]}>{text}</Text>
            </View>
          </TouchableHighlight>
        )
    }
} 