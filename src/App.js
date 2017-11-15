import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import logger , {createLogger} from "redux-logger"
import {Platform, AppState, AsyncStorage, Text, View, TouchableOpacity, Alert, Animated, NetInfo, BackHandler} from 'react-native'
import * as firebase from "firebase";

const Permissions = require('react-native-permissions');

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import {reducers} from './reducers'
import AppWithNavigationState from './screens'

import Freebie from './windows/freebie'
import {Read, Think, Respond} from './windows'

import {AlertWindow} from './components'


// const middleware = applyMiddleware(logger)
 const middleware = applyMiddleware(logger)

//const middleware = applyMiddleware()

var screen = null
var _title = null
var _lastReadDayNumber = null 
let store = createStore(reducers, middleware)



var connection = true
var GPS = false
var itemDay = null
// CHECK FOR GPS



// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {


    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if(notif.local_notification){
      //this is a local notification
    }
    if(notif.opened_from_tray){
      //app is open/resumed because user clicked banner

    }
    // await someAsyncCall();

    if(Platform.OS ==='ios'){
      //optional
      //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
      //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
      //notif._notificationType is available for iOS platfrom
      switch(notif._notificationType){
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
          break;
      }
    }
});
FCM.on(FCMEvent.RefreshToken, (token) => {
    // fcm token may not be available on first load, catch it here
});


