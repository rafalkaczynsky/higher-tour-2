import React, {Component} from 'react'
import {UserProfile} from '../windows'
import { connect } from 'react-redux';

class _UserProfile extends Component {


  handleOnSettings(navigate, locationSelected, from, activeTabName){
    navigate('Settings', { locationSelected: locationSelected, from: from, activeTabName: activeTabName, loginStatus: 'loggedInPlus' })
  }

  handleOnBible(navigate, locationSelected, from, activeTabName){
    navigate('HigherBibleReadings', { locationSelected: locationSelected, from: from, activeTabName: activeTabName, loginStatus: 'loggedInPlus' })
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events
    const userData = this.props.user
 
    console.log('UserProfile Container')
    console.log(params)
    console.log(this.props)
    
    return (
        <UserProfile
          locations={locations}
          onSettings={()=> this.handleOnSettings(navigate, params.locationSelected,  "UserProfile", 'Settings')}
          onBible={()=> this.handleOnBible(navigate, params.locationSelected,  "UserProfile", 'Bible')}
          userData={userData}
          locationSelected={params.locationSelected} 
          handleEditSession={(locationSelected)=> navigate('SessionItem', {locationSelected: locationSelected, cancelLabel: true, cancelLabel: true,  loginStatus: 'loggedInPlus' })}
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