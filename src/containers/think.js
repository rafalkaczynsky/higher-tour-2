import React, {Component} from 'react'
import geolib from 'geolib'
import { connect } from 'react-redux';
import * as firebase from 'firebase'

import {Think} from '../windows'
import * as ACTIONS from '../actions/actions/actions';



class _Think extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

handleOnBible(navigate, from){
  navigate('HigherBibleReadings', {from: from})
}

handleOnSettings(navigate, route){
  const { params } = this.props.navigation.state
  const loginStatus = this.props.app.loginStatus  // data from the store

  if (loginStatus === 'loggedOut') {
     navigate('Settings')
  } else if (loginStatus === 'loggedIn ') {
    navigate('Settings')
  } else {
    navigate('Settings')
  }
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

}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state


    const loginStatus = this.props.app.loginStatus                          // data from the store
    const currentDayContent = this.props.app.currentDayContent              // data from the store
    const currentReadingDayNumber = this.props.app.currentReadingDayNumber  // data from the store
 
    console.log('Think Container')

    return (
        <Think
          onSettings={()=> this.handleOnSettings(navigate)}
          onHome={()=> this.handleHome(navigate)}
          onItemBackPressed={()=> navigate('Read')}
          onItemNextPressed={()=> navigate('Respond')}
          currentReadingDayNumber={currentReadingDayNumber}
          itemDay={currentDayContent}
          activeTabName={'Bible'}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      app: state.app,
      currentBibleReading: state.currentBibleReading,
      currentReadingDayNumber: state.currentReadingDayNumber,

  });
}

export default connect(mapStateToProps)(_Think);
