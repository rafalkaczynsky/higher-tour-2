import React, {Component} from 'react'
import {View, Text, TouchableHighlight, Linking} from 'react-native'

import StyleSheet from '../styles'
import {TabItem, Icon} from './'

export default class TabMenu extends Component {
  render() {

    const {onHome, onBible, onSettings} = this.props
    
    return (
        <View style={StyleSheet.tabMenu.container}>
          <TabItem
            active
            text="Home"
            iconName="logo"
            onPress={onHome}
           />
          <TabItem
            text="Bible"
            iconName="bible"
            onPress={onBible}
           />
          <TabItem
            text="Events"
            iconName="events"
            onPress={() => Linking.openURL('https://message.org.uk')}
           />
          <TabItem
            text="Settings"
            iconName="settings"
            onPress={onSettings}
           />
        </View>
    )
  }
}