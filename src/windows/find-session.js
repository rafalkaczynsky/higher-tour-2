import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

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
              <Picture 
                name="mapsPlaceholder"
                />
            </View>
            <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                  type="default"
                  text="Closest"
                  bgColor="brown"  
                  textColor="white"
                  buttonStyle={{margin: 10 , marginRight: 0, width:'40%', height: 30}}
                /> 
                <Button 
                  type="default"
                  text="Alphabetical"
                  bgColor="transparent"
                  transparent
                  textColor="brown"
                  buttonStyle={{margin: 10, marginLeft: 0, width: '40%', height: 30}}
                /> 
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