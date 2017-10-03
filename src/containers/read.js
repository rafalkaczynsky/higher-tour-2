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
  navigate('HigherBibleReadings', {from: from})
}

handleOnSettings(navigate){
  this.props.dispatch( {type: 'SettingsInAnimation'})
  //navigate('Settings')
}

handleHome(navigate){
  const loginStatus = this.props.app.loginStatus  // data from the store

  if (loginStatus === 'loggedOut') {
    navigate('SignIn')
  } else if (loginStatus === 'loggedIn'){
      navigate('Welcome')
    } else {
        navigate('UserProfile')
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
        const progress = currentBibleReading.length / 
        console.log(bibleReading.lastReadDayNumber + '<' + currentReadingDayNumber )
        
        if (bibleReading.lastReadDayNumber < currentReadingDayNumber ) {
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


  //  const weekList = this.props.app.weekContainer
    
  
    
    console.log('Read Container')

    return (
        <Read 
          onSettings={()=> this.handleOnSettings(navigate)}
          onHome={()=> this.handleHome(navigate)}
          userData={userData}
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
