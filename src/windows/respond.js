import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Image, TouchableOpacity, Linking} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Respond extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      dayItem: null,
      isMounted: true,
    }
  }

  componentWillMount(){
    this.setState({
      dayItem: this.props.dayItem
    })
  }

  componentDidMount(){
    this.setState({
      isMounted:  true
    })
  }

  render() {
    const {itemDay, onItemNextPressed, onItemBackPressed, onGoToApp, onGoBack} = this.props

    const name = 'profileImage'
    const image = StyleSheet.icons[name]

    let mainImage
    let versus
    let content

return (      
  <View style={StyleSheet.window.default}>

  <Header 
    text='Respond'
    onBack
    onBackCallback={onItemBackPressed}

  />

  <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>
  <ScrollView style={{backgroundColor: 'white', width: '100%'}}>
      <View style={{padding: 20}}>
          <View>
              <Text style={{ fontSize: 12, lineHeight: 18, fontWeight: 'bold'}}>Live it</Text>
          </View>
          <View style={{marginTop: 15, marginBottom: 25}}>
              <Text style={{ fontSize: 12, lineHeight: 18}}>
                  {itemDay.Respond[ 'Live It' ]}
              </Text>
          </View>
          <View>
              <Text style={{ fontSize: 12, lineHeight: 18, fontWeight: 'bold'}}>Pray</Text>
          </View>
          <View style={{marginTop: 15, marginBottom: 25}}>
              <Text style={{ fontSize: 12, lineHeight: 18}}>
                  {itemDay.Respond.Pray}
              </Text>
          </View>
          <View>
              <Text style={{ fontSize: 12, lineHeight: 18,fontWeight: 'bold'}}>Repeat</Text>
          </View>
          <View style={{marginTop: 15, marginBottom: 25}}>
              <Text style={{ fontSize: 12, lineHeight: 18}}>
                  {itemDay.Respond.Repeat}
              </Text>
          </View>
      </View>
      {!this.props.fromNotification &&
      <Button 
        type="default"
        text={'DONE'}
        onPress={onGoBack}
        style={{flex: 1}}
      />}
  </ScrollView>

</View>

{this.props.fromNotification &&
<Button 
  type="default"
  text={'DONE'}
  onPress={onGoToApp}
  style={{flex: 1}}
/>
}
{!this.props.fromNotification &&
<TabMenu 
  onSettings={this.props.onSettings}
  onHome={this.props.onHome}
  activeTabName={this.props.activeTabName}
/>}
  </View>
  )}
}