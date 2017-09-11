import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Image} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Read extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: 'Useless Placeholder', 
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
    }
  }

  render() {
    console.log('WelcomeXXX')
    const { locations, userData, itemDay} = this.props

    const name = 'profileImage'
    const image = StyleSheet.icons[name]

    console.log('Read Window')

    return (
      <View style={StyleSheet.window.default}>
        <Header 
          text='Read'
          onBack
          onNext
        />
        <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>
            <View style={{backgroundColor: 'white', width: '100%'}}>
                <View style={{width: '100%'}}>
                    <Image source={StyleSheet.images[name]} style={{ resizeMode: 'cover', width: '100%'}}/>
                </View>
                <View style={{padding: 20}}>
                    <View>
                        <Text style={{ fontSize: 12, lineHeight: 18}}>{itemDay.title}</Text>
                        <Text style={{ fontSize: 12, lineHeight: 18}}>{itemDay.label}</Text>
                    </View>
                    <View style={{marginTop: 30}}>
                        <Text style={{ fontSize: 12, lineHeight: 18}}>
                            {itemDay.text}
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
    )
  }
}