import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Image, TouchableOpacity, Linking} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class WeekList extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: 'Useless Placeholder', 
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
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
 
    const {onWeekBackPressed, week, weekDate, selectedEvent, onGoBack} = this.props

    const name = 'profileImage'
    const image = StyleSheet.icons[name]

    return (
    <View style={StyleSheet.window.default}>
    <Header 
      text='SESSIONS'
      onBack
      onBackCallback={onGoBack}
    />
 
      <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>      
          <View 
            style={{
              width: '100%',
              flexDirection: 'column',
              alignItems: 'flex-start',
              backgroundColor: 'white',
            }}>
            <ScrollView style={{backgroundColor: 'white', width: '100%'}}>
              <View style={{width: '100%'}}>
                <Image source={{uri: week.image}} style={{  resizeMode: 'cover', height: 200}} />
              </View>
              <View style={{margin: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 30}}>
                    {week.Title + ' - ' + week.sessionTitle}
                </Text>
              </View>

              <View style={{margin: 10}}>
                <Text style={{fontWeight: 'bold',  fontSize: 23}}>       
                    {selectedEvent.meetingDay+ ', '} {weekDate} 
                </Text>   
                <Text style={{fontWeight: 'bold',  fontSize: 20}}>
                  {selectedEvent.meetingTime}
                </Text>
              </View>

              <View style={{margin: 10, marginBottom: 2}}>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>
                      {selectedEvent.name}
                </Text>
              </View>

              <View style={{margin: 10, marginTop:2}}>
                    <Text style={{fontWeight: 'normal', }}>{selectedEvent.address.firstLine}</Text>
                    <Text style={{fontWeight: 'normal', }}>{selectedEvent.address.city} </Text>
                    <Text style={{fontWeight: 'normal', }}>{selectedEvent.address.postcode}</Text>   
              </View>
              </ScrollView>
            </View>
            </View>

          <TabMenu 
            onSettings={this.props.onSettings}
            onHome={this.props.onHome}
            activeTabName={this.props.activeTabName}
          /> 
      </View>
)
  }
}