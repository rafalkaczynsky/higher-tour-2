import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Linking, Image} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class Freebie extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {userData, onGoBack} = this.props

    const name = 'freebieExample'

    return (
      <View style={StyleSheet.window.default}>
        <Header
          text='Freebie'
          simple
        />
        <ScrollView style={{width: '100%'}}>
        <View style={[StyleSheet.settings.container]}>
            <View style={StyleSheet.settings.buttonGroup}>
                <Title
                    text={'Higher - Twelve24'}
                    textColor="brown"
                    textStyle={{fontSize: 18, textAlign: 'center'}}
                />
            </View>
            <View style={{ width: '90%',}}>
                <Image source={StyleSheet.images[name]}  style={{width: '100%'}}/>
            </View>
            <View style={StyleSheet.settings.buttonGroup}>
                <Button
                    type="settings"
                    text={'Download'}
                    onPress={this.props.download}
                    buttonStyle={{marginBottom: 10, backgroundColor: colors.yellow}}
                />
                <Button
                    type="settings"
                    text={'Send by email'}
                    onPress={()=>  Linking.openURL('https://highertour.com/higher-app-about')}
                />
            </View>
        </View>
        </ScrollView>
        <TabMenu
            onHome={this.props.onHome}
            onBible={this.props.onBible}
            onSettings={this.props.onSettings}
        />
      </View>
    )
  }
}
