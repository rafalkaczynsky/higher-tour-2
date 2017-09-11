import React, {Component} from 'react'
import {Read} from '../windows'
import geolib from 'geolib'
import * as firebase from 'firebase'



export default class _Read extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

handleOnBible(navigate, locations, userData, from, activeTabName){
  navigate('HigherBibleReadings', { locations: locations, userData: userData, from: from, activeTabName: activeTabName, loginStatus: 'loggedIn' })
}

handleOnSettings(navigate, route, userData, activeTabName, loginStatus){
  const { params } = this.props.navigation.state

  if (params.loginStatus === 'loggedOut') {
     navigate('Settings', {userData: '', activeTabName: 'Settings', loginStatus: params.loginStatus})
  } else if (params.loginStatus === 'loggedIn ') {
    navigate('Settings', {userData: params.userData, locations: params.locations, activeTabName: 'Settings', loginStatus: params.loginStatus})
  } else {
    navigate('Settings', {userData: params.userData, locations: params.locations, locationSelected: params.locationSelected, activeTabName: 'Settings', loginStatus: params.loginStatus})
  }
}

handleHome(navigate, activeTabName, userData, loginStatus, locations, locationSelected){
    const { params } = this.props.navigation.state

    if (params.loginStatus === 'loggedOut') {
      navigate('SignIn', {activeTabName: activeTabName, loginStatus: loginStatus})
    } else if (params.loginStatus === 'loggedIn'){
      navigate('Welcome', {activeTabName: activeTabName, userData: userData, loginStatus: loginStatus})
    } else {
      navigate('UserProfile', {activeTabName: activeTabName, userData: userData, loginStatus: loginStatus, locations: locations, locationSelected: locationSelected})
    }
}


  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
 
    console.log('Read Container')
    console.log(params)
    return (
        <Read 
          onSettings={()=> this.handleOnSettings(navigate, 'Settings', params.userData, 'Settings', 'loggedOut')}
          onHome={()=> this.handleHome(navigate, 'Home', params.userData, params.loginStatus, params.locations, params.locationSelected)}
          userData={params.userData}
          locations={params.locations}
          itemDay={params.itemDay}
          activeTabName={'Bible'}
        />
    )
  }
}
