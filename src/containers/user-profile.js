import React, {Component} from 'react'
import {UserProfile} from '../windows'

export default class _UserProfile extends Component {


  handleOnSettings(navigate, locationSelected, locations, userData, from, activeTabName){
    navigate('Settings', { locationSelected: locationSelected, locations: locations, userData: userData, from: from, activeTabName: activeTabName })
 }

 handleOnBible(navigate, locationSelected, locations, userData, from, activeTabName){
  navigate('HigherBibleReadings', { locationSelected: locationSelected, locations: locations, userData: userData, from: from, activeTabName: activeTabName, loginStatus: 'loggedIn' })
}

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    return (
        <UserProfile
          locations={params.locations}
          onSettings={()=> this.handleOnSettings(navigate, params.locationSelected, params.locations, params.userData, "UserProfile", 'Settings')}
          onBible={()=> this.handleOnBible(navigate, params.locationSelected, params.locations, params.userData, "UserProfile", 'Bible')}
          userData={params.userData}
          onBible={() =>  alert('Bible Clicked! Work in progress.')}
          locationSelected={params.locationSelected} 
          handleEditSession={(locationSelected, locations, userData )=> navigate('SessionItem', {locationSelected: locationSelected, cancelLabel: true, locations: locations, userData: userData, cancelLabel: true})}
          activeTabName={'Home'}
        />
    )
  }
}
