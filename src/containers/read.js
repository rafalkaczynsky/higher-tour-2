import React, {Component} from 'react'
import geolib from 'geolib'
import { connect } from 'react-redux';
import * as firebase from 'firebase'

import {Read} from '../windows'
import * as ACTIONS from '../actions/actions/actions';

class _Read extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
}

handleOnBible(navigate, from){
  this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
  this.props.dispatch({ type: 'BibleAnimation' }) 
}

handleOnSettings(navigate){
  this.props.dispatch( {type: 'SettingsInAnimation'})
  //navigate('Settings')
}

handleHome(navigate){
  const loginStatus = this.props.app.loginStatus  // data from the store
  
      if (loginStatus && loginStatus === 'loggedOut') {
        this.props.dispatch({type: 'SignInOnHomeAnimation'})
      } else if (loginStatus && loginStatus === 'loggedInPlus') {
        this.props.dispatch({type: 'UserProfileOnHomeAnimation'}) 
      } else { 
        this.props.dispatch({type: 'GotoWelcomeAnimation'})
      }
}

componentDidMount(){

  //wait 5 seconds after that 
  //update appUser lastReadDayNumber and timesta,[ ]
  const userData = this.props.user          
  const currentBibleReading = this.props.currentBibleReading
  const currentReadingDayNumber = this.props.app.currentReadingDayNumber
  const currentBibleReadingTitle = this.props.app.currentBibleReadingTitle                    
  const loginStatus = this.props.app.loginStatus
  
  if (loginStatus!=='loggedOut') {

    const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ userData.uid +'/bibleReadings/'+ currentBibleReadingTitle +'/');    
      firebase.database().ref('appUsers/'+ userData.uid +'/bibleReadings/'+ currentBibleReadingTitle +'/').once("value", snapshot => {
        const bibleReading = snapshot.val();

        if (bibleReading !== null){       
          if (bibleReading.lastReadDayNumber < currentReadingDayNumber ) {
            firebaseDataAppUsers.update({
              lastReadTimeStamp: new Date().getTime(),
              lastReadDayNumber : currentReadingDayNumber,
              progress: parseInt((currentReadingDayNumber/ currentBibleReading.length) *100 )
            })
          }  
        } else {
          firebaseDataAppUsers.update({
            lastReadTimeStamp: new Date().getTime(),
            lastReadDayNumber : currentReadingDayNumber,
            progress: parseInt((currentReadingDayNumber/ currentBibleReading.length) *100 )
          })
        }
 
      })
  }

}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const userData = this.props.user                                        // data from the store
    const loginStatus = this.props.app.loginStatus                          // data from the store
    const currentDayContent = this.props.app.currentDayContent              // data from the store
    const currentReadingDayNumber = this.props.app.currentReadingDayNumber  // data from the store

    return (
        <Read 
          onSettings={()=> this.handleOnSettings(navigate)}
          onHome={()=> this.handleHome(navigate)}
          userData={userData}
          goToHome={()=> null}
          onItemBackPressed={()=>this.props.dispatch({type: 'GoToHigherRightToLeftAnimation'})}
          onItemNextPressed={()=>this.props.dispatch({type: 'GoToThinkLeftToRightAnimation'})}
          currentReadingDayNumber={currentReadingDayNumber}
          itemDay={currentDayContent}
          activeTabName={'Bible'}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      app: state.app,
      currentBibleReading: state.currentBibleReading,
      currentReadingDayNumber: state.currentReadingDayNumber,

  });
}

export default connect(mapStateToProps)(_Read);
