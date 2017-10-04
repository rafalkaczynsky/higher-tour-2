import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as firebase from 'firebase'

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
//  console.log('Your current position is:');
//  console.log(`Latitude : ${crd.latitude}`);
//  console.log(`Longitude: ${crd.longitude}`);
//  console.log(`More or less ${crd.accuracy} meters.`);
  myPosition.push(crd)
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error);

class _SessionItem extends Component {

  constructor(props){
    super(props)

    this.state = {
      allSessions: '',
      locationSelected: {},
    }
  }


  handleOnStartSession(navigate, route, eventSelected){
        console.log('on start session')
        console.log(eventSelected)
        const userData = this.props.user          
        const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ userData.uid+'/');

        firebaseDataAppUsers.update({
          email: userData.email,
          name: userData.displayName,
          event: {
            follow: true,
            id: eventSelected.host
          },
          uid: userData.uid
        })
        // update database appUser 
       this.props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(true)) 
       this.props.dispatch(ACTIONS.SAVE_SELECTED_EVENT(eventSelected))
       this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedInPlus'))
       this.props.dispatch({type:'UserProfileOnStartSessionAnimation'})
  }

  handleOnStopSession(navigate, route){
        // appData database appUser
        const userData = this.props.user          
        const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ userData.uid+'/');

        firebaseDataAppUsers.update({
          event: {
            follow: false,
            id: null
          },
        })

    this.props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(false)) 
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedIn')) 
    this.props.dispatch({type:'FindSessionAnimation'})
  }

  handleOnSettings(){
    this.props.dispatch({type: 'SettingsInAnimation'})
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
    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
    if (params.cancelLabel){
      navigate('HigherBibleReadings', {locationSelected: locationSelected, from: 'SessionItemBrown'})
    } else {
      navigate('HigherBibleReadings', {from: 'SessionItemYellow'})
    }
  }

  handleOnHostPressed(navigate){
    navigate('ChurchItem')
  }

  componentDidMount(){
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME(''))
  }

  componentWillMount(){
    const eventSelected  =this.props.eventSelected 
    
    firebase.database().ref('churches/'+eventSelected.host+'/').once("value", snapshot => {
      const church = snapshot.val();
      this.props.dispatch(ACTIONS.SAVE_SELECTED_CHURCH(church))
    })
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events                // data from the store
    const userData = this.props.user                   // data from the store
    const activeTabName =this.props.app.activeTabName  // data from the store
    const eventSelected  =this.props.eventSelected     // data from the store
    const loginStatus  = this.props.app.loginStatus   //
    const churchSelected = this.props.selectedChurch

    console.log('SessionItem Container')

    return (
        <SessionItem 
          onHome={()=> this.handleOnHome(navigate)}
          onSettings={()=> this.handleOnSettings()}
          onBible={()=> this.handleOnBible(navigate)}
          myPosition={myPosition[0]}
          location={eventSelected}
          churchSelected={churchSelected}
          onHostPressed={()=> this.handleOnHostPressed(navigate)}
          cancelLabel= {loginStatus === 'loggedInPlus' ? true :false}
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
      eventSelected: state.eventSelected,
      selectedChurch: state.selectedChurch,

  });
}

export default connect(mapStateToProps)(_SessionItem);

