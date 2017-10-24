import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Image, TouchableOpacity, Linking} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Freebie extends Component {
  constructor(props) {
    super(props)
  }

  render() {

  return (
           
  <View style={StyleSheet.window.default}>
  <Header 
    text='Freebies'
    simple
  />
  
  <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>
      <View style={{backgroundColor: 'white', width: '100%'}}>
         
          <View style={{width: '100%'}}>
              <Image source={{uri:this.props.image}} style={{resizeMode: 'cover', height: 200}} />
          </View>

          <View style={{padding: 20}}>
              <View>
                  <Text style={{ fontSize: 12, lineHeight: 18}}>FREE TITLE </Text>
              </View>
              <View style={{marginTop: 30}}>
                  <Text style={{ fontSize: 12, lineHeight: 18}}>
                      YEAH SUPER SOMETHING FOR FREE FOR YOU!!! WOW WHAT'S A DAY? 
                  </Text>
              </View>
          </View>
          <Button 
        type="default"
        text={'DONE'}
        onPress={this.props.onGoBack}
        style={{flex: 1}}
      />
      </View>

  </View>
  </View>
  )
}
}