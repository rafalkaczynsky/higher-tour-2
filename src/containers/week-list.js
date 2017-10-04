import React, {Component} from 'react'
import geolib from 'geolib'
import { connect } from 'react-redux';
import * as firebase from 'firebase'

import {WeekList} from '../windows'
import * as ACTIONS from '../actions/actions/actions';

class _WeekList extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
}

handleOnBible(navigate, from){
  this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
  this.props.dispatch({ type: 'BibleAnimation' }) 
  //navigate('HigherBibleReadings', {from: from})
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

}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    
    console.log('Week Container')

    return (
        <WeekList 
          onSettings={()=> this.handleOnSettings(navigate)}
          onHome={()=> this.handleHome(navigate)}
          onWeekBackPressed={()=> this.props.dispatch({ type: 'GoToUserProfileLeftToRightAnimation' })}
          week={this.props.app.week}
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
