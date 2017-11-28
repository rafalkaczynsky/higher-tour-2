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

    const {onWeekBackPressed, week, weekDate, selectedEvent, onGoBack, onNextPressed} = this.props

    const name = 'profileImage'
    const image = StyleSheet.icons[name]
    return (
    <View style={StyleSheet.window.default}>
    {week.Questions && <Header
          text={week.Title}
          onBack
          onNext
          onBackCallback={onGoBack}
          onNextCallback={onNextPressed}
    />}   
        {!week.Questions && <Header
          text={week.Title}
          onBack
          onBackCallback={onGoBack}
    />} 
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
                <Text style={{fontWeight: 'bold', fontSize: 22}}>
                    {week.sessionTitle}
                </Text>
              </View>
              <View style={{margin: 10}}>
                <Text style={{fontWeight: 'bold',  fontSize: 17}}>
                    {selectedEvent.meetingDay+ ', '} {weekDate}
                </Text>
                <Text style={{fontSize: 17}}>
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
              {week.Questions && <Button 
                type="default"
                text="BEGIN"
                onPress={onNextPressed}
                />}
            </ScrollView>
            </View>
            </View>

          <TabMenu
            onSettings={this.props.onSettings}
            onHome={this.props.onHome}    
            onBible={this.props.onBible}
            activeTabName={this.props.activeTabName}
          />
      </View>
)
  }
}
