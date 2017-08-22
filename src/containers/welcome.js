import React, {Component} from 'react'
import {Welcome} from '../windows'

// events object
var events = require('../data/events') 
var locations = events

// ---- getting current position of user -----

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  //console.log('Your current position is:');
  //console.log(`Latitude : ${crd.latitude}`);
  //console.log(`Longitude: ${crd.longitude}`);
  //console.log(`More or less ${crd.accuracy} meters.`);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);

// calculate how far is from current position to event

function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2-lon1).toRad(); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

console.log(crd) 
/*
geoLoc: {
  longitude: churches[i].location.lng,
  latitude: churches[i].location.lat,
*/
locations.map((item)=> {
  console.log(item)
  console.log(distance(crd.longitude, crd.latitude, item.geoLoc.longitude, item.geoLoc.latitude))
  item.howFar = '12 miles'
})



export default class _Welcome extends Component {

  render() {
    console.log(locations)
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
            navigate('SessionItem', {locationSelected: locationSelected,  locations: locations})
            }}
        />
    )
  }
}



