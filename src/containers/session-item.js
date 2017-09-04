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
    }
  }

  handleOnSettings(navigate, route, userData, loginStatus){
    navigate(route, {userData: userData, loginStatus: loginStatus})
  }

  handleOnStartSession(navigate, locationSelected, locations, userData){
       navigate('UserProfile', { locationSelected: locationSelected, locations: locations, userData: userData })
  }


  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state


    return (
        <SessionItem 
          onSettings={()=> navigate('Settings', {userData: params.userData})}
          onBible={() =>  alert('Bible Clicked! Work in progress.')}
          myPosition={myPosition[0]}
          location={params.locationSelected}
          cancelLabel={params.cancelLabel}
          onStopSession={()=> navigate('FindSession', {locations: params.locations, userData: params.userData})}
          onStartSession={(location)=> this.handleOnStartSession(navigate, location, params.locations, params.userData)}
        />
    )
  }
}


