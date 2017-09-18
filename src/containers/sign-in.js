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

  handleOnNext(email, password, navigate, route){
    let handleSignUp = _Firebase.signup(email, password, navigate, route)

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

  handleOnSettings(navigate, route, loginStatus, activeTabName){
    navigate(route, {loginStatus: loginStatus, activeTabName: activeTabName})
  }

  handleOnBible(navigate, route , ){
    navigate(route, { activeTabName: 'Bible'})
  }

  onFacebook(navigate, route){
    _Firebase.fbAuth(navigate, route)
  }

  onTwitter(navigate, route){
    _Firebase._twitterSignIn(navigate, route)
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

    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedOut'))
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))

  }

  render() {
 
    const { navigate } = this.props.navigation

    const events = this.props.events                   // from the store 
    const churches = this.props.churches               // from the store
    const coords = this.props.coords                   // from the store - current positions lng and lat 
    const activeTabName = this.props.app.activeTabName // from the store

    console.log('SignIn Container')
    console.log(this.props)

    return (
        <SignIn 
          onNext={(email, password)=> {
            this.handleOnNext(email, password, navigate, 'Welcome')
          }}
          onSettings={()=> {
            this.handleOnSettings(navigate, 'Settings', '', 'loggedOut', 'Settings')
            }
          }  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings')}
          onTwitter={()=> this.onTwitter(navigate, 'Welcome')}
          onFacebook={()=> this.onFacebook(navigate, 'Welcome')}
          email={this.state.email}
          password={this.state.password}
          shown={this.state.shown}
          showError={this.state.showError}
          showErrorWrapper={this.state.showErrorWrapper}
          signInError={this.state.error}
          activeTabName={activeTabName} />
    )
  }
}

// get state from store and pass to props
function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      churches: state.churches,
      coords: state.coords,
      app: state.app,

  });
}

export default connect(mapStateToProps)(_SignIn);
