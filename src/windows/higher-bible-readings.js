import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, TouchableOpacity} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

export default class HigherBibleReadings extends React.Component {

    render(){
      console.log('Higher Bible Readings Window')
      const {locations, onCompleted, onNew, onItem, buttonsStyle, readings, currentScreen, chosenItem, onDayItem} = this.props

     console.log(chosenItem)  
 
      return(
      <View style={StyleSheet.window.default}>
        <Header 
          text='Higher Bible Readings'
          simple
        />
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}> 
            <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                  type="default"
                  text={chosenItem ? 'Ascending' : 'New'}
                  bgColor={buttonsStyle[1].bgColor}  
                  textColor={buttonsStyle[1].textColor}
                  buttonStyle={{margin: 10 , marginRight: 0, width:'40%', height: 30}}
                  onPress={onNew}
                /> 
                <Button 
                  type="default"
                  text={chosenItem ? 'Descending' : 'Completed'}
                  bgColor={buttonsStyle[0].bgColor}  
                  textColor={buttonsStyle[0].textColor}
                  buttonStyle={{margin: 10, marginLeft: 0, width: '40%', height: 30}}
                  onPress={onCompleted}
                /> 
            </View>

            <ScrollView style={{width: '100%'}}>
            { currentScreen === 'list' && readings.map((item, indx)=> 
                <TouchableOpacity 
                   onPress={()=> {onItem(item)}}
                   key={'ListItemReadingsKey-'+indx}
                >
                  <ListItem 
                    title={item.title}
                    label={item.days + ' days'}
                   
                  />
                </TouchableOpacity>
                )}
            {currentScreen === 'item' && chosenItem.map((item, indx)=> 

                  <ListItem 
                    key={'ListItemReadingsKey-'+indx}
                    title={'Day ' + (indx + 1)}
                    label={item.Read.Verse}
                    imageUrl={item.Read.Image}
                    handleIconPressed ={()=> onDayItem(item, (indx + 1))}
                  />

              )}

            </ScrollView>
            
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