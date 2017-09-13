import React, {Component} from 'react'
import {Welcome} from '../windows'
import geolib from 'geolib'

import {Dimensions} from 'react-native'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

export default class _Welcome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: null,
      churches: null
    };
  }

handleOnBible(navigate, locations, userData, from, activeTabName,){
  navigate('HigherBibleReadings', {locations: locations, userData: userData, from: from, activeTabName: activeTabName, loginStatus: 'loggedIn' })
}

componentDidMount(){
  const { params } = this.props.navigation.state
  console.log('did mount')
  console.log(params)

  var events = params.events
  var churches = params.churches

  var crd = params.coords
  
  var geoLoc = {}
//----------------- map events ----------
  events.map((item)=> {
    console.log('did mount map')
    console.log(item.geoLoc.latitude)
    console.log(item.geoLoc.longitude)
    geoLoc = {
      latitude:  item.geoLoc.latitude,
      longitude: item.geoLoc.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ASPECT_RATIO,
    }


    let distance = geolib.getDistance(
      crd,
      geoLoc,
    );
  
    distance = geolib.convertUnit('mi', distance, 1)

    console.log(distance)
    item.howFar = distance
  })
// -------------- map churches ------------- 
  churches.map((item)=> {
    console.log('did mount map')
    console.log(item.geoLoc.latitude)
    console.log(item.geoLoc.longitude)
    geoLoc = {
      latitude:  item.geoLoc.latitude,
      longitude: item.geoLoc.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ASPECT_RATIO,
    }


    let distance = geolib.getDistance(
      crd,
      geoLoc,
    );
  
    distance = geolib.convertUnit('mi', distance, 1)

    console.log(distance)
    item.howFar = distance
  })

  function compareDistance(a, b){
    return a.howFar - b.howFar;
  }
  const z = churches.sort(compareDistance);
  const x = events.sort(compareDistance);

  this.setState({events: events, churches: churches})
}


  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    console.log('Welcome Container')
    console.log(params)
    console.log(this.state.events)
    console.log(this.state.churches)

    const locations = this.state.events
    const churches = this.state.churches

    let userData = {}
    if (!params.userData) {
        userData.displayName = params.email
    } else {
      userData = params.userData
    }


    return (
        <Welcome 
          onSettings={()=> navigate('Settings', {userData: userData, activeTabName: 'Settings', locations: locations, churches: churches, coords: params.coords})}
          onBible={() =>  this.handleOnBible(navigate, locations, userData, 'Settings', 'Bible')}
          userData={params.userData}

          onMoreSession={()=> {
            navigate('FindSession', {locations: locations, userData: userData, churches: churches})}
          }
          onChurchPressed={(locationSelected)=> {
            navigate('SessionItem', {locationSelected: locationSelected,  locations: locations, userData: userData })
            }}
          onFindChurch={()=>  navigate('FindChurch', {locations: locations, userData: userData, churches: churches })}
          coords={params.coords}
          activeTabName={'Home'}
          locations={params.events}
        />
    )
  }
}



