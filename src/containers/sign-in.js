import React, {Component} from 'react'
import {Button, View, Animated} from 'react-native'
import { connect } from 'react-redux';

import * as firebase from 'firebase'

import _Firebase from '../actions/firebase';
import {SignIn} from '../windows'

import * as ACTIONS from '../actions/actions/actions';

class _SignIn extends Component {
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


  handleOnNext(email, password, navigate, route,  events, coords, churches){
    let handleSignUp = _Firebase.signup(email, password, navigate, route, events, coords, churches)

    handleSignUp.then((error)=> {


      if (error.code === "auth/email-already-in-use") {
        let handleLogin = _Firebase.login(email, password, navigate, route, events, coords, churches); 
        
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
      events = Object.keys(events).map(function (key) { return events[key]; })
      this.props.dispatch(ACTIONS.SAVE_EVENTS(events));
    })

    fbDataRef2.on('value',(snap)=>{
     let churches= snap.val()
     churches = Object.keys(churches).map(function (key) { return churches[key]; })
     this.props.dispatch(ACTIONS.SAVE_CHURCHES(churches));
    })


  }

  
  componentDidMount(){
    this.getData(this.firebaseDataEvents, this.firebaseDataChurches);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.dispatch(ACTIONS.SAVE_COORDS(position.coords));
      }
     
    );
  }


  render() {
 
    const { navigate } = this.props.navigation

    console.log('SignIn Container')

    var events = this.props.events // from the store 
    var churches = this.props.churches // from the store
    var coords = this.props.coords    // from the store - current positions lng and lat 
    console.log(this.props)

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


//export default connect()(_SignIn);



function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      churches: state.churches,
      coords: state.coords,
  });
}
//export default connect()(SignIn)

/*
// get state from store and pass to props


*/
export default connect(mapStateToProps)(_SignIn);
