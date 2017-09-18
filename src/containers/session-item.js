import React, {Component} from 'react'
import { connect } from 'react-redux';

import {SessionItem} from '../windows'
import * as ACTIONS from '../actions/actions/actions';


var myPosition = []

var options = {
  enableHighAccuracy: false,
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


  handleOnStartSession(navigate, route, locationSelected,){
       this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedInPlus'))
       navigate(route, { locationSelected: locationSelected})
  }

  handleOnStopSession(navigate, route){
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedIn')) 
    navigate(route)
  }

  handleOnSettings(navigate, locationSelected, from){
    const { params } = this.props.navigation.state

    if (params.cancelLabel){
      navigate('Settings', { locationSelected: locationSelected, from: 'SessionItemBrown', cancelLabel: true })
    } else {
      navigate('Settings', { locationSelected: locationSelected, from: 'SessionItemYellow'})
    }
  }

  handleOnHome(navigate, locationSelected, from){
    const { params } = this.props.navigation.state

    if (params.cancelLabel){
      navigate('UserProfile', { locationSelected: locationSelected,  from: 'SessionItemBrown'})
    } else {
      navigate('Welcome', {from: 'SessionItemYellow'})
    }
  }

  handleOnBible(navigate, locationSelected,  from){
    const { params } = this.props.navigation.state
    if (params.cancelLabel){
      navigate('HigherBibleReadings', {locationSelected: locationSelected, from: 'SessionItemBrown'})
    } else {
      navigate('HigherBibleReadings', {from: 'SessionItemYellow'})
    }
  }

  componentDidMount(){
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME(''))
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events   // data from the store
    const userData = this.props.user      // data from the store
    const activeTabName =this.props.app.activeTabName  // data from the store
    


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
          onStopSession={()=> this.handleOnStopSession(navigate, 'FindSession')}
          onStartSession={(location)=> {this.handleOnStartSession(navigate, 'UserProfile', location)}
          }
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

export default connect(mapStateToProps)(_SessionItem);

