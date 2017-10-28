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
      const {
        locations,
        onItemBackPressed,
        onCompleted,
        onNew,
        onItem,
        buttonsStyle,
        readings,
        currentScreen,
        chosenItem,
        onDayItem,
        showAll,
        onAll,
        onAvailable,
        onGoBack,
      } = this.props

      const userData = this.props.user                // data from the store
      const currentDayContent = this.props.app.currentDayContent              // data from the store
      const currentReadingDayNumber = this.props.app.currentReadingDayNumber  // data from the store
      const currentBibleReadingTitle  = this.props.app.currentBibleReadingTitle   // data from the store
      const lastReadDayNumber = this.props.app.lastReadDayNumber // data from the store

      return(
      <View style={StyleSheet.window.default}>
        <Header
          onBack
          onBackCallback={currentScreen === 'item' ? onItemBackPressed : onGoBack}
          text='Higher Bible Readings'

        />
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
            <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  type="default"
                  text={chosenItem ? 'Available' : 'Completed'}
                  bgColor={buttonsStyle[1].bgColor}
                  textColor={buttonsStyle[1].textColor}
                  buttonStyle={{margin: 10 , marginRight: 0, width:'40%', height: 30}}
                  onPress={onAvailable}
                />
                <Button
                  type="default"
                  text={chosenItem ? 'Coming Up' : 'New'}
                  bgColor={buttonsStyle[0].bgColor}
                  textColor={buttonsStyle[0].textColor}
                  buttonStyle={{margin: 10, marginLeft: 0, width: '40%', height: 30}}
                  onPress={onAll}
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

     {this.state.isMounted && currentScreen === 'item' && showAll && chosenItem && chosenItem.map((item, indx) =>
     {
       if (indx > 0)
         return (
           <ListItem
             key={'ListItemReadingsKey-'+indx}
             title={'Day ' + (indx)}
             label={item.Read.Verse}
             opacity={ indx -1 <= lastReadDayNumber ? 1 : 0.6}
             imageUrl={item.Read.Image}
             handleIconPressed ={indx -1 <= lastReadDayNumber ? ()=> onDayItem(item, (indx)) : null}
           />
         )
     })
   }

   {this.state.isMounted && currentScreen === 'item' && !showAll && chosenItem && chosenItem.map((item, indx) =>
     {
       if ((indx > 0) && (indx -1 <= lastReadDayNumber))
         return (
           <ListItem
             key={'ListItemReadingsKey-'+indx}
             title={'Day ' + (indx)}
             label={item.Read.Verse}
             imageUrl={item.Read.Image}
             handleIconPressed ={indx -1 <= lastReadDayNumber ? ()=> onDayItem(item, (indx)) : null}
           />
          )
       }
     )
   }
            </ScrollView>

        </View>
        <TabMenu
          onSettings={this.props.onSettings}
          onHome={this.props.onHome}
          activeTabName={'Bible'}
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
