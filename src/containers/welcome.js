import React, {Component} from 'react'
import {Welcome} from '../windows'
import geolib from 'geolib'
import { connect } from 'react-redux';
import {Dimensions} from 'react-native'

import * as ACTIONS from '../actions/actions/actions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

class _Welcome extends Component {

  constructor(props) {
    super(props);
  }

handleOnBible(navigate, from, activeTabName,){
  navigate('HigherBibleReadings', {from: from, activeTabName: activeTabName, loginStatus: 'loggedIn' })
}

handleOnMoreSession(navigate, route){
  navigate(route)
}

handleOnSettings(navigate, route, activeTabName){
  navigate(route, {activeTabName: activeTabName})
}

handleOnFindChurch(navigate, route){
  navigate(route)
}

componentDidMount(){
  const { params } = this.props.navigation.state
 
  if (params.userData) {
    this.props.dispatch(ACTIONS.SAVE_USER(params.userData));
  }

  var events = this.props.events  // data from the store 
  var churches = this.props.churches // data from the store
  var crd = this.props.coords  // data from the store
  
  var geoLoc = {}
//----------------- map events ----------
  events.map((item)=> {
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
    item.howFar = distance
  })
// -------------- map churches ------------- 
  churches.map((item)=> {

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
    item.howFar = distance
  })

  function compareDistance(a, b){
    return a.howFar - b.howFar;
  }
  const z = churches.sort(compareDistance);
  const x = events.sort(compareDistance);

  this.props.dispatch(ACTIONS.SAVE_EVENTS(events));
  this.props.dispatch(ACTIONS.SAVE_CHURCHES(churches));

}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events     // data from the store
    const churches = this.props.churches    // data from the store
    const coords = this.props.coords        // data from the store 
    const userData = this.props.user      // data from the store

    console.log('Welcome Container')
    console.log(params)
    console.log(this.props)

    return (
        <Welcome 
          onSettings={()=> this.handleOnSettings(navigate, 'Settings', 'Settings')}
          onBible={() =>  this.handleOnBible(navigate,'Settings', 'Bible')}
          userData={userData}
          onMoreSession={()=> this.handleOnMoreSession(navigate, 'FindSession')}
          onChurchPressed={(locationSelected)=> { navigate('SessionItem', {locationSelected: locationSelected})}}
          onFindChurch={()=> this.handleOnFindChurch(navigate, 'FindChurch')}
          coords={coords}
          activeTabName={'Home'}
          locations={locations}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      churches: state.churches,
      coords: state.coords
  });
}

export default connect(mapStateToProps)(_Welcome);
