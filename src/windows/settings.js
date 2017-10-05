import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Settings extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('Settings Window')
    const {userData, loginStatus} = this.props

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
          simple
        />
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
                    text="Informations"  
                    textColor="brown"
                    textStyle={{fontSize: 18}}  
                />

                <Button 
                    type="settings"
                    text={'Terms and Conditions'}
                    onPress={()=> alert('About clicked!')}
                /> 
            </View>
            <View style={StyleSheet.settings.buttonGroup}>
                <Button 
                    type="settings"
                    text={'About'}
                    onPress={()=> alert('About clicked!')}
                /> 
            </View>           
            <Text style={StyleSheet.settings.text}>
                Higher App version 2.0
            </Text>  
        </View>

        <TabMenu 
            onHome={this.props.onHome}
            onBible={this.props.onBible}
            activeTabName={this.props.activeTabName}
        /> 
      </View>
    )
  }
}