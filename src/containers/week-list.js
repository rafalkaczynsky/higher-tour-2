import React, {Component} from 'react'
import geolib from 'geolib'
import { connect } from 'react-redux';
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

import {WeekList} from '../windows'
import * as ACTIONS from '../actions/actions/actions';

class _WeekList extends Component {
  constructor(props){
    super(props)
}

handleOnBible(navigate){
  this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
  this.props.dispatch({ type: 'BibleAnimation' }) 
}

handleOnSettings(navigate){
  this.props.dispatch( {type: 'SettingsInAnimation'})  
}

handleOnHome(navigate){
  
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

handleOnGoBack(){
  //this.props.dispatch({type: 'GoToUserProfileLeftToRightAnimation'})
  this.props.navigation.dispatch(NavigationActions.back())
}



  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    console.log('week')
    console.log(this.props.app.week)
    return (
        <WeekList 
          onSettings={()=> this.handleOnSettings()}
          onHome={()=> this.handleOnHome()}
          onBible={()=> this.handleOnBible(navigate)}
          onWeekBackPressed={()=> this.props.dispatch({type: 'GoToUserProfileLeftToRightAnimation'})}
          week={this.props.app.week}
          weekDate={this.props.app.weekDate}
          selectedEvent={this.props.eventSelected}
          onGoBack={()=> this.handleOnGoBack()}
          onNextPressed={()=>this.props.dispatch({type: 'GoToQuestionsAnimation'})}
          activeTabName={''}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      app: state.app,
      eventSelected: state.eventSelected
      
  });
}

export default connect(mapStateToProps)(_WeekList);
