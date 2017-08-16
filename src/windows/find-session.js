import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem} from '../components'

export default class FindSession extends React.Component {
    render(){
        return(
      <View style={StyleSheet.window.default}>
        <Header 
          text='Find a session'
          simple
        />
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}> 
            <View style={{width: '100%'}}>
            </View>

            <ScrollView style={{width: '100%'}}>
              <ListItem 
                title="Ivy Sharston Youth Sessions"
                label="0.1 miles"
              />
              <ListItem 
                title="Ivy Sharston Youth Sessions"
                label="0.1 miles"
              />
              <ListItem 
                title="Ivy Sharston Youth Sessions"
                label="0.1 miles"
                noBorder
              />
              <ListItem 
                title="Ivy Sharston Youth Sessions"
                label="0.1 miles"
              />
              <ListItem 
                title="Ivy Sharston Youth Sessions"
                label="0.1 miles"
              />
              <ListItem 
                title="Ivy Sharston Youth Sessions"
                label="0.1 miles"
                noBorder
              />

              <ListItem
                title="See more sessions"
                bgColor={colors.grey3}
                borderBold
              />
            </ScrollView>
            
        </View>
        <TabMenu 
          onSettings={this.props.onSettings}
        /> 
      </View>
        )
    }
}