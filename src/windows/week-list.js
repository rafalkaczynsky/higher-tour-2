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
 
    const {onWeekBackPressed, week, onGoBack} = this.props

    const name = 'profileImage'
    const image = StyleSheet.icons[name]

    console.log('Read Window')

    console.log(week)

    return (
    <View style={StyleSheet.window.default}>
    <Header 
      text='SESSIONS'
      onBack
      onBackCallback={onWeekBackPressed}
    />
 
    <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>
        <View style={{backgroundColor: 'white', width: '100%'}}>
           
            <View style={{width: '100%'}}>
                <Image source={{uri: week.image}} style={{  resizeMode: 'cover', height: 200}} />
            </View>
            <View style={{padding: 20}}>
                <View>
                    <Text style={{ fontSize: 12, lineHeight: 18}}>{week.sessionTitle}</Text>
                </View>
                <View style={{marginTop: 30}}>
                    <Text style={{ fontSize: 12, lineHeight: 18}}>
                        {week.content}
                    </Text>
                </View>
            </View>
            <Button 
              type="default"
              text={'GO HOME'}
              onPress={onGoBack}
              style={{flex: 1}}
            />
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