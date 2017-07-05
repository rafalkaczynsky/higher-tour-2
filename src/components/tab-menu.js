import React, {Component} from 'react'
import {View, Text, TouchableHighlight} from 'react-native'

import StyleSheet from '../styles'
import {TabItem, Icon} from './'

export default class TabMenu extends Component {
  render() {

    return (
        <View style={StyleSheet.tabMenu.container}>
          <TabItem
            active
            text="Home"
            iconName="logo"
            onPress={this.props.onHome}
           />
          <TabItem
            text="Bible"
            iconName="bible"
            onPress={()=> alert('Home pressed!')}
           />
          <TabItem
            text="Events"
            iconName="events"
            onPress={()=> alert('Home pressed!')}
           />
          <TabItem
            text="Settings"
            iconName="settings"
            onPress={this.props.onSettings}
           />
        </View>
    )
  }
}