import React, {Component} from 'react'
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

export default class _SessionItem extends Component {

  constructor(props){
    super(props)

    this.state = {
      allSessions: '',
      locationSelected: {},
    }
  }


  handleOnStartSession(navigate, locationSelected, locations, userData){
       navigate('UserProfile', { locationSelected: locationSelected, locations: locations, userData: userData })
  }

  handleOnSettings(navigate, locationSelected, locations, userData, from){
    const { params } = this.props.navigation.state

    if (params.cancelLabel){
      navigate('Settings', { locationSelected: locationSelected, locations: locations, userData: userData, from: 'SessionItemBrown', cancelLabel: true ,activeTabName: 'Settings'})
    } else {
      navigate('Settings', { locationSelected: locationSelected, locations: locations, userData: userData, from: 'SessionItemYellow', activeTabName: 'Settings' })
    }
  }

  handleOnHome(navigate, locationSelected, locations, userData, from){
    const { params } = this.props.navigation.state

    if (params.cancelLabel){
      navigate('UserProfile', { locationSelected: locationSelected, locations: locations, userData: userData, from: 'SessionItemBrown', activeTabName: 'Home'})
    } else {
      navigate('Welcome', {locations: locations, userData: userData, from: 'SessionItemYellow', activeTabName: 'Home'})
    }
  }

  handleOnBible(navigate, locationSelected, locations, userData, from){
    const { params } = this.props.navigation.state
    if (params.cancelLabel){
      navigate('HigherBibleReadings', { locationSelected: locationSelected, locations: locations, userData: userData, from: 'SessionItemBrown', activeTabName: 'Bible', loginStatus: 'loggedIn'})
    } else {
      navigate('HigherBibleReadings', {locations: locations, userData: userData, from: 'SessionItemYellow', activeTabName: 'Bible', loginStatus: 'loggedIn'})
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    return (
        <SessionItem 
          onHome={()=> this.handleOnHome(navigate, params.locationSelected, params.locations, params.userData)}
          onSettings={()=> this.handleOnSettings(navigate, params.locationSelected, params.locations, params.userData)}
          onBible={()=> this.handleOnBible(navigate, params.locationSelected, params.locations, params.userData)}
          myPosition={myPosition[0]}
          location={params.locationSelected}
          cancelLabel={params.cancelLabel}
          onStopSession={()=> navigate('FindSession', {locations: params.locations, userData: params.userData})}
          onStartSession={(location)=> {
              this.handleOnStartSession(navigate, location, params.locations, params.userData)
            }
          }
          activeTabName={''}
        />
    )
  }
}


