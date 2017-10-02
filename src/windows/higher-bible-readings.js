import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import * as ACTIONS from '../actions/actions/actions';
import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

class HigherBibleReadings extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      lastReadDayNumber: undefined, 
      isMounted: false,
    }
  }

  componentWillMount(){
    const userData = this.props.user                // data from the store
    const currentDayContent = this.props.app.currentDayContent              // data from the store
    const currentReadingDayNumber = this.props.app.currentReadingDayNumber  // data from the store
    const currentBibleReadingTitle  = this.props.app.currentBibleReadingTitle   // data from the store
  
  }
  componentDidMount(){
    this.setState({isMounted: true})
  }
    render(){
      console.log('Higher Bible Readings Window')
      const {locations, onItemBackPressed, onCompleted, onNew, onItem, buttonsStyle, readings, currentScreen, chosenItem, onDayItem} = this.props
      console.log(readings)
      const userData = this.props.user                // data from the store
      const currentDayContent = this.props.app.currentDayContent              // data from the store
      const currentReadingDayNumber = this.props.app.currentReadingDayNumber  // data from the store
      const currentBibleReadingTitle  = this.props.app.currentBibleReadingTitle   // data from the store
      const lastReadDayNumber = this.props.app.lastReadDayNumber // data from the store

      return(
      <View style={StyleSheet.window.default}>
        <Header 
          onBack={currentScreen === 'item'}
          onBackCallback={onItemBackPressed}
          text='Higher Bible Readings'
          
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
       {currentScreen === 'list' && readings && readings.map((item, indx)=> 
      
        <ListItem 
          title={this.props.bibleReadingNames[indx]}
          label={item.length + ' days'}
          handleIconPressed={()=> {onItem(item, this.props.bibleReadingNames[indx][0])}}
          key={'ListItemReadingsKey-'+indx}
        />
      )}

      {this.state.isMounted && currentScreen === 'item' &&  chosenItem && chosenItem.map((item, indx) => 
      {


        return (
          <ListItem 

          key={'ListItemReadingsKey-'+indx}
          title={'Day ' + (indx)}         
          label={item.Read.Verse + ' available'}
          imageUrl={item.Read.Image}
          handleIconPressed ={()=>onDayItem(item, (indx))}
        />
        )
      })}
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

function mapStateToProps(state){
  return({
      user: state.user,
      app: state.app,
      currentBibleReading: state.currentBibleReading,
      bibleReadingScreenStatus: state.bibleReadingScreenStatus,
      bibleReadingNames: state.bibleReadingNames
      
  });
}

export default connect(mapStateToProps)(HigherBibleReadings);