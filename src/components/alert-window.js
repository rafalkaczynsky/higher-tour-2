import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Platform, Animated} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import {TabMenu} from './'


export default class AlertWindow extends Component {
constructor(){
    super()

    this.animateOpacity = new Animated.Value(0)
    Animated.timing(this.animateOpacity, {
      toValue: 1,
      duration: 2000,
      delay: 20
    }).start();

}
  render() {
    const {onPress, text, type} = this.props

    return (
        <View style={StyleSheet.window.default}>
            <Animated.View style={[ StyleSheet.locationAlertWindow.container, {opacity: this.animateOpacity}]}>
            <View style={StyleSheet.locationAlertWindow.alertWindow}>
  
                <Text style={StyleSheet.locationAlertWindow.text}>
                    {text}
                </Text>
                <TouchableOpacity 
                    onPress={onPress}
                    style={StyleSheet.locationAlertWindow.button}
                >
                {type === 'location' && <Text>{Platform.OS === 'ios' ? 'Open Settings' : 'Continue'}</Text>}
                {type === 'connection' && <Text>{'Got it!'}</Text>}
                </TouchableOpacity>
            </View>

            </Animated.View>
            <TabMenu/>
        </View>
    )
  }
}

/*

                <TouchableOpacity 
                    onPress={onPress}
                    style={StyleSheet.locationAlertWindow.button}
                >   {type === 'location' &&
                    <Text>
                        {Platform.OS === 'ios' ? 'Open Settings' : 'Continue'}
                    </Text>}
                    {type === 'connection' &&
                        <Text>
                           OK
                        </Text>
                        }
                </TouchableOpacity>
*/