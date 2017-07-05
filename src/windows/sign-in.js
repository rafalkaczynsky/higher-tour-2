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

        <View style={{flex: 1, alignItems: 'center', width: '100%'}}> 

        <TextBox 
          header="Welcome To The Higher App!"
          paragraph="Before you start, let's create an account. Register using one of the following options to receive exclusive freebies."
          style={{marginTop: 30, marginBottom: 20}}
        />
        <View>
          <Button 
            type="facebook"
            text="Sign in with Facebook"
            iconName="facebook"
            buttonStyle={{margin: 5, width: '60%'}}
          />
          <Button 
            type="twitter"
            text="Sign in with Twitter"
            iconName="twitter"
            buttonStyle={{margin: 5, width: '60%'}}
          />

          <Button 
            type="google"
            text="Sign in with Google"
            iconName="google"
            buttonStyle={{margin: 5, width: '60%'}}
          /> 
        </View>

        <View style={{width: '60%'}}>
          <Title 
            text="Sign in with email"  
            textStyle={{fontSize: 18}}
            style={{marginTop: 20}}  
          />

          <TextInput
            style={{height: 40, borderColor: colors.grey2, backgroundColor: colors.white, borderWidth: 1, marginBottom: 10, fontSize: 12, paddingLeft: 10}}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.state.namePlaceholder}
            underlineColorAndroid='transparent'
          />

          <TextInput
            style={{height: 40, borderColor: colors.grey2, backgroundColor: colors.white, borderWidth: 1, marginBottom: 10, fontSize: 12, paddingLeft: 10}}
            onChangeText={(text) => this.setState({text})}
            placeholder={this.state.namePlaceholder}
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

        <TabMenu /> 
      </View>
    )
  }
}
