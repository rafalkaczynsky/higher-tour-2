import React, {Component} from 'react'
import {Welcome} from '../windows'
import geolib from 'geolib'
import * as firebase from 'firebase'


// events object
var events = require('../data/events') 

var locations = events
var Events
//var locations
//var dataBase
// ---- getting current position of user -----
//var locations = Object.keys(Events).map(function (key) { return Events[key]; }); //transform js Object to Array 
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
 console.log('Your current position is:');
 console.log(`Latitude : ${crd.latitude}`);
 console.log(`Longitude: ${crd.longitude}`);
 console.log(`More or less ${crd.accuracy} meters.`);
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
/*
  async getData(logResults){
    var ref = firebase.database().ref();
    ref.on('value', function(snapshot) {
          dataBase = snapshot.val()
          logResults(dataBase)
      });
   }

   logResults(dataBase){
     Events = dataBase.events
     console.log(Events)
   }

   componentWillMount(){

    this.getData(this.logResults)

    console.log(Events)
    console.log(locations)

    var locations = Object.keys(Events).map(function (key) { return Events[key]; }); //transform js Object to Array 
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
     console.log('Your current position is:');
     console.log(`Latitude : ${crd.latitude}`);
     console.log(`Longitude: ${crd.longitude}`);
     console.log(`More or less ${crd.accuracy} meters.`);
      function compareDistance(a, b){
        return a.howFar - b.howFar;
    }
    
    const x = locations.sort(compareDistance);
    };
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);
   }

*/

handleOnBible(navigate, locations, userData, from, activeTabName){
  navigate('HigherBibleReadings', { locations: locations, userData: userData, from: from, activeTabName: activeTabName })
}


  render() {

    const { navigate } = this.props.navigation

    const { params } = this.props.navigation.state
 
    return (
        <Welcome 
          onSettings={()=> navigate('Settings', {userData: params.userData, activeTabName: 'Settings'})}
          onBible={() =>  this.handleOnBible(navigate, locations, params.userData, 'Settings', 'Bible')}
          userData={params.userData}
          locations={locations}
          onMoreSession={()=> {
            navigate('FindSession', {locations: locations, userData: params.userData})}
          }
          onChurchPressed={(locationSelected)=> {
            navigate('SessionItem', {locationSelected: locationSelected,  locations: locations, userData: params.userData })
            }}
            activeTabName={'Home'}
        />
    )
  }
}



