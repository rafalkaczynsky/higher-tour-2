import React, {Component} from 'react'
import { connect } from 'react-redux';

import {SessionItem} from '../windows'

var myPosition = []

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  myPosition.push(crd)
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);

class _SessionItem extends Component {

  constructor(props){
    super(props)

    this.state = {
      allSessions: '',
      locationSelected: {},
    }
  }


  handleOnStartSession(navigate, locationSelected,){
       navigate('UserProfile', { locationSelected: locationSelected})
  }

  handleOnSettings(navigate, locationSelected, from){
    const { params } = this.props.navigation.state

    if (params.cancelLabel){
      navigate('Settings', { locationSelected: locationSelected, from: 'SessionItemBrown', cancelLabel: true ,activeTabName: 'Settings', loginStatus: 'loggedInPlus'})
    } else {
      navigate('Settings', { locationSelected: locationSelected, from: 'SessionItemYellow', activeTabName: 'Settings' })
    }
  }

  handleOnHome(navigate, locationSelected, from){
    const { params } = this.props.navigation.state

    if (params.cancelLabel){
      navigate('UserProfile', { locationSelected: locationSelected,  from: 'SessionItemBrown', activeTabName: 'Home', loginStatus: 'loggedInPlus'})
    } else {
      navigate('Welcome', {from: 'SessionItemYellow', activeTabName: 'Home'})
    }
  }

  handleOnBible(navigate, locationSelected,  from){
    const { params } = this.props.navigation.state
    if (params.cancelLabel){
      navigate('HigherBibleReadings', {locationSelected: locationSelected, from: 'SessionItemBrown', activeTabName: 'Bible', loginStatus: 'loggedInPlus'})
    } else {
      navigate('HigherBibleReadings', {from: 'SessionItemYellow', activeTabName: 'Bible', loginStatus: 'loggedIn'})
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events   // data from the store
    const userData = this.props.user      // data from the store


    console.log('SessionItem Container')
    console.log(params)
    console.log(this.props)
    return (
        <SessionItem 
          onHome={()=> this.handleOnHome(navigate, params.locationSelected)}
          onSettings={()=> this.handleOnSettings(navigate, params.locationSelected,)}
          onBible={()=> this.handleOnBible(navigate, params.locationSelected)}
          myPosition={myPosition[0]}
          location={params.locationSelected}
          cancelLabel={params.cancelLabel}
          onStopSession={()=> navigate('FindSession')}
          onStartSession={(location)=> {this.handleOnStartSession(navigate, location)}
          }
          activeTabName={''}
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

export default connect(mapStateToProps)(_SessionItem);

