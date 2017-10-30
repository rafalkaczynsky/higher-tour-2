import React, {Component} from 'react'
import {ScrollView, WebView, View, Text, TextInput, Image, TouchableOpacity, Linking} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Freebie extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const {title, body, image, video} = this.props


  return (
           
  <View style={StyleSheet.window.default}>
  <Header 
    text={title}
    simple
  />
  
  <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>
      <ScrollView style={{backgroundColor: 'white', width: '100%'}}>
        {image && 
        <View style={{width: '100%'}}>
              <Image source={{uri: image}} style={{resizeMode: 'cover', height: 200}} />
        </View>}

        {video && 
        <View style={{width: '100%', height: 220}}>
            <WebView
                source={{uri: video}}
                style={{borderColor: 'black', borderWidth: 3}}
            />
        </View>}
          <View style={{padding: 20}}>
              <View>
                  <Text style={{ fontSize: 12, lineHeight: 18}}></Text>
              </View>
              <View style={{marginTop: 30, marginBottom: 30}}>
                  <Text style={{ fontSize: 28, lineHeight: 45 }}>
                      {body}
                  </Text>
              </View>
          </View>
          <Button 
            type="default"
            text={'DONE'}
            onPress={this.props.onGoBack}
            style={{flex: 1}}
        />
      </ScrollView>

  </View>
  </View>
  )
}
}