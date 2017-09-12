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
      events: null
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
  var crd = params.coords
  var geoLoc = {}

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
    console.log(geoLoc)

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

  const x = events.sort(compareDistance);

  this.setState({events: events})
}


  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    console.log('Welcome Container')
   // console.log(params)
    console.log(this.state.events)
    const locations = this.state.events
    
    return (
        <Welcome 
          onSettings={()=> navigate('Settings', {userData: params.userData, activeTabName: 'Settings'})}
          onBible={() =>  this.handleOnBible(navigate, locations, params.userData, 'Settings', 'Bible')}
          userData={params.userData}

          onMoreSession={()=> {
            navigate('FindSession', {locations: locations, userData: params.userData})}
          }
          onChurchPressed={(locationSelected)=> {
            navigate('SessionItem', {locationSelected: locationSelected,  locations: locations, userData: params.userData })
            }}
            coords={params.coords}
            activeTabName={'Home'}
            locations={params.events}
        />
    )
  }
}



