import React, {Component} from 'react'
import {UserProfile} from '../windows'

export default class _UserProfile extends Component {

  handleOnSettings(navigate, route, userData, loginStatus){
    navigate(route, {userData: userData, loginStatus: loginStatus})
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    return (
        <UserProfile
          locations={params.locations}
          onSettings={()=> navigate('Settings', {userData: params.userData})}
          userData={params.userData}
          onBible={() =>  alert('Bible Clicked! Work in progress.')}
          locationSelected={params.locationSelected} 
          handleEditSession={(locationSelected, locations )=> navigate('SessionItem', {locationSelected: locationSelected, cancelLabel: true, locations: locations})}
        />
    )
  }
}
