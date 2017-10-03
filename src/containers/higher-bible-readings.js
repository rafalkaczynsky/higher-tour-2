import React, {Component} from 'react'
import {HigherBibleReadings} from '../windows'
import { connect } from 'react-redux';
import * as firebase from 'firebase'


import * as ACTIONS from '../actions/actions/actions';

var readings = require('../data/readings') 

class _HigherBibleReadings extends Component {
  constructor(props){
    super(props)
    
    this.state = {
        loginStatus: 'loggedOut',
        buttonsStyle: [
          {
            textColor: 'brown',
            bgColor: 'transparent',
          },
          {
            textColor: 'white',
            bgColor: 'brown',           
          }
        ],
        currentScreen: 'list', //  or 'item', 'dayItem',
        chosenItem: null,
        chosenDayItem: false
    }
  }

  handleOnNew(){
    this.setState({
        
              buttonsStyle: [
                {
                  textColor: 'brown',
                  bgColor: 'transparent',
                },
                {
                  textColor: 'white',
                  bgColor: 'brown',           
                }]
            })
  }

  handleOnCompleted(){
    this.setState({
        buttonsStyle: [
          {
            textColor: 'white',
            bgColor: 'brown',           
          },
          {
            textColor: 'brown',
            bgColor: 'transparent',
          }
        ]
      })
  }

  handleOnItem(itemBibleReading, bibleReadingTitle){
    console.log('On Item clicked')
    console.log(bibleReadingTitle)

    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('item'))//SAVE_CURRENT_READING_ITEM_TITLE
    this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM_TITLE(bibleReadingTitle))
    this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM(itemBibleReading))

  }

  handleOnDayItem(itemDay, navigate, numberOfDay, from){
      const currentReadingDayNumber = this.props.app.currentReadingDayNumber
      const userDataFromLocal = this.props.user
      console.log(itemDay)
      this.props.dispatch(ACTIONS.UPDATE_CURRENT_BIBLE_READING_DAY_CONTENT(itemDay))
      //check redux store if the last Reading Number is bigger or not than current Clicked
      if (this.props.app.lastReadDayNumber < numberOfDay){
        this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_DAY_NUMBER(numberOfDay))
      } else {
        this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_DAY_NUMBER(this.props.app.lastReadDayNumber))
      }
     
      //navigate('Read', {from: from})
      this.props.dispatch({type: 'GoToReadLeftToRightAnimation'})
  }

  handleOnSettings(navigate, loginStatus, from,){
    this.props.dispatch( {type: 'SettingsInAnimation'})
    //navigate('Settings', {loginStatus: loginStatus, from: from})
  }

  handleOnSettingsLoggedInPlus(navigate, from){
    this.props.dispatch( {type: 'SettingsInAnimation'})
  }

  handleOnSettingsLoggedOut(navigate, route){
    this.props.dispatch( {type: 'SettingsInAnimation'})
  }
  handleonItemBackPressed(){
    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
  }


  handleOnHome(){
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const events = this.props.events                // data from the store 
    const userData = this.props.user                // data from the store
    const loginStatus = this.props.app.loginStatus  // data from the store

    if (loginStatus && loginStatus === 'loggedOut') {
      this.props.dispatch({ type: 'SignInAfterSettingsAnimation' })
      //navigate('SignIn')
    } else if (loginStatus && loginStatus === 'loggedInPlus') {
      this.props.dispatch({ type: 'UserProfileAfterSettingsAnimation' }) 
    } else { navigate('FindSession')}
  }

  
  componentWillMount(){
    const loginStatus = this.props.app.loginStatus      // data from the store
  }
  

  componentDidMount(){
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Bible'))
  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state

    const locations = this.props.events                                       // data from the store 
    const userData = this.props.user                                          // data from the store
    const loginStatus = this.props.app.loginStatus                            // data from the store
    const activeTabName = this.props.app.activeTabName                        // data from the store
    const currentBibleReading = this.props.currentBibleReading                // data from the store  
    const bibleReading = this.props.bibleReading                              // data from the store   
    const bibleReadingScreenStatus = this.props.app.bibleReadingScreenStatus  // data from the store  

    console.log('HigherBibleReadings Container')
    console.log(this.props.bibleReading)
    return (
        <HigherBibleReadings 
          readings={bibleReading}
          onSettings={()=> {
              if (loginStatus === 'loggedIn'){        
                this.handleOnSettings(navigate, 'HigherBibleReadings', 'Settings')
                } else if (loginStatus === 'loggedInPlus') {
                  this. handleOnSettingsLoggedInPlus(navigate,  'HigherBibleReadings', 'Settings')
                } else {
                  this.handleOnSettingsLoggedOut(navigate, 'Settings', '', 'loggedOut', 'Settings')
              }
            }
          }
          onHome={()=> this.handleOnHome()}  
          onItem={(item, bibleReadingTitle)=> this.handleOnItem(item, bibleReadingTitle)}
          onDayItem={(item, numberOfDay)=> this.handleOnDayItem(item, navigate,  numberOfDay, 'HigherBibleReadings')}
          buttonsStyle={this.state.buttonsStyle}
          locations={locations}
          onCompleted={()=> this.handleOnCompleted()}
          onNew={()=> this.handleOnNew()}
          onItemBackPressed={()=> this.handleonItemBackPressed()}
          lastReadDayNumber={this.props.app.lastReadDayNumber}
          currentScreen={bibleReadingScreenStatus}
          chosenItem={currentBibleReading}
          chosenDayItem={this.state.chosenDayItem}
          activeTabName={activeTabName}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      app: state.app,
      currentBibleReading: state.currentBibleReading,
      bibleReadingScreenStatus: state.bibleReadingScreenStatus,
      bibleReading: state.bibleReading
  });
}

export default connect(mapStateToProps)(_HigherBibleReadings);