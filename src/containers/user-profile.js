import React, {Component} from 'react'
import {UserProfile} from '../windows'
import { connect } from 'react-redux';

import * as ACTIONS from '../actions/actions/actions';

class _UserProfile extends Component {


  handleOnSettings(navigate, locationSelected, from){
    navigate('Settings', { locationSelected: locationSelected, from: from})
  }

  handleOnBible(navigate, locationSelected, from){
    navigate('HigherBibleReadings', { locationSelected: locationSelected, from: from})
  }

  componentDidMount(){
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events                 // data from the store
    const userData = this.props.user                    // data from the store         
    const activeTabName = this.props.app.activeTabName  // data from the store

    console.log('UserProfile Container')
    console.log(params)
    console.log(this.props)
    
    return (
        <UserProfile
          locations={locations}
          onSettings={()=> this.handleOnSettings(navigate, params.locationSelected,  "UserProfile")}
          onBible={()=> this.handleOnBible(navigate, params.locationSelected,  "UserProfile")}
          userData={userData}
          locationSelected={params.locationSelected} 
          handleEditSession={(locationSelected)=> navigate('SessionItem', {locationSelected: locationSelected, cancelLabel: true, cancelLabel: true})}
          activeTabName={activeTabName}
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

export default connect(mapStateToProps)(_UserProfile);