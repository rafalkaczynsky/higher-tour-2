import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Image, TouchableOpacity, Linking} from 'react-native'

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
      dayItem: null,
      isMounted: true,
    }
  }

  componentWillMount(){
    this.setState({
      itemDay: this.props.itemDay
    })
  }

  componentDidMount(){
    this.setState({
      isMounted:  true
    })
  }

  render() {

    const {
      userData,
      itemDay,
      currentReadingDayNumber,
      onItemNextPressed,
      onItemBackPressed,
      fromNotification
    } = this.props

    const name = 'profileImage'
    const image = StyleSheet.icons[name]
    let mainImage
    let versus
    let content

    if ((this.state.isMounted) && (itemDay)){
      if (fromNotification) return (

      <View style={StyleSheet.window.default}>
        <Header
          text='Read'
          onBack
          onNext
          onBackCallback={onItemBackPressed}
          onNextCallback={onItemNextPressed}
        />

        <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>
          <ScrollView style={{backgroundColor: 'white', width: '100%'}}>

            <View style={{width: '100%'}}>
              <Image source={{uri: itemDay.Read.Image}} style={{  resizeMode: 'cover', height: 200}} />
            </View>
            <View style={{padding: 20}}>
              <View>
                <Text style={{ fontSize: 12, lineHeight: 18}}>DAY {currentReadingDayNumber}</Text>
                <TouchableOpacity onPress={()=> Linking.openURL(itemDay.Read.VerseLink)}>
                  <Text style={{ fontSize: 12, lineHeight: 18}}>{itemDay.Read.Verse}</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 30}}>
              <Text style={{ fontSize: 12, lineHeight: 18}}>
                 {itemDay.Read.Content}
              </Text>
            </View>
            </View>
          </ScrollView>

        </View>
        <Button
          type="default"
          text={'DONE'}
          onPress={onItemBackPressed}
          style={{flex: 1}}
        />
      </View>)

   else if (!fromNotification) {
     return (

  <View style={StyleSheet.window.default}>
  <Header
    text='Read'
    onBack
    onNext
    onBackCallback={onItemBackPressed}
    onNextCallback={onItemNextPressed}
  />

  <View style={{flex: 1, alignItems: 'center', width: '100%', padding: 10}}>
      <ScrollView style={{backgroundColor: 'white', width: '100%'}}>

          <View style={{width: '100%'}}>
              <Image source={{uri: itemDay.Read.Image}} style={{  resizeMode: 'cover', height: 200}} />
          </View>
          <View style={{padding: 20}}>
              <View>
                  <TouchableOpacity onPress={()=> Linking.openURL(itemDay.Read.VerseLink)}>
                    <Text style={{ fontSize: 12, lineHeight: 18}}>{itemDay.Read.Verse}</Text>
                  </TouchableOpacity>
              </View>
              <View style={{marginTop: 30}}>
                  <Text style={{ fontSize: 12, lineHeight: 18}}>
                      {itemDay.Read.Content}
                  </Text>
              </View>
          </View>
      </ScrollView>

  </View>
  <TabMenu
    onSettings={this.props.onSettings}
    onHome={this.props.onHome}
    activeTabName={this.props.activeTabName}
  />
  </View>
  )
} else return (
  <View style={StyleSheet.window.default}>
    <Text>Unable to find reading</Text>
    <Button
      type="default"
      text={'DONE'}
      onPress={onItemBackPressed}
      style={{flex: 1}}
    />
  </View>
)
} else return (<Text>Loading ...</Text>)
}
}
