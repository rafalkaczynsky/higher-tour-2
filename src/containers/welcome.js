import React, {Component} from 'react'
import {Welcome} from '../windows'
import geolib from 'geolib'
import { connect } from 'react-redux';
import {Dimensions} from 'react-native'
import * as firebase from 'firebase'

import * as ACTIONS from '../actions/actions/actions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

class _Welcome extends Component {

  static navigationOptions = {
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state
    const loginStatus= this.props.app.loginStatus // data from the store
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.dispatch(ACTIONS.SAVE_COORDS(position.coords));
      }
    );
    
  }

  handleOnItem(locationSelected){
    this.props.dispatch(ACTIONS.SAVE_SELECTED_EVENT(locationSelected))
    this.props.dispatch({type: 'SessionItemAnimation'})
  }


handleOnBible(){
  this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
  this.props.dispatch({ type: 'BibleAnimation' }) 

}

handleOnMoreSession(){
  this.props.dispatch({type: 'FindSessionAnimation'})
}

handleOnSettings(){
  this.props.dispatch( {type: 'SettingsInAnimation'})
}

handleOnFindChurch(){
  this.props.dispatch({type: 'FindChurchesAnimation'})
}

componentWillMount(){

  const { navigate } = this.props.navigation
  const { params } = this.props.navigation.state
  const loginStatus= this.props.app.loginStatus // data from the store
  
}

componentDidMount(){

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
  this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedIn'))
  this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
 
}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events                 // data from the store
    const churches = this.props.churches                // data from the store
    const coords = this.props.coords                    // data from the store 
    const userData = this.props.user                    // data from the store
    const activeTabName = this.props.app.activeTabName  // data from the store

    function compareDistance(a, b){
      return a.howFar - b.howFar;
    }

    const x = locations.sort(compareDistance);

    return (
        <Welcome 
          onSettings={()=> this.handleOnSettings()}
          onBible={() =>  this.handleOnBible()}
          userData={userData}
          onMoreSession={()=> this.handleOnMoreSession()}
          onChurchPressed={(locationSelected)=> this.handleOnItem(locationSelected)}
          onFindChurch={()=> this.handleOnFindChurch()}
          coords={coords}
          activeTabName={activeTabName}
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
      coords: state.coords,
      app: state.app,

  });
}

export default connect(mapStateToProps)(_Welcome);
