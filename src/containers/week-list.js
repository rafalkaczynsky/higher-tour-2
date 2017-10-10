import React, {Component} from 'react'
import geolib from 'geolib'
import { connect } from 'react-redux';
import * as firebase from 'firebase'

import {WeekList} from '../windows'
import * as ACTIONS from '../actions/actions/actions';

class _WeekList extends Component {
  constructor(props){
    super(props)
}

handleOnBible(navigate, from){
  this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
  this.props.dispatch({ type: 'BibleAnimation' }) 

}

handleOnSettings(navigate){
  this.props.dispatch( {type: 'SettingsInAnimation'})  
}

handleHome(navigate){
  const loginStatus = this.props.app.loginStatus 
  
  if (loginStatus && loginStatus === 'loggedOut') {
    this.props.dispatch({type: 'SignInOnHomeAnimation'})
  } else if (loginStatus && loginStatus === 'loggedInPlus') {
    this.props.dispatch({type: 'UserProfileOnHomeAnimation'}) 
  } else { 
    this.props.dispatch({type: 'GotoWelcomeAnimation'})
  }
}

handleOnGoBack(){
  this.props.dispatch({type: 'GoToUserProfileLeftToRightAnimation'})
}

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    
    return (
        <WeekList 
          onSettings={()=> this.handleOnSettings()}
          onHome={()=> this.handleHome()}
          onWeekBackPressed={()=> this.props.dispatch({type: 'GoToUserProfileLeftToRightAnimation'})}
          week={this.props.app.week}
          onGoBack={()=> this.handleOnGoBack()}
          activeTabName={''}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      app: state.app,
  });
}

export default connect(mapStateToProps)(_WeekList);
