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

    return (
      <View style={StyleSheet.window.default}>
        <Header 
          text='Settings'
          simple
        />
        <View style={StyleSheet.settings.container}>
            <View style={StyleSheet.settings.buttonGroup}>
                <Title 
                    text="You are signed in as Rafal Kaczynsky"  
                    textColor="brown"
                    textStyle={{fontSize: 18}}  
                />
                <Button 
                    type="settings"
                    text={this.props.buttonText.signIn}
                    onPress={this.props.onSignOut}
                /> 
            </View>
            <View style={StyleSheet.settings.buttonGroup}>
                <Title 
                    text="Notifications"  
                    textColor="brown"
                    textStyle={{fontSize: 18}}  
                />
                <Button 
                    type="settings"
                    text={this.props.buttonText.notificationsOn}
                    onPress={this.props.onNotifications}
                /> 
            </View>           
            <View style={StyleSheet.settings.buttonGroup}>
                <Title 
                    text="Location services"  
                    textColor="brown"
                    textStyle={{fontSize: 18}}  
                />
                <Button 
                    type="settings"
                    text={this.props.buttonText.locationOn}
                    onPress={this.props.onLocation}
                /> 
            </View>   
            <Text style={StyleSheet.settings.text}>
                Higher App version 2.0
            </Text>  
        </View>

        <TabMenu 
            onHome={this.props.onHome}
            onBible={this.props.onBible}
        /> 
      </View>
    )
  }
}