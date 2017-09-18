import React, {Component} from 'react'
import geolib from 'geolib'
import { connect } from 'react-redux';

import {Read} from '../windows'
import * as ACTIONS from '../actions/actions/actions';



class _Read extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

handleOnBible(navigate, from, activeTabName){
  navigate('HigherBibleReadings', {from: from, activeTabName: activeTabName})
}

handleOnSettings(navigate, route, activeTabName){
  const { params } = this.props.navigation.state
  const loginStatus = this.props.app.loginStatus  // data from the store

  if (loginStatus === 'loggedOut') {
     navigate('Settings', {activeTabName: 'Settings'})
  } else if (params.loginStatus === 'loggedIn ') {
    navigate('Settings', {activeTabName: 'Settings'})
  } else {
    navigate('Settings', {locationSelected: params.locationSelected, activeTabName: 'Settings'})
  }
}

handleHome(navigate, activeTabName, locationSelected){
  const loginStatus = this.props.app.loginStatus  // data from the store

  if (loginStatus === 'loggedOut') {
    navigate('SignIn', {activeTabName: activeTabName})
  } else if (loginStatus === 'loggedIn'){
      navigate('Welcome', {activeTabName: activeTabName})
    } else {
        navigate('UserProfile', {activeTabName: activeTabName, locationSelected: locationSelected})
      }
}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events             // data from the store
    const userData = this.props.user                // data from the store
    const loginStatus = this.props.app.loginStatus  // data from the store
 
    console.log('Read Container')
    console.log(params)
    console.log(this.props)
    return (
        <Read 
          onSettings={()=> this.handleOnSettings(navigate, 'Settings', 'Settings')}
          onHome={()=> this.handleHome(navigate, 'Home',params.locationSelected)}
          userData={userData}
          locations={locations}
          itemDay={params.itemDay}
          activeTabName={'Bible'}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      app: state.app,

  });
}

export default connect(mapStateToProps)(_Read);
