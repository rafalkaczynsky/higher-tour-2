import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Image, TouchableOpacity, Linking} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Think extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { itemDay, onItemNextPressed, onItemBackPressed, onGoToApp} = this.props

    const name = 'profileImage'
    const image = StyleSheet.icons[name]

return (
  <View style={StyleSheet.window.default}>

  <Header
    text='Think'
    onBack
    onNext
    onBackCallback={onItemBackPressed}
    onNextCallback={onItemNextPressed}
  />

  <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>
      <ScrollView style={{backgroundColor: 'white', width: '100%'}}>
          <View style={{padding: 20}}>
            <View>
              <Text style={{ fontSize: 12, lineHeight: 18,fontWeight: 'bold'}}>Think</Text>
            </View>
              <View style={{marginTop: 20}}>
                  <Text style={{ fontSize: 12, lineHeight: 18}}>
                      {itemDay.Think.Content}
                  </Text>
              </View>
          </View>
      </ScrollView>

  </View>
  {this.props.fromNotification &&
  <Button
    type="default"
    text={'DONE'}
    onPress={onGoToApp}
    style={{flex: 1}}
  />
  }
  {!this.props.fromNotification &&
  <TabMenu
    onSettings={this.props.onSettings}
    onHome={this.props.onHome}
    activeTabName={this.props.activeTabName}
  />}
  </View>
  )}
}
