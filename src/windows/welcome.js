import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      text: 'Useless Placeholder', 
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
    }
  }

  render() {

    const {churches, onMoreSession, onChurchPressed, allSessions} = this.props

    console.log(churches)
    console.log('Welcome')
    console.log(allSessions)
    return (
      <View style={StyleSheet.window.default}>
        <Header 
          text='Welcome'
          simple
        />
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}> 
            <TextBox 
                header="You're signed in!"
                paragraph="Next, let's find a Higher Session near you. Choose frome the list below."
                style={{marginTop: 30, marginBottom: 20}}
            />
            <ScrollView style={{width: '100%'}}>
              {churches.map((item, index)=>
                <ListItem 
                  key={'ChurchesList' + index}
                  title={item.name}
                  label={item.howFar}
                  handleIconPressed={()=> onChurchPressed(item)}
                />)}

              <ListItem
                title="See more sessions"
                bgColor={colors.grey3}
                borderBold
                handleIconPressed={()=> onMoreSession(allSessions)}
                
              />
            </ScrollView>
            
        </View>
        <TabMenu 
          onSettings={this.props.onSettings}
          onBible={this.props.onBible}
        /> 
      </View>
    )
  }
}