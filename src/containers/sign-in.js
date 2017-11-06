import React, {Component} from 'react'
import {BackHandler, Button, View, Animated, AsyncStorage, ActivityIndicator} from 'react-native'
import { NavigationActions } from 'react-navigation'

import { connect } from 'react-redux';
import {Alert} from 'react-native'

import * as firebase from 'firebase'

import StyleSheet from '../styles'
import {TabMenu} from '../components'
import _Firebase from '../actions/firebase';
import {SignIn} from '../windows'

import * as ACTIONS from '../actions/actions/actions';


class _SignIn extends Component {

  static navigationOptions = {
    gesturesEnabled: false
  };

  constructor(props) {
    super(props)

    this.firebaseDataEvents = firebase.database().ref('events/');
    this.firebaseDataChurches = firebase.database().ref('churches/');
    this.firebaseBibleReading = firebase.database().ref('bibleReading/');
    this.firebaseAaaSession = firebase.database().ref('aaaSession/');

    this.auth = firebase.auth();
    this.continueUrl = "https://higher-app-a4b52.firebaseapp.com/__/auth/action"
    this.actionCode = 'resetPassword'

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

    const fixedPosition = {
      coords: {
        accuracy: 500,
        altitude: 0,
        heading: 0,
        latitude: 53.4761312,
        longitude: -2.2612598,
        speed: 0,
       }
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.dispatch(ACTIONS.SAVE_COORDS(position.coords));
      },
      error => {
        this.props.dispatch(ACTIONS.SAVE_COORDS(fixedPosition.coords));
        alert('Unable to find your location. To make the most of this app, please ensure that you have granted location permissions and your GPS is switched on')
      },
    );

   // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

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
        if (error.code){
          if (error.code === "auth/email-already-in-use") {
            let handleLogin = _Firebase.login(email, password, navigate, route);

            handleLogin.then((error)=> {

             this.setState({error: error, showError: true, showErrorWrapper: true});
              var clearErrors = setTimeout(() => this.setState({showError: false}), 5000);
              var clearErrorsWrapper = setTimeout(() => this.setState({showErrorWrapper: false}), 10000);
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
    this.props.dispatch( {type: 'SettingsInAnimation'})
   // navigate(route, {loginStatus: loginStatus, activeTabName: activeTabName})
  }

  handleOnBible(navigate, route , ){
    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
    this.props.dispatch({ type: 'BibleAnimation' })
    //navigate(route, { activeTabName: 'Bible'})
  }

  onFacebook(){
    this.props.dispatch(ACTIONS.UPDATE_SHOW_LOGGIN_CONTENT(false))
    _Firebase.fbAuth(this.props)
  }

  onTwitter(){
    this.props.dispatch(ACTIONS.UPDATE_SHOW_LOGGIN_CONTENT(false))
    _Firebase._twitterSignIn(this.props)
  }

  getData(fbDataRef , fbDataRef2, fbDataRef3, fbDataRef4 ){
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
      let bibleReadingNames = snap.val()
      bibleReading = Object.keys(bibleReading).map(function (key, indx, name) {
        return bibleReading[key];
      })
      bibleReadingNames = Object.keys(bibleReadingNames).map(function (key, indx, name) {
        let arrayOfNames = []
        arrayOfNames.push(name[indx])
        return  arrayOfNames;
      })
      this.props.dispatch(ACTIONS.SAVE_BIBLE_READING(bibleReading));
      this.props.dispatch(ACTIONS.SAVE_BIBLE_READING_NAMES(bibleReadingNames));
     })

     fbDataRef4.on('value',(snap)=>{
      let aaaSessions = snap.val()
      aaaSessions = Object.keys(aaaSessions ).map(function (key) {
        return aaaSessions[key];
      })
      this.props.dispatch(ACTIONS.SAVE_AAA_SESSION(aaaSessions));
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

    this.getData(this.firebaseDataEvents, this.firebaseDataChurches, this.firebaseBibleReading, this.firebaseAaaSession); //... get EVENTS and Churches from firebase
    /**
     *
     *
     *
     */


    this.auth.onAuthStateChanged(function (user) {



      // if user is signed to firebase
      if(user){
        props.dispatch(ACTIONS.UPDATE_SHOW_LOGGIN_CONTENT(false))
        // User signed to firebase

        // if user is in local storage
        if ((userDataFromLocal) && (userDataFromLocal.uid)){
          //user is in local storage

          //if user is the same as previus
          if(user.uid === userDataFromLocal.uid){
          //User is the same as in localstorage

          if(followStatus){
            //... if so ..
            // check if follow in firabase
          firebase.database().ref('appUsers/'+ user.uid+'/event/').once("value", snapshot => {
            const event = snapshot.val();
              //... if so ..
              if (event) {
                if (event.follow === true){
                  //... find event by id ...
                  firebase.database().ref('events/'+ event.id +'/').once("value", snapshot => {
                    // .. get object and dispatch to the store
                      const locationSelected = snapshot.val()
                      props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(true))
                      props.dispatch(ACTIONS.SAVE_SELECTED_EVENT(locationSelected))
                      props.dispatch(ACTIONS.SAVE_USER(user))

                   //   props.dispatch({ type: 'UserProfileAnimation' })
                      const resetAction = NavigationActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                          NavigationActions.navigate({ routeName: 'UserProfile'})
                        ]
                      })
                      
                    props.navigation.dispatch(resetAction)
                      //navigate('UserProfile')
                  })
                } else {
                  //... if doesnt follow ...
                  props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(false))
                  props.dispatch(ACTIONS.SAVE_USER(user))
                 // props.dispatch({type: 'WelcomeAnimation' })
                 const resetAction = NavigationActions.reset({
                  index: 0,
                  key: null,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Welcome'})
                  ]
                  })             
                  props.navigation.dispatch(resetAction)
                }
              }
            })

          } else {
            //...or user doesnt follow
            props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(false))
            props.dispatch(ACTIONS.SAVE_USER(user))
            //props.dispatch({type: 'WelcomeAnimation' })
            //  navigate('Welcome')
            const resetAction = NavigationActions.reset({
              index: 0,
              key: null,
              actions: [
                NavigationActions.navigate({ routeName: 'Welcome'})
              ]
            })
            
            props.navigation.dispatch(resetAction)
          }

        } else {
            //User is not the same as in localstorage

            // check if follow in firabase
            firebase.database().ref('appUsers/'+ user.uid+'/').once("value", snapshot => {
              userCurrent = snapshot.val();
              if (userCurrent){
                const event = userCurrent.event;
                //... if so ..
                if (event) {
                  if (event.follow === true){
                    //... find event by id ...
                    firebase.database().ref('events/'+ event.id +'/').once("value", snapshot => {
                      // .. get object and dispatch to the store
                        const locationSelected = snapshot.val()

                        const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ user.uid+'/');

                        firebaseDataAppUsers.update({
                            email: user.email,
                            name: user.displayName,
                            event: {
                                  follow: false,
                            },
                            uid: user.uid,
                            FCMtoken: props.navigation.FCMtoken,
                        })

                        props.dispatch(ACTIONS.SAVE_APP_USER_BIBLE_READINGS({}));
                        props.dispatch(ACTIONS.SAVE_APP_USER_BIBLE_READINGS_NAMES({}));
                        props.dispatch(ACTIONS.SAVE_SELECTED_EVENT(locationSelected))
                        props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(true))
                        props.dispatch(ACTIONS.SAVE_USER(user))

                        const resetAction = NavigationActions.reset({
                          index: 0,
                          key: null,
                          actions: [
                            NavigationActions.navigate({ routeName: 'UserProfile'})
                          ]
                        })
                        
                      props.navigation.dispatch(resetAction)
                       // props.dispatch({ type: 'UserProfileAnimation' })
                       // navigate('UserProfile')
                    })
                  } else {
                    //... if doesnt follow ...
                    const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ user.uid+'/');
                    firebaseDataAppUsers.update({
                        email: user.email,
                        name: user.displayName,
                        event: {
                              follow: false,
                        },
                        uid: user.uid,
                        FCMtoken: props.navigation.FCMtoken,
                    })

                    props.dispatch(ACTIONS.SAVE_APP_USER_BIBLE_READINGS({}));
                    props.dispatch(ACTIONS.SAVE_APP_USER_BIBLE_READINGS_NAMES({}));
                    props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(false))
                    props.dispatch(ACTIONS.SAVE_USER(user))

                    const resetAction = NavigationActions.reset({
                      index: 0,
                      key: null,
                      actions: [
                        NavigationActions.navigate({ routeName: 'Welcome'})
                      ]
                    })
                    
                  props.navigation.dispatch(resetAction)
                    //props.dispatch({type: 'WelcomeAnimation' })
                    //navigate('Welcome')
                  }
                }
              } else {
                const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ user.uid+'/');
                firebaseDataAppUsers.update({
                    email: user.email,
                    name: user.displayName,
                    event: {
                          follow: false,
                    },
                    uid: user.uid,
                    FCMtoken: props.navigation.FCMtoken,
                })
                props.dispatch(ACTIONS.SAVE_APP_USER_BIBLE_READINGS({}));
                props.dispatch(ACTIONS.SAVE_APP_USER_BIBLE_READINGS_NAMES({}));
                props.dispatch(ACTIONS.SAVE_USER(user))
                props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(false))

                const resetAction = NavigationActions.reset({
                  index: 0,
                  key: null,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Welcome'})
                  ]
                })
                
                props.navigation.dispatch(resetAction)
                //props.dispatch({type: 'WelcomeAnimation' })
              }

              })
              //............

          }


        } else {
          //user is not in local storage
          // check if follow in firabase
          firebase.database().ref('appUsers/'+ user.uid+'/').once("value", snapshot => {
            userCurrent = snapshot.val();
            if (userCurrent){
              const event = userCurrent.event;
              //... if so ..
              if (event) {
                if (event.follow === true){
                  //... find event by id ...
                  firebase.database().ref('events/'+ event.id +'/').once("value", snapshot => {
                    // .. get object and dispatch to the store
                      const locationSelected = snapshot.val()
                      const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ user.uid+'/');

                      if (props.navigation.FCMtoken){
                        firebaseDataAppUsers.update({
                          FCMtoken: props.navigation.FCMtoken,
                        })
                      } 

                      props.dispatch(ACTIONS.SAVE_SELECTED_EVENT(locationSelected))
                      props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(true))
                      props.dispatch(ACTIONS.SAVE_USER(user))

                      const resetAction = NavigationActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                          NavigationActions.navigate({ routeName: 'UserProfile'})
                        ]
                      })
                      
                      props.navigation.dispatch(resetAction)
                      //props.dispatch({ type: 'UserProfileAnimation' })
                      //navigate('UserProfile')
                  })
                } else {
                  //... if doesnt follow ...                
                  const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ user.uid+'/');

                  if (props.navigation.FCMtoken){
                    firebaseDataAppUsers.update({
                      FCMtoken: props.navigation.FCMtoken,
                    })
                  } 
                  

                  props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(false))
                  props.dispatch(ACTIONS.SAVE_USER(user))

                  const resetAction = NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Welcome'})
                    ]
                  })
                  
                  props.navigation.dispatch(resetAction)
                  //props.dispatch({type: 'WelcomeAnimation' })
                 // navigate('Welcome')
                }
              }
            } else {
              const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ user.uid+'/');

              firebaseDataAppUsers.update({
                email: user.email,
                name: user.displayName,
                event: {
                      follow: false,
                },
                uid: user.uid,
                FCMtoken:  props.navigation.FCMtoken,
            })
              props.dispatch(ACTIONS.SAVE_USER(user))
              props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(false))

              const resetAction = NavigationActions.reset({
                index: 0,
                key: null,
                actions: [
                  NavigationActions.navigate({ routeName: 'Welcome'})
                ]
              })
              
              props.navigation.dispatch(resetAction)
              //props.dispatch({type: 'WelcomeAnimation' })
             // navigate('Welcome')
            }

            })
        }

    } else {
      // if user doesnt signin to firebase

      props.dispatch(ACTIONS.UPDATE_SHOW_LOGGIN_CONTENT(true))
    }
  })

}

  componentWillMount(){

    //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.props.dispatch(ACTIONS.UPDATE_SHOW_LOGGIN_CONTENT(false))
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedOut'))
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))

    const { navigate } = this.props.navigation

    this.handleInitialRedirect()

  }

  componentWillUnmount() {
   // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  render() {

  
    const { navigate } = this.props.navigation

    const events = this.props.events                   // from the store
    const churches = this.props.churches               // from the store
    const coords = this.props.coords                   // from the store - current positions lng and lat
    const activeTabName = this.props.app.activeTabName // from the store

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
      aaaSession: state.aaaSession,


  });
}

export default connect(mapStateToProps)(_SignIn);
