import React, {Component} from 'react'
import {HigherBibleReadings} from '../windows'
import { connect } from 'react-redux';
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

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
        chosenDayItem: false,
        showAll: false,
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

  handleOnNew(){
    this.setState({
        showAll: false,
        buttonsStyle: [
          {
            textColor: 'white',
            bgColor: 'brown',
          },
          {
            textColor: 'brown',
            bgColor: 'transparent',
          }]
        })
  }

  handleOnAll(){
    this.setState({
        showAll: true,
        buttonsStyle: [
          {
            textColor: 'white',
            bgColor: 'brown',
          },
          {
            textColor: 'transparent',
            bgColor: 'white',
          }]
      })
  }

  handleOnAvailable(){
    this.setState({
      showAll: false,
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

  handleOnGoBack(){
    this.props.navigation.dispatch(NavigationActions.back())
  }

  handleOnItem(itemBibleReading, bibleReadingTitle){


    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('item'))//SAVE_CURRENT_READING_ITEM_TITLE
    this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM_TITLE(bibleReadingTitle))
    this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM(itemBibleReading))

  }

  handleOnDayItem(itemDay, navigate, numberOfDay, from){
      const currentReadingDayNumber = this.props.app.currentReadingDayNumber
      const userDataFromLocal = this.props.user

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

  handleOnSettings(){
    this.props.dispatch( {type: 'SettingsInAnimation'})
  }

  handleonItemBackPressed(){
    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
  }


  handleOnHome(){

    const resetActionSignIn = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn'})
      ]
    })

    const resetActionUserProfile = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'UserProfile'})
      ]
    })

    const resetActionWelcome = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Welcome'})
      ]
    })


    const loginStatus = this.props.app.loginStatus  // data from the store

    if (loginStatus && loginStatus === 'loggedOut') {
      //this.props.dispatch({type: 'SignInOnHomeAnimation'})
      this.props.dispatch(resetActionSignIn)
    } else if (loginStatus && loginStatus === 'loggedInPlus') {
     // this.props.dispatch({type: 'UserProfileOnHomeAnimation'})
     this.props.dispatch(resetActionUserProfile)
    } else {
     // this.props.dispatch({type: 'GotoWelcomeAnimation'})
     this.props.dispatch(resetActionWelcome)
    }
  }


  componentWillMount(){
    const loginStatus = this.props.app.loginStatus                            // data from the store
    const currentBibleReadingTitle = this.props.app.currentBibleReadingTitle  // data from the store
    const userData = this.props.user                                          // data from the store
    const screenStatus = this.props.app.bibleReadingScreenStatus              // data from the store


  if ((screenStatus === 'item')&& (userData)){
    firebase.database().ref('appUsers/'+ userData.uid +'/bibleReadings/'+ currentBibleReadingTitle +'/').once("value", snapshot => {
      const bibleReading = snapshot.val();
      const lastReadDayNumber = bibleReading.lastReadDayNumber
      this.props.dispatch(ACTIONS.SAVE_CURRENT_LAST_READ_DAY_NUMBER(lastReadDayNumber))
    })
  }

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

    return (
        <HigherBibleReadings
          readings={bibleReading}
          onSettings={()=> this.handleOnSettings()}
          onHome={()=> this.handleOnHome()}
          onItem={(item, bibleReadingTitle)=> this.handleOnItem(item, bibleReadingTitle)}
          onDayItem={(item, numberOfDay)=> this.handleOnDayItem(item, navigate,  numberOfDay, 'HigherBibleReadings')}
          buttonsStyle={this.state.buttonsStyle}
          locations={locations}
          onCompleted={()=> this.handleOnCompleted()}
          onNew={()=> this.handleOnNew()}
          onAll={()=> this.handleOnAll()}
          onAvailable={()=> this.handleOnAvailable()}
          showAll={this.state.showAll}
          onGoBack={()=> this.handleOnGoBack()}
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
