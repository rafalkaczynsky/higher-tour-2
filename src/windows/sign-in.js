import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, TouchableOpcity} from 'react-native'
import twitter, {auth} from 'react-native-twitter';


import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import {TextBox, Icon, Title, Button, TabMenu, Header} from '../components'

var dataBase 
var Events
var latestSnapshot = null;

export default class SignIn extends Component {
  constructor(props){
    super(props)

    this.state = {
      events:[]
    }
  }

  render() {

    const {handleEmail, handlePassword, email, password, onNext, onSettings, onBible, onTwitter, onFacebook} = this.props
    return (
      <View style={StyleSheet.window.default}>

        <Header
          text='Sign in'
          simple
        />
        <View style={StyleSheet.signIn.container}>
          <TextBox
            header="Welcome To The Higher App!!!"
            paragraph="Before you start, let's create an account. Register using one of the following options to receive exclusive freebies."
            style={StyleSheet.signIn.textBox}
          />
          <View>
            <Button
              type="facebook"
              text="Sign in with Facebook"
              iconName="facebook"
              onPress={onFacebook}
              buttonStyle={StyleSheet.signIn.socialButton}
            />
            <Button
              type="twitter"
              text="Sign in with Twitter"
              iconName="twitter"
              onPress={onTwitter}
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
              onChangeText={(text) => handleEmail(text)}
              placeholder='Email'
              underlineColorAndroid='transparent'
            />
            <TextInput
              style={StyleSheet.signIn.textInput}
              onChangeText={(text) => handlePassword(text)}
              placeholder='Password'
              underlineColorAndroid='transparent'
            />
            <Button
              type="default"
              text="Next"
              buttonStyle={{height: 30}}
              onPress={onNext}
            />
            <TouchableOpcity>
              <Text>Reset passord</Text> 
            </TouchableOpcity>
          </View>
        </View>
        <TabMenu
          onSettings={onSettings}
          onBible={onBible}
          activeTabName={this.props.activeTabName}
        />
      </View>
    )
  }
}