export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isStoreLoading: false,
          initialStore: {},
          store: store,
          refreshed: false,
          isMounted: false,
          cipa: '',
          FCMtoken: null,
          locationChecked: false,
        }
        console.ignoredYellowBox = [
          'Setting a timer'
      ]
      this.itemDay = null
      this.FCMtoken = null
        this.animateOpacity = new Animated.Value(0)
        Animated.timing(this.animateOpacity, {
          toValue: 1,
          duration: 2000,
          delay: 20
        }).start();
        
      }

      componentDidMount() {
        Permissions.request('location')
        .then(response => {
          this.setState({locationPermission: response})
        })


        if(Platform.OS ==='ios'){
          FCM.requestPermissions(); // for iOS
        }

          FCM.on(FCMEvent.Notification, async (notif) => {

              if (notif){
 
                this.setState({
                  screen: notif.screen,
                  lastReadDayNumber: notif.lastReadDayNumber,
                  title: notif.title,
                  body: notif.body,
                  length: notif.length,
                  uid: notif.uid,
                  image: notif.image,
                  video: notif.video,
                })
              }

              if (notif.screen === 'reading') {
                _title = notif.title
                _lastReadDayNumber = notif.lastReadDayNumber
     
                var bibleReadingItem = []
         
                firebase.database().ref('bibleReading/'+ _title +'/').once("value", snapshot => {
                 bibleReadingItem = snapshot.val()
  
                    bibleReadingItem = Object.keys(bibleReadingItem).map(function (key) { return bibleReadingItem[key]; })
                    
                    itemDay = bibleReadingItem[parseInt(_lastReadDayNumber)-1]
                    this.setState({itemDay: itemDay})
                })    
              }

          });

        FCM.getFCMToken().then(token => {
            this.setState({isMounted: true, FCMtoken: token})
            // store fcm token in your server
        });

          this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
              // do some component related stuff
          });
      }

      handleFirstConnectivityChange(isConnected) {
        connection = isConnected
        NetInfo.isConnected.removeEventListener(
          'change',
          this.handleFirstConnectivityChange
        );

      }

    componentWillMount() {


      this.handleFirstConnectivityChange
      
        var self = this;

        FCM.getInitialNotification().then((notif)=>{

           if (notif){
  
           this.setState({
             screen: notif.screen,
             lastReadDayNumber: notif.lastReadDayNumber,
             title: notif.title,
             body: notif.body,
             length: notif.length,
             uid: notif.uid,
             image: notif.image,
             video: notif.video,
           })

           if(notif.screen ==='reading'){
            _title = notif.title
            _lastReadDayNumber = notif.lastReadDayNumber
 
            var bibleReadingItem = []
            
            firebase.database().ref('bibleReading/'+ _title +'/').once("value", snapshot => {
             bibleReadingItem = snapshot.val()
     
                bibleReadingItem = Object.keys(bibleReadingItem).map(function (key) { return bibleReadingItem[key]; })
                
                itemDay = bibleReadingItem[parseInt(_lastReadDayNumber)-1]
                this.setState({itemDay: itemDay})
            })
           }
           }
         });

        NetInfo.isConnected.addEventListener(
          'change',
          this.handleFirstConnectivityChange
        );

        AppState.addEventListener('change', this._handleAppStateChange.bind(this));
        this.setState({isStoreLoading: true});

        AsyncStorage.getItem('completeStore').then((value)=>{
          if(value){
            let initialStore = JSON.parse(value)

            self.setState({store: createStore(reducers, initialStore, middleware)});
          } else{
            self.setState({store: store});
          }
          self.setState({isStoreLoading: false});
        }).then((res)=> {
          //...
        })

        Permissions.request('location')
        .then(response => {
          this.setState({locationPermission: response})
        })

    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
        // stop listening for events
        this.notificationListener.remove();

      }


    _handleAppStateChange(currentAppState) {
      let storingValue = JSON.stringify(this.state.store.getState())
      let storeObject = this.state.store.getState()
      console.log('handleAppStateChange')

      if (storeObject){

          if (storeObject.form){
            storeObject.form.SignUpValidation = {}
          }
          if(storeObject.user){
            // UPDATE APPUSER IN FIREBASE WHEN COMPONENT UNMOUNT 
            const userUID = storeObject.user.uid 
            console.log(userUID)
            const appUser = storeObject.appUser
            console.log(appUser)
            if (userUID){
              const firebaseDataAppUsers = firebase.database().ref('appUsers/'+userUID+'/');
              firebaseDataAppUsers.update({
                FCMtoken: appUser.FCMtoken,
                event: appUser.event,
                uid: appUser.uid,
              })
            }
          }
      }
      AsyncStorage.setItem('completeStore', storingValue);
    }

    _requestPermission() {
      Permissions.request('location')
        .then(response => {
        this.setState({locationPermission: response})
      })
    }


  render()  {


            if (!connection){
              return ( <AlertWindow
                          type='connection'
                          text='Unable to connect to server. Please make sure you are online'
                          onPress={()=> this.setState({refreshed: !this.state.refreshed})}
                      />
                )
            }

            // handle location OFF both android and iOS
            if (((!this.state.locationPermission) || (this.state.locationPermission !== 'authorized')) && (Platform.OS === 'android')){

              return ( <AlertWindow
                          type='location'
                          text='Unable to find your location. To make the most of this app, please ensure that you have granted location permissions'
                          onPress={()=> this._requestPermission()}
                      />
                )
              } 

              
            if (this.state.showThink) return (
              <Think
                fromNotification={true}
                itemDay={itemDay}
                onItemBackPressed={()=> this.setState({showThink: false})}
                onItemNextPressed={()=> this.setState({showThink: false, showRespond: true})}
                onGoToApp={()=> this.setState({screen: undefined, showThink: false, showRespond: false})}
              />)

            if (this.state.showRespond) return (
              <Respond
                fromNotification={true}
                itemDay={itemDay}
                onItemBackPressed={()=> this.setState({showThink: true, showRespond: false})}
                onGoToApp={()=> this.setState({screen: undefined, showThink: false, showRespond: false})}
              />)

            if ((this.state.screen) && (this.state.isMounted)){

              if (this.state.screen === 'reading'){
                const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ this.state.uid+'/bibleReadings/'+this.state.title);
                firebaseDataAppUsers.update({
                    lastReadDayNumber: parseInt(this.state.lastReadDayNumber),
                    progress: parseInt((parseInt(this.state.lastReadDayNumber) / parseInt(this.state.length)) *100 )
                })

                  return <Read
                    onItemBackPressed={()=> this.setState({screen: undefined})}
                    onItemNextPressed={()=> this.setState({showThink: true})}
                    itemDay={itemDay}
                    currentReadingDayNumber={parseInt(this.state.lastReadDayNumber)}
                    fromNotification={true}
                    />
                // ... other notification means now freebie one
              } else if (this.state.screen === 'freebie'){
                return <Freebie 
                        image={this.state.image} 
                        video={this.state.video}
                        onGoBack={()=> this.setState({screen: undefined})}
                        title = {this.state.title}
                        body = {this.state.body}
                      />
              } else return null
              this.setState({canGo: true})
                // Load Main Application
            } else if(this.state.isStoreLoading){
              return <Text>loading... </Text>
            }else if ((this.state.isMounted) && (!this.state.screen)){
              return (
                <Provider  store={this.state.store}>
                  <AppWithNavigationState FCMtoken={this.state.FCMtoken} screen={this.state.screen}/>
                </Provider>
              )
            } else {
              return <Text>loading... </Text>
            }
          }
  }


  