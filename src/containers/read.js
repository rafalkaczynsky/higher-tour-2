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

handleOnBible(navigate, from, activeTabName){
  navigate('HigherBibleReadings', {from: from, activeTabName: activeTabName, loginStatus: 'loggedIn' })
}

handleOnSettings(navigate, route, activeTabName, loginStatus){
  const { params } = this.props.navigation.state

  if (params.loginStatus === 'loggedOut') {
     navigate('Settings', {activeTabName: 'Settings', loginStatus: params.loginStatus})
  } else if (params.loginStatus === 'loggedIn ') {
    navigate('Settings', {activeTabName: 'Settings', loginStatus: params.loginStatus})
  } else {
    navigate('Settings', {locationSelected: params.locationSelected, activeTabName: 'Settings', loginStatus: params.loginStatus})
  }
}

handleHome(navigate, activeTabName, loginStatus, locationSelected){

    if (loginStatus === 'loggedOut') {
      navigate('SignIn', {activeTabName: activeTabName, loginStatus: loginStatus})
    } else if (loginStatus === 'loggedIn'){
      navigate('Welcome', {activeTabName: activeTabName, loginStatus: loginStatus})
    } else {
      navigate('UserProfile', {activeTabName: activeTabName, loginStatus: loginStatus, locationSelected: locationSelected})
    }
}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events     // data from the store
    const userData = this.props.user        // data from the store
 
    console.log('Read Container')
    console.log(params)
    console.log(this.props)
    return (
        <Read 
          onSettings={()=> this.handleOnSettings(navigate, 'Settings', 'Settings', 'loggedOut')}
          onHome={()=> this.handleHome(navigate, 'Home', params.loginStatus, params.locationSelected)}
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
