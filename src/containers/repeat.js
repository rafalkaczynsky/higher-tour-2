import React, {Component} from 'react'
import geolib from 'geolib'
import { connect } from 'react-redux';
import * as firebase from 'firebase'

import {Repeat} from '../windows'
import * as ACTIONS from '../actions/actions/actions';



class _Repeat extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

handleOnBible(navigate, from){
  this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
  this.props.dispatch({ type: 'BibleAnimation' }) 
}

handleOnSettings(navigate, route){
  this.props.dispatch( {type: 'SettingsInAnimation'})
}

handleHome(){
  const loginStatus = this.props.app.loginStatus  // data from the store
  
      if (loginStatus && loginStatus === 'loggedOut') {
        this.props.dispatch({type: 'SignInOnHomeAnimation'})
      } else if (loginStatus && loginStatus === 'loggedInPlus') {
        this.props.dispatch({type: 'UserProfileOnHomeAnimation'}) 
      } else { 
        this.props.dispatch({type: 'GotoWelcomeAnimation'})
      }
}

handleOnGoBack(navigate){
  const loginStatus = this.props.app.loginStatus  // data from the store
  
    if (loginStatus === 'loggedOut') {
      this.props.dispatch({type: 'SignInAfterSettingsAnimation'})
    } else if (loginStatus === 'loggedIn'){
      this.props.dispatch({type: 'GotoWelcomeAnimation'})
      } else {
          this.props.dispatch({type: 'GoToUserProfileLeftToRightAnimation'})
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

}

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const loginStatus = this.props.app.loginStatus                          // data from the store
    const currentDayContent = this.props.app.currentDayContent              // data from the store
    const currentReadingDayNumber = this.props.app.currentReadingDayNumber  // data from the store

    return (
        <Repeat
          onSettings={()=> this.handleOnSettings()}
          onHome={()=> this.handleHome()}
          onGoBack={()=> this.handleOnGoBack()}
          loginStatus={loginStatus}
          onItemBackPressed={()=>    this.props.navigation.goBack(null)}
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

export default connect(mapStateToProps)(_Repeat);
