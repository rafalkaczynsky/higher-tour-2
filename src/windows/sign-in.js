import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput} from 'react-native'
import { StackNavigator } from 'react-navigation';

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header} from '../components'

export default class SignIn extends Component {
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
          text='Sign in'
          simple
        />
        <View style={StyleSheet.signIn.container}> 
          <TextBox 
            header="Welcome To The Higher App!"
            paragraph="Before you start, let's create an account. Register using one of the following options to receive exclusive freebies."
            style={StyleSheet.signIn.textBox}
          />
          <View>
            <Button 
              type="facebook"
              text="Sign in with Facebook"
              iconName="facebook"
              buttonStyle={StyleSheet.signIn.socialButton}
            />
            <Button 
              type="twitter"
              text="Sign in with Twitter"
              iconName="twitter"
              buttonStyle={StyleSheet.signIn.socialButton}
            />
            <Button 
              type="google"
              text="Sign in with Google"
              iconName="google"
              buttonStyle={StyleSheet.signIn.socialButton}
            /> 
          </View>
          <View style={{width: '60%'}}>
            <Title 
              text="Sign in with email"  
              textStyle={{fontSize: 18}}
              style={{marginTop: 20}}  
            />
            <TextInput
              style={StyleSheet.signIn.textInput}
              onChangeText={(text) => this.setState({text})}
              placeholder={this.state.namePlaceholder}
              underlineColorAndroid='transparent'
            />
            <TextInput
              style={StyleSheet.signIn.textInput}
              onChangeText={(text) => this.setState({text})}
              placeholder={this.state.emailPlaceholder}
              underlineColorAndroid='transparent'
            />
            <Button 
              type="default"
              text="Next"
              buttonStyle={{height: 30}}
              onPress={this.props.onNext}
            />
          </View>
        </View>
        <TabMenu 
          onSettings={this.props.onSettings}
        /> 
      </View>
    )
  }
}
