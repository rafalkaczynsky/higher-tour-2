import React, {Component} from 'react'
import {View, Text, TouchableHighlight, Linking} from 'react-native'

import StyleSheet from '../styles'
import {TabItem, Icon} from './'

export default class TabMenu extends Component {
  render() {

    const {onHome, onBible, onSettings, activeTabName} = this.props

    return (
        <View style={StyleSheet.tabMenu.container}>
          <TabItem
            active={activeTabName === 'Home' ? true : null}
            text="Home"
            iconName="logo"
            onPress={onHome}
           />
          <TabItem
            active={activeTabName === 'Bible' ? true : null}
            text="Bible"
            iconName="bible"
            onPress={onBible}
           />
          <TabItem
            active={activeTabName === 'Events' ? true : null}
            text="Events"
            iconName="events"
            onPress={() => Linking.openURL('https://highertour.com/coming-up')}
           />
          <TabItem
            active={activeTabName === 'Settings' ? true : null}
            text="Settings"
            iconName="settings"
            onPress={onSettings}
           />
        </View>
    )
  }
}
