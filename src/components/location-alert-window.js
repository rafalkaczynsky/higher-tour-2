import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Platform, Animated} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'


export default class LocationAlertWindow extends Component {
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
    const {onPress} = this.props

    return (
        <Animated.View style={[StyleSheet.locationAlertWindow.container, {opacity: this.animateOpacity}]}>
            <View style={StyleSheet.locationAlertWindow.alertWindow}>
  
                <Text style={StyleSheet.locationAlertWindow.text}>
                    We need access your location so you can find nearest events
                    HigherApp doesnt work without access to location.
                </Text>
                <TouchableOpacity 
                    onPress={onPress}
                    style={StyleSheet.locationAlertWindow.button}
                >
                    <Text>
                        {Platform.OS === 'ios' ? 'Open Settings' : 'Continue'}
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
  }
}

