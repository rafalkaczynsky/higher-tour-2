import React, {Component} from 'react'
import {Button, View} from 'react-native'
import * as firebase from 'firebase'

import _Firebase from '../actions/firebase';
import {SignIn} from '../windows'

export default class _SignIn extends Component {
  constructor(props) {
    super(props)

    this.firebaseDataEvents = firebase.database().ref('events/');
    this.firebaseDataChurches = firebase.database().ref('churches/');

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

  handleOnNext(email, password, navigate, route, handleError, events, coords, churches){
    _Firebase.signup(email, password, navigate, route, handleError, events, coords, churches);
  }

  handleOnSettings(navigate, route, userData, loginStatus, activeTabName){
    navigate(route, {userData: userData, loginStatus: loginStatus, activeTabName: activeTabName})
  }

  handleOnBible(navigate, route , ){
    navigate(route, { activeTabName: 'Bible', loginStatus: 'loggedOut'})
  }

  onFacebook(navigate, route, events, coords, churches){
    _Firebase.fbAuth(navigate, route, events, coords, churches)
  }

  onTwitter(navigate, route, events, coords, churches){
    _Firebase._twitterSignIn(navigate, route, events, churches)
  }

  getData(fbDataRef , fbDataRef2 ){
    fbDataRef.on('value',(snap)=>{
      let events = snap.val()
      this.setState({events: Object.keys(events).map(function (key) { return events[key]; })})
    })

    fbDataRef2.on('value',(snap)=>{
      let churches = snap.val()
      this.setState({churches: Object.keys(churches).map(function (key) { return churches[key]; })})
    })
  }

  
  componentDidMount(){
    this.getData(this.firebaseDataEvents, this.firebaseDataChurches);
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
    var churches = this.state.churches 
    console.log(coords)
    console.log(this.state.coords)

    console.log(this.state.churches)

    return (
        <SignIn 
          onNext={()=> {
            this.handleOnNext(this.state.email, this.state.password, navigate, 'Welcome', events, coords, churches)
          }}
          onSettings={()=> {
            this.handleOnSettings(navigate, 'Settings', '', 'loggedOut', 'Settings')
            }
          }  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings')}
          
          onTwitter={()=> this.onTwitter(navigate, 'Welcome', events, coords, churches)}
          onFacebook={()=> this.onFacebook(navigate, 'Welcome', events, coords, churches)}
          email={this.state.email}
          password={this.state.password}
          handleEmail={(email) => this.handleEmail(email)}
          handlePassword={(email) => this.handlePassword(email)}

          activeTabName={'Home'} />
    )
  }
}
