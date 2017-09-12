import React, {Component} from 'react'
import {Button, View} from 'react-native'
import * as firebase from 'firebase'

import _Firebase from '../actions/firebase';
import {SignIn} from '../windows'

export default class _SignIn extends Component {
  constructor(props) {
    super(props)

    this.firebaseData = firebase.database().ref('events/');

    this.state = { 
      email: '',
      password: '',
      error: '',
      events: {},
      coords: {
        latitude: null,
        longitude: null,
      },
      erroR: null,
    }
  }

  handleEmail(email){
    this.setState({email: email})
  }


  handlePassword(password){
    this.setState({password: password})
  }

  handleOnNext(email, password, navigate, route, handleError, events, coords){
    _Firebase.signup(email, password, navigate, route, handleError, events, coords);
  }

  handleOnSettings(navigate, route, userData, loginStatus, activeTabName){
    navigate(route, {userData: userData, loginStatus: loginStatus, activeTabName: activeTabName})
  }

  handleOnBible(navigate, route , ){
    navigate(route, { activeTabName: 'Bible', loginStatus: 'loggedOut'})
  }

  onFacebook(navigate, route, events, coords){
    _Firebase.fbAuth(navigate, route, events, coords)
  }

  onTwitter(navigate, route, events, coords){
    _Firebase._twitterSignIn(navigate, route, events)
  }

  getEvents(fbDataRef){
    fbDataRef.on('value',(snap)=>{
      let events = snap.val()
      this.setState({events: Object.keys(events).map(function (key) { return events[key]; })})
    })
  }
  
  componentDidMount(){
    this.getEvents(this.firebaseData);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          coords: position.coords,
          error: null,
        });
      },
      (error) => this.setState({ erroR: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  render() {
 
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    console.log('SignIn Container')
    console.log(params)
    var events = this.state.events
    var coords = this.state.coords    // current positions lng and lat

    console.log(coords)
    console.log(this.state.coords)
    return (
        <SignIn 
          onNext={()=> {
            this.handleOnNext(this.state.email, this.state.password, navigate, 'Welcome', events, coords)
          }}
          onSettings={()=> {
            this.handleOnSettings(navigate, 'Settings', '', 'loggedOut', 'Settings')
            }
          }  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings')}
          
          onTwitter={()=> this.onTwitter(navigate, 'Welcome', events, coords)}
          onFacebook={()=> this.onFacebook(navigate, 'Welcome', events, coords)}
          email={this.state.email}
          password={this.state.password}
          handleEmail={(email) => this.handleEmail(email)}
          handlePassword={(email) => this.handlePassword(email)}

          activeTabName={'Home'} />
    )
  }
}
