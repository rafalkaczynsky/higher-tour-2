import React, {Component} from 'react'
import {UserProfile} from '../windows'
import { connect } from 'react-redux';

class _UserProfile extends Component {


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
    console.log(this.props)

    const locations = this.props.events
    const userData = this.props.user
 
    return (
        <UserProfile
          locations={locations}
          onSettings={()=> this.handleOnSettings(navigate, params.locationSelected, locations, userData, "UserProfile", 'Settings')}
          onBible={()=> this.handleOnBible(navigate, params.locationSelected, locations, userData, "UserProfile", 'Bible')}
          userData={userData}
          locationSelected={params.locationSelected} 
          handleEditSession={(locationSelected, locations, userData )=> navigate('SessionItem', {locationSelected: locationSelected, cancelLabel: true, locations: locations, userData: userData, cancelLabel: true,  loginStatus: 'loggedInPlus' })}
          activeTabName={'Home'}
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

export default connect(mapStateToProps)(_UserProfile);