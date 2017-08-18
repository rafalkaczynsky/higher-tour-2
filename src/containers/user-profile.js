import React, {Component} from 'react'
import {UserProfile} from '../windows'

export default class _UserProfile extends Component {

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    return (
        <UserProfile
          locations={params.locations}
          onSettings={()=> navigate('Settings')}
          onBible={()=> alert('on Bible')}
          locationSelected={params.locationSelected} 
          handleEditSession={(locationSelected, locations )=> navigate('SessionItem', {locationSelected: locationSelected, cancelLabel: true, locations: locations})}
        />
    )
  }
}
