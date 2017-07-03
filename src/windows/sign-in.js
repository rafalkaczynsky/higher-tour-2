import React, {Component} from 'react'
import {View, Text} from 'react-native'

import StyleSheet from '../styles'

import {TextBox, Icon, Title, Button} from '../components'

export default class SignIn extends Component {

  render() {
    return (
      <View style={StyleSheet.window.default}>
        <TextBox />
        <Icon name="bible" />
        <Title 
          text="This is title component"  
          bgColor="brown" 
          textColor="white"/>
        <Button 
          type="default"
          text="Button without icon"/>
        <Button 
          type="default"
          text="Button without icon"
          bgColor="black"  
          textColor="yellow"/> 

        <Button 
          type="default"
          text="Button without icon, with custom styles"
          bgColor="brown"  
          textColor="white"
          buttonStyle={{margin: 10, width: '95%'}}
        /> 

        <Button 
          type="facebook"
          text="Sign in with Facebook"
          iconName="bible"
          buttonStyle={{margin: 10, width: '70%'}}
        />

        <Button 
          type="twitter"
          text="Sign in with Twitter"
          iconName="bible"
          buttonStyle={{margin: 10, width: '70%'}}
        />


         <Button 
          type="google"
          text="Sign in with Google"
          iconName="bible"
          buttonStyle={{margin: 10, width: '70%'}}
        />          

      </View>
    )
  }
}
