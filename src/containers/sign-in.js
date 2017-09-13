import React, {Component} from 'react'
import {Button, View, Animated} from 'react-native'
import * as firebase from 'firebase'

import _Firebase from '../actions/firebase';
import {SignIn} from '../windows'

export default class _SignIn extends Component {
  constructor(props) {
    super(props)

    this.firebaseDataEvents = firebase.database().ref('events/');
    this.firebaseDataChurches = firebase.database().ref('churches/');

    this.auth = firebase.auth();
    this.continueUrl = "https://higher-app-a4b52.firebaseapp.com/__/auth/action"
    this.actionCode = 'resetPassword' 
    
    this.state = { 
      email: '',
      password: '',
      showError: null,
      showErrorWrapper: null,
      shown: new Animated.Value(0),
      error: '',
      events: {},
      coords: {
        latitude: null,
        longitude: null,
      },
      erroR: null,
    }
   
  }

  handleResetPassword(auth, actionCode, continueUrl) {
    var accountEmail;
    // Verify the password reset code is valid.
    auth.verifyPasswordResetCode(actionCode).then(function(email) {
      var accountEmail = email;
  
      // TODO: Show the reset screen with the user's email and ask the user for
      // the new password.
  
      // Save the new password.
      auth.confirmPasswordReset(actionCode, newPassword).then(function(resp) {
        // Password reset has been confirmed and new password updated.
  
        // TODO: Display a link back to the app, or sign-in the user directly
        // if the page belongs to the same domain as the app:
        // auth.signInWithEmailAndPassword(accountEmail, newPassword);
  
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
      }).catch(function(error) {
        // Error occurred during confirmation. The code might have expired or the
        // password is too weak.
      });
    }).catch(function(error) {
      // Invalid or expired action code. Ask user to try to reset the password
      // again.
    });
  }


  handleEmail(email){
    this.setState({email: email})
  }


  handlePassword(password){
    this.setState({password: password})
  }


  handleOnNext(email, password, navigate, route, handleError, events, coords, churches){
    let handleSignUp = _Firebase.signup(email, password, navigate, route, handleError, events, coords, churches)

    handleSignUp.then((error)=> {


      if (error.code === "auth/email-already-in-use") {
        let handleLogin = _Firebase.login(email, password, navigate, route); 
        
        handleLogin.then((error)=> {
          this.setState({error: error, showError: true, showErrorWrapper: true});
          var clearErrors = setTimeout(() => this.setState({showError: false}), 5000);
          var clearErrorsWrapper = setTimeout(() => this.setState({showErrorWrapper: false}), 10000);
        })

      } else {
        this.setState({error: error, showError: true, showErrorWrapper: true});
        var clearErrors = setTimeout(() => this.setState({showError: false}), 5000);
        var clearErrorsWrapper = setTimeout(() => this.setState({showErrorWrapper: false}), 10000);
      }

  })
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

    console.log(this.state.coords)
    console.log(this.state.churches)

    console.log('Error Message')
    console.log(this.state.error)

    return (
        <SignIn 
          onNext={(email, password)=> {
            this.handleOnNext(email, password, navigate, 'Welcome', events, coords, churches)
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
          shown={this.state.shown}
          showError={this.state.showError}
          showErrorWrapper={this.state.showErrorWrapper}
          signInError={this.state.error}
          activeTabName={'Home'} />
    )
  }
}
