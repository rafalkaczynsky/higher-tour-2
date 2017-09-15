import React, {Component} from 'react'
import geolib from 'geolib'
import { connect } from 'react-redux';

import {Read} from '../windows'




class _Read extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

handleOnBible(navigate, locations, userData, from, activeTabName){
  navigate('HigherBibleReadings', { locations: locations, userData: userData, from: from, activeTabName: activeTabName, loginStatus: 'loggedIn' })
}

handleOnSettings(navigate, route, activeTabName, loginStatus, locations, userData){
  const { params } = this.props.navigation.state

  if (params.loginStatus === 'loggedOut') {
     navigate('Settings', {userData: '', activeTabName: 'Settings', loginStatus: params.loginStatus})
  } else if (params.loginStatus === 'loggedIn ') {
    navigate('Settings', {userData: userData, locations: locations, activeTabName: 'Settings', loginStatus: params.loginStatus})
  } else {
    navigate('Settings', {userData: userData, locations: locations, locationSelected: params.locationSelected, activeTabName: 'Settings', loginStatus: params.loginStatus})
  }
}

handleHome(navigate, activeTabName, userData, loginStatus, locations, locationSelected){

    if (loginStatus === 'loggedOut') {
      navigate('SignIn', {activeTabName: activeTabName, loginStatus: loginStatus})
    } else if (loginStatus === 'loggedIn'){
      navigate('Welcome', {activeTabName: activeTabName, userData: userData, loginStatus: loginStatus})
    } else {
      navigate('UserProfile', {activeTabName: activeTabName, userData: userData, loginStatus: loginStatus, locations: locations, locationSelected: locationSelected})
    }
}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events     // data from the store
    const userData = this.props.user        // data from the store
 
    console.log('Read Container')
    console.log(params)
    return (
        <Read 
          onSettings={()=> this.handleOnSettings(navigate, 'Settings', 'Settings', 'loggedOut', locations, userData)}
          onHome={()=> this.handleHome(navigate, 'Home', userData, params.loginStatus, locations, params.locationSelected)}
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
  });
}

export default connect(mapStateToProps)(_Read);
