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
  navigate('Settings')
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
  
  const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ userData.uid +'/bibleReadings/'+ currentBibleReadingTitle +'/');

  firebaseDataAppUsers.update({
    lastReadDayNumber : currentReadingDayNumber,
    lastReadTimeStamp: new Date().getTime()
  })
  
}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const userData = this.props.user                                        // data from the store
    const loginStatus = this.props.app.loginStatus                          // data from the store
    const currentDayContent = this.props.app.currentDayContent              // data from the store
    const currentReadingDayNumber = this.props.app.currentReadingDayNumber  // data from the store
  //  const weekList = this.props.app.weekContainer
    
    const weekParam = this.params ? this.params.week : null
    
    console.log('Read Container')
    console.log(params.week)
    return (
        <Read 
          onSettings={()=> this.handleOnSettings(navigate)}
          onHome={()=> this.handleHome(navigate)}
          userData={userData}
          onItemBackPressed={()=> navigate('UserProfile')}
          onItemNextPressed={()=> navigate('Think')}
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
