import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput} from 'react-native'

import StyleSheet from '../styles'

import {TextBox, Icon, Title, Button, TabMenu, Header} from '../components'

export default class SignIn extends Component {

  render() {
    return (
      <View style={StyleSheet.window.default}>
        <Header 
          text='This is header'
          onBack
          onNext
        />
        <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{alignItems: "center"}}>
          <TextBox />
          <View style={{flex:1 , alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
          <Icon 
            name="bible" 
            style={{width: 50, height: 50, margin: 20}}
          />
          <Icon 
            name="logo" 
            style={{width: 50, height: 50, margin: 20}}
          />
          <Icon 
            name="events" 
            style={{width: 50, height: 50, margin: 20}}
          />
          <Icon 
            name="settings" 
            style={{width: 50, height: 50, margin: 20}}
          />
        </View>
        <View style={{flex:1 , alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
          <Icon 
            name="bible" 
            active
            style={{width: 50, height: 50, margin: 20}}
          />
          <Icon 
            name="logo"
            active
            style={{width: 50, height: 50, margin: 20}}
        />
          <Icon 
            name="events"
            active 
            style={{width: 50, height: 50, margin: 20}}
          />
          <Icon 
            name="settings"
            active 
            style={{width: 50, height: 50, margin: 20}}
          />
        </View>

        <Title 
          text="This is title component"  
          bgColor="brown" 
          textColor="white"
          style={{marginBottom: 30}}  
        />

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
          iconName="facebook"
          buttonStyle={{margin: 10, width: '70%'}}
        />

        <Button 
          type="twitter"
          text="Sign in with Twitter"
          iconName="twitter"
          buttonStyle={{margin: 10, width: '70%'}}
        />

         <Button 
          type="google"
          text="Sign in with Google"
          iconName="google"
          buttonStyle={{margin: 10, width: '70%'}}
        />     
        <TabMenu />     

        </View>
        </ScrollView>
      </View>
    )
  }
}