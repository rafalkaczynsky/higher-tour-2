import React, {Component} from 'react'
import {Welcome} from '../windows'
import geolib from 'geolib'

// events object
var events = require('../data/events') 
var locations = events

// ---- getting current position of user -----
var currentPosition

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  locations.map((item)=> {
   
    let distance = geolib.getDistance(
      crd,
      item.geoLoc,
    );
    distance = geolib.convertUnit('mi', distance, 1)

    console.log(distance)
    item.howFar = distance
  })
// console.log('Your current position is:');
// console.log(`Latitude : ${crd.latitude}`);
// console.log(`Longitude: ${crd.longitude}`);
// console.log(`More or less ${crd.accuracy} meters.`);
  function compareDistance(a, b){
    return a.howFar - b.howFar;
}

const x = locations.sort(compareDistance);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);

export default class _Welcome extends Component {
  constructor(props){
    super(props)

    this.state = {
      myLocation: {}
    }
  }

  render() {

    const { navigate } = this.props.navigation



    return (
        <Welcome 
          onSettings={()=> navigate('Settings')}
          onBible={()=> alert('onBible')}

          locations={locations}
          onMoreSession={()=> {
            navigate('FindSession', {locations: locations})}
          }
          onChurchPressed={(locationSelected)=> {
            navigate('SessionItem', {locationSelected: locationSelected,  locations: locations })
            }}
        />
    )
  }
}



