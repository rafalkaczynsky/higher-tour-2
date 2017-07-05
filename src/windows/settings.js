import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: 'Useless Placeholder', 
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
    }
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
                    text="Sign Out"
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
                    text="Turn off"
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
                    text="Turn off"
                /> 
            </View>   
            <Text style={StyleSheet.settings.text}>
                Higher App version 2.0
            </Text>  
        </View>

        <TabMenu 
            onHome={this.props.onHome}
        /> 
      </View>
    )
  }
}