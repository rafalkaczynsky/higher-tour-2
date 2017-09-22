import React, {Component} from 'react'
import {Button, View, Animated, AsyncStorage, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux';

import * as firebase from 'firebase'

import StyleSheet from '../styles'
import {TabMenu} from '../components'
import _Firebase from '../actions/firebase';
import {SignIn} from '../windows'

import * as ACTIONS from '../actions/actions/actions';

class _SignIn extends Component {
  constructor(props) {
    super(props)

    this.firebaseDataEvents = firebase.database().ref('events/');
    this.firebaseDataChurches = firebase.database().ref('churches/');
    this.firebaseBibleReading = firebase.database().ref('bibleReading/');

    this.auth = firebase.auth();
    this.continueUrl = "https://higher-app-a4b52.firebaseapp.com/__/auth/action"
    this.actionCode = 'resetPassword' 

    console.log('Constructor')
    console.log(this.props)

    this.state = { 
      showContent: false,
      appUsers: [],
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
      
      if (error){
        console.log(error)
        if (error.code){
          console.log(error.code)
          if (error.code === "auth/email-already-in-use") {
            let handleLogin = _Firebase.login(email, password, navigate, route); 
            
            handleLogin.then((error)=> {
              this.setState({error: error, showError: true, showErrorWrapper: true});
              var clearErrors = setTimeout(() => this.setState({showError: false}), 5000);
              var clearErrorsWrapper = setTimeout(() => this.setState({showErrorWrapper: false}), 10000);
              console.log('login error')
              console.log(error)
            })
          }
        }

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

  getData(fbDataRef , fbDataRef2, fbDataRef3 ){
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

    fbDataRef3.on('value',(snap)=>{
      let bibleReading = snap.val()
      console.log(bibleReading)
      bibleReading = Object.keys(bibleReading).map(function () { return bibleReading })
      this.props.dispatch(ACTIONS.SAVE_BIBLE_READING(bibleReading));
     })
  }
  // debugging function needs to be removed
  msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return hrs + ' hours, ' + mins + ' minutes, ' + secs + ' secunds';
  }
  
  handleInitialRedirect(){
 
    const { navigate } = this.props.navigation
    const  props = this.props

    const userDataFromLocal = this.props.user     
    const followStatus = this.props.app.followStatus   
    const TheDate = new Date().getTime();


    
    //check if user exist in Redux Store State ...
    if ((userDataFromLocal) && (userDataFromLocal.stsTokenManager)){
      // ... if so ...
      console.log('THERE IS USER IN LOCALstorage!!!')
      //... check if token is not expired ...

      // for debugging check when token will be expired 
      const expierationTime = userDataFromLocal.stsTokenManager.expirationTime - TheDate 
      console.log('Token expire time is: ' + this.msToTime(expierationTime))

      if (userDataFromLocal.stsTokenManager.expirationTime > TheDate ){
       //... if so ...
       console.log('TOKEN IS STILL VALID!!')
       // ... check if user follow events   
        if(followStatus){
          //... if so ...
          console.log('USER FOLLOWS EVENT!!!')
          navigate('UserProfile')    
        } else {
          //... if doesnt follow in localStorage check again ...

                       // ...In case when  app data storage was cleared check in firebase if follow 
                       firebase.database().ref('appUsers/'+ userDataFromLocal.uid+'/event/').once("value", snapshot => {
                        const event = snapshot.val();
                          //... if so ..
                          if (event) {
                            if (event.follow === true){
                              console.log('User follow! Valid TOKEN');
                              //... find event by id ...
          
                              firebase.database().ref('events/'+ event.id +'/').once("value", snapshot => {
                                // .. get object and dispatch to the store 
                                  const locationSelected = snapshot.val()
                                  props.dispatch(ACTIONS.SAVE_SELECTED_EVENT(locationSelected))
                                  props.dispatch(ACTIONS.SAVE_USER(userDataFromLocal))
                                  navigate('UserProfile')    
                              })
          
                            } else {
                              //... if doesnt follow ...
                              console.log('USER DOESNT FOLLOW EVENT!!!')
                              navigate('FindSession')
                            }
                          }
                        })
        }
      } else {
        //.. Token expired!!!!!

        firebase.auth().currentUser.getToken(true)
        .then(function(idToken) {
          // ... Token has been refreshed!!!
          console.log('Token has been refreshed!!! new token is: '+idToken)
          // ... check if user follow events   
           if(followStatus){
             //... if so ...
             console.log('USER FOLLOWS EVENT!!!')
             navigate('UserProfile')    
           } else {

             // In case when  app data storage was cleared check in firebase if follow 
             firebase.database().ref('appUsers/'+ userDataFromLocal.uid+'/event/').once("value", snapshot => {
              const event = snapshot.val();
                //... if so ..
                if (event) {
                  if (event.follow === true){
                    console.log('User follow! refresh token method');
                    //... find event by id ...

                    firebase.database().ref('events/'+ event.id +'/').once("value", snapshot => {
                      // .. get object and dispatch to the store 
                        const locationSelected = snapshot.val()
                        props.dispatch(ACTIONS.SAVE_SELECTED_EVENT(locationSelected))
                        props.dispatch(ACTIONS.SAVE_USER(userDataFromLocal))
                        navigate('UserProfile')    
                    })

                  } else {
                    //... if doesnt follow ...
                    console.log('USER DOESNT FOLLOW EVENT!!!')
                    navigate('FindSession')
                  }
                }
              })

           }
        }).catch(function(error) {
          if (error) throw error
        });
      }
    } else {
      // ...if doesnt exist in local  ...
      console.log('USER DOESNT EXIST IN LOCALstorage!!!')
      // ===========================================================================
      // ========================== double check with firebase =====================
      // ===========================================================================

      this.auth.onAuthStateChanged(function (user) {
        // if user is signed to firebase
        if(user){
  
          // check if user exist in the appUsers...
          firebase.database().ref('appUsers/'+ user.uid+'/').once("value", snapshot => {
            const appUser = snapshot.val();
      
            if (appUser){
              //.. if so..
                      // check if user follow  any event ...
              firebase.database().ref('appUsers/'+ user.uid+'/event/').once("value", snapshot => {
                const event = snapshot.val();
                  //... if so ..
                  if (event) {
                    if (event.follow === true){
                      //... find event by id 
                      console.log('User follow! onAuthStateChanged');

                      firebase.database().ref('events/'+ event.id +'/').once("value", snapshot => {
                        // .. get object and dispatch to the store 
                          const locationSelected = snapshot.val()
                          props.dispatch(ACTIONS.SAVE_SELECTED_EVENT(locationSelected))
                          props.dispatch(ACTIONS.SAVE_USER(user))
                          navigate('UserProfile')    
                      })

                    } else {
                      console.log('User doesnt follow')
                      props.dispatch(ACTIONS.SAVE_USER(user))
                      navigate('FindSession')
                    }
                  }
              });
  
            } else {
              
              // ..if doesnt exist save him to appUsers
              // if login with email needs to be passed currentUser from firebase 
  
              const firebaseDataAppUsers = firebase.database().ref('appUsers/'+user.uid+'/');
  
              firebaseDataAppUsers.update({
                email: user.email,
                event: {
                  follow: false,
                  id: null
                },
                uid: user.uid
              })
              // save user to redux store
              props.dispatch(ACTIONS.SAVE_USER(user));
              navigate('FindSession')
  
            }
          })
  
        } else {
          // if user doesnt signin to firebase
          console.log('No user signed with Firebase')
          props.dispatch(ACTIONS.UPDATE_SHOW_LOGGIN_CONTENT(true))
        }
      })
    }


  }

  componentWillMount(){

    this.props.dispatch(ACTIONS.UPDATE_SHOW_LOGGIN_CONTENT(false))
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedOut'))
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))

    const { navigate } = this.props.navigation
    
    if ((!this.props.churches) || (!this.props.churches.length)|| (!this.props.events.length) || (!this.props.bibleReading.length)){                             // if churches, events , bibleReading are not in the redux-store then...
      this.getData(this.firebaseDataEvents, this.firebaseDataChurches, this.firebaseBibleReading); //... get EVENTS and Churches from firebase 
      console.log('New Data from Firebase taken: churches, events, bibleReading ')
    }

    this.handleInitialRedirect() 

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.dispatch(ACTIONS.SAVE_COORDS(position.coords));
      }
    );

  }

  componentDidMount(){

  }

  render() {
 
    const { navigate } = this.props.navigation

    const events = this.props.events                   // from the store 
    const churches = this.props.churches               // from the store
    const coords = this.props.coords                   // from the store - current positions lng and lat 
    const activeTabName = this.props.app.activeTabName // from the store

    console.log('SignIn Container')
    console.log(this.props)
    //console.log(Math.round((new Date()).getTime()))
    //const renderFirstScreenStyles = {flex: 1, flexDirection: 'row' , alignItems: 'center', justifyContent: 'flex-end'} 
    //const styles = this.state.showContent ? null : renderFirstScreenStyles

    const SignInScreen = () => <SignIn 
            onNext={(email, password)=> {
              this.handleOnNext(email, password, navigate, 'SignIn')
            }}
            onSettings={()=> {
              this.handleOnSettings(navigate, 'Settings', '', 'loggedOut', 'Settings')
              }
            }  
            onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings')}
            onTwitter={()=> this.onTwitter(navigate, 'SignIn')}
            onFacebook={()=> this.onFacebook(navigate, 'SignIn')}
            email={this.state.email}
            password={this.state.password}
            shown={this.state.shown}
            showError={this.state.showError}
            showErrorWrapper={this.state.showErrorWrapper}
            signInError={this.state.error}
            activeTabName={activeTabName} />

    const EmptyScreen = () => 
      <View style={StyleSheet.signIn.emptyScreen}>
        <View style={StyleSheet.signIn.indicator}>
          <ActivityIndicator
            animating={true}
            color='grey'
          />  
        </View>
        <View style={StyleSheet.signIn.tabMenu}>
          <TabMenu/>
        </View>
      </View>
 
    if (this.props.app.showLogginContent){
      return <SignInScreen/>
    } else return <EmptyScreen/> 

  }
}

// get state from store and pass to props
function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      bibleReading: state.bibleReading,
      churches: state.churches,
      coords: state.coords,
      app: state.app,
      eventSelected: state.eventSelected,
      
  });
}

export default connect(mapStateToProps)(_SignIn);




/*
    //every user must have an email
ref.child("users").orderByChild("ID").equalTo(user.uid).once("value",snapshot => {
    const userData = snapshot.val();
    if (userData){
      console.log("exists!");
    }
});
    //every user must have an email
    firebase.database().ref(`users/${userId}/email`).once("value", snapshot => {
      const email = snapshot.val();
        if (email){
          console.log("user wit email exists!");
        }
    });
*/

// below we can add later additional check if we have locationSelected in 
// localStorage then navigate to UserProfile with that and skip below steps