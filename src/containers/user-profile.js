import React, {Component} from 'react'
import {UserProfile} from '../windows'

export default class _UserProfile extends Component {


  handleOnSettings(navigate, locationSelected, locations, userData, from, activeTabName){
    navigate('Settings', { locationSelected: locationSelected, locations: locations, userData: userData, from: from, activeTabName: activeTabName, loginStatus: 'loggedInPlus' })
  }

  handleOnBible(navigate, locationSelected, locations, userData, from, activeTabName){
    navigate('HigherBibleReadings', { locationSelected: locationSelected, locations: locations, userData: userData, from: from, activeTabName: activeTabName, loginStatus: 'loggedInPlus' })
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    console.log('UserProfile Container')
    console.log(params)
    return (
        <UserProfile
          locations={params.locations}
          onSettings={()=> this.handleOnSettings(navigate, params.locationSelected, params.locations, params.userData, "UserProfile", 'Settings')}
          onBible={()=> this.handleOnBible(navigate, params.locationSelected, params.locations, params.userData, "UserProfile", 'Bible')}
          userData={params.userData}
          locationSelected={params.locationSelected} 
          handleEditSession={(locationSelected, locations, userData )=> navigate('SessionItem', {locationSelected: locationSelected, cancelLabel: true, locations: locations, userData: userData, cancelLabel: true,  loginStatus: 'loggedInPlus' })}
          activeTabName={'Home'}
        />
    )
  }
}
