import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'


export default class LocationAlertWindow extends Component {

  render() {
    const {onPress} = this.props

    return (
        <View style={StyleSheet.locationAlertWindow.container}>
            <View style={StyleSheet.locationAlertWindow.alertWindow}>
                <Text style={StyleSheet.locationAlertWindow.header}>
                    Access to your <Text style={{fontWeight: 'bold'}}>location is OFF!</Text>
                </Text>     
                <Text style={StyleSheet.locationAlertWindow.text}>
                    We need access your location so you can find nearest events
                    HigherApp doesnt work without access to location.
                </Text>
                <TouchableOpacity 
                    onPress={onPress}
                    style={StyleSheet.locationAlertWindow.button}
                >
                    <Text>
                        Open Settings
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }
}

