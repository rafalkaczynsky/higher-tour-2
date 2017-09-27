import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Image, TouchableOpacity, Linking} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Think extends Component {
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
    console.log('Think Windeow')
    const { locations, userData, itemDay, currentReadingDayNumber, onWeekBackPressed, week, onItemNextPressed, onItemBackPressed} = this.props

    const name = 'profileImage'
    const image = StyleSheet.icons[name]

    let mainImage
    let versus
    let content

    console.log(itemDay)
    console.log(week)

return (      
  <View style={StyleSheet.window.default}>

  <Header 
    text='Think'
    onBack
    onNext
    onBackCallback={onItemBackPressed}
    onNextCallback={onItemNextPressed}
  />

  <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>
      <View style={{backgroundColor: 'white', width: '100%'}}>
          <View style={{padding: 20}}>
              <View style={{marginTop: 30}}>
                  <Text style={{ fontSize: 12, lineHeight: 18}}>
                      {itemDay.Read.Content}
                  </Text>
              </View>
          </View>
      </View>

  </View>
  <TabMenu 
    onSettings={this.props.onSettings}
    onHome={this.props.onHome}
    activeTabName={this.props.activeTabName}
  />
  </View>
  )}
}