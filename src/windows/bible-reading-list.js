import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import * as ACTIONS from '../actions/actions/actions';
import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

class BibleReadingList extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      lastReadDayNumber: undefined, 
      isMounted: false,
    }
  }


  componentDidMount(){
    this.setState({isMounted: true})
  }
    render(){
      console.log('BibleReadingList Window')
      console.log(readings)
      const { onCompleted, onNew, onItem, buttonsStyle, readings, readingsNames} = this.props

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
                  text={'New'}
                  bgColor={buttonsStyle[1].bgColor}  
                  textColor={buttonsStyle[1].textColor}
                  buttonStyle={{margin: 10 , marginRight: 0, width:'40%', height: 30}}
                  onPress={onNew}
                /> 
                <Button 
                  type="default"
                  text={'Completed'}
                  bgColor={buttonsStyle[0].bgColor}  
                  textColor={buttonsStyle[0].textColor}
                  buttonStyle={{margin: 10, marginLeft: 0, width: '40%', height: 30}}
                  onPress={onCompleted}
                /> 
            </View>

            <ScrollView style={{width: '100%'}}>
            {readings.map((item, indx)=> {
                let title= readingsNames[indx][0]
                return(
                    <TouchableOpacity 
                        onPress={()=> {onItem(item)}}
                        key={'ListItemReadingsKey-'+indx}
                    >
                        <ListItem 
                            title={title}
                            label={item.length + ' days'}
                        />
                    </TouchableOpacity>)
                }
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

function mapStateToProps(state){
  return({
      user: state.user,
      app: state.app,
      currentBibleReading: state.currentBibleReading,
      bibleReadingScreenStatus: state.bibleReadingScreenStatus,
      
  });
}

export default connect(mapStateToProps)(BibleReadingList);