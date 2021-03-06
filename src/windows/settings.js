import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Linking} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Settings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {userData, loginStatus, onGoBack} = this.props

    let userText = ''
    if (loginStatus !== 'loggedOut'){
        if (this.props.userData) {
            const userDisplay = this.props.userData.displayName ? this.props.userData.displayName : this.props.userData.email
            userText = "You are signed in as " + userDisplay
        }
    } else {
        userText = "You are not signed in yet"
    }

    return (
      <View style={StyleSheet.window.default}>
        <Header
          text='Settings'
          onBack
          onBackCallback={onGoBack}
        />
        <ScrollView style={{width: '100%'}}>
        <View style={StyleSheet.settings.container}>

            <View style={StyleSheet.settings.buttonGroup}>
                <Title
                    text={userText}
                    textColor="brown"
                    textStyle={{fontSize: 18, textAlign: 'center'}}
                />
                <Button
                    type="settings"
                    text={this.props.buttonText.signIn}
                    onPress={this.props.onSignOut}
                />
            </View>
            <View style={StyleSheet.settings.buttonGroup}>
                <Title
                    text="Information"
                    textColor="brown"
                    textStyle={{fontSize: 18}}
                />

                <Button
                    type="settings"
                    text={'Privacy Policy'}
                    onPress={()=>  Linking.openURL('https://highertour.com/higher-app-privacy-policy')}
                />
            </View>
            <View style={StyleSheet.settings.buttonGroup}>
                <Button
                    type="settings"
                    text={'About'}
                    onPress={()=>  Linking.openURL('https://highertour.com/higher-app-about')}
                />
            </View>
            <Text style={StyleSheet.settings.text}>
                Higher App 2.0
            </Text>
        </View>
        </ScrollView>

        <TabMenu
            onHome={this.props.onHome}
            onBible={this.props.onBible}
            activeTabName={'Settings'}
        />
      </View>
    )
  }
}
