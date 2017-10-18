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
 
    const {onWeekBackPressed, week, selectedEvent, onGoBack} = this.props

    const name = 'profileImage'
    const image = StyleSheet.icons[name]

    console.log('Read Window')

    console.log(week)
    console.log(this.props.selectedEvent)
    return (
    <View style={StyleSheet.window.default}>
    <Header 
      text='SESSIONS'
      onBack
      onBackCallback={onWeekBackPressed}
    />
 
      <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>      


          <View 
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'column',
              alignItems: 'flex-start',
              backgroundColor: 'white'
        
            }}>
            <ScrollView>
              <View style={{width: '100%'}}>
                <Image source={{uri: week.image}} style={{  resizeMode: 'cover', height: 200}} />
              </View>
              <View style={{margin: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 35}}>
                    {week.Title + ' - ' + week.sessionTitle}
                </Text>
              </View>

              <View style={{margin: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                      {selectedEvent.name}
                </Text>
              </View>

              <View style={{margin: 10}}>
                <Text style={{fontWeight: 'bold',  fontSize: 15}}>
                    Location           
                    <Text style={{fontWeight: 'normal', }}>
                      {' ' + selectedEvent.address.firstLine + ' ,'}
                      {selectedEvent.address.city+ ' ,'} {selectedEvent.address.postcode}
                    </Text>

                </Text>   
              </View>
              <View style={{margin: 10}}>
                <Text style={{fontWeight: 'bold',  fontSize: 15}}>
                  Time:           
                  <Text style={{fontWeight: 'normal'}}>
                    {' ' + selectedEvent.address.firstLine + ' ,'}
                    {selectedEvent.meetingDay+ ' ,'} {selectedEvent.meetingTime}
                  </Text>
                </Text>   
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