import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import logger , {createLogger} from "redux-logger"
import {Platform,AppState, AsyncStorage, Text, View, TouchableOpacity} from 'react-native'

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

import {reducers} from './reducers'
import AppWithNavigationState from './screens'

import Freebie from './windows/freebie'

const middleware = applyMiddleware(logger)
var screen = null
let store = createStore(reducers, middleware)
// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {

 // console.log('!!!!!!! FCM.on  - 1')
 // console.log(notif)
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if(notif.local_notification){
      //this is a local notification
    }
    if(notif.opened_from_tray){
      //app is open/resumed because user clicked banner

      console.log('opend tray')
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
    console.log('!!!!!!!')

});
/**
 * 
 * 
 *         var payload = {
            notification: {
              title: "Your youth session is on "+ eventData.meetingDay ,
              body: "Session will start at "+ eventData.meetingTime,
              click_action: "fcm.ACTION.HELLO"
            },
            "data":{
              "screen":"doesntmatter"
            }

            let payload = {
                data: {
                  custom_notification: JSON.stringify({
                    title: 'Your youth session is on '+ eventData.meetingDay ,
                    body: 'Session will start at '+ eventData.meetingTime,
                    show_in_foreground": true
                    screen: doesntmatter"
                    content_available: true
                })
              } 

              {
            let payload = { 
                content_available: true,
                data: { 
                  show_in_foreground: true, 
                  remote: true 
                  screen: doesntmatter"
                },
                notification: {
                  custom_notification: { 
                    icon: 'icon_notification', 
                    large_icon: 'ic_launcher' 
                  },
                  title: 'Title of your push notification',
                  body: 'Body of your push notification'
                  screen: doesntmatter"
               },
               priority: 'high' 
            }
}


 */


export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isStoreLoading: false,
          initialStore: {},
          store: store,
          cipa: '',
          FCMtoken: null,
        }
        console.ignoredYellowBox = [
          'Setting a timer'
      ]
      this.FCMtoken = null
   
      

      }

      componentDidMount() {
        
        FCM.getInitialNotification().then((notif)=>{
          console.log("FCM.getInitialNotification");
          console.log(notif)
          if (notif){
            console.log(notif.screen)
            this.setState({screen: notif.screen})
          }
        });

//169.254.131.121
        console.log('DidMOunt  FCM.on  - 2')

        if(Platform.OS ==='ios'){
          FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('user rejected')); // for iOS
        }
          FCM.getFCMToken().then(token => {
              this.setState({isMounted: true, FCMtoken: token})
              // store fcm token in your server
              console.log('FCM TOKEN')
              console.log(token)
          });

          FCM.on(FCMEvent.Notification, async (notif) => {
            
              if (notif){
                console.log(notif.screen)
                this.setState({screen: notif.screen})
              }
          
          });

          this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
              // do some component related stuff
          });
      }
    componentWillMount() {
        var self = this;
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));
        this.setState({isStoreLoading: true});

        AsyncStorage.getItem('completeStore').then((value)=>{
          if(value){
            let initialStore = JSON.parse(value)
           // console.log(initialStore) //  --> we have data from localStorag
            self.setState({store: createStore(reducers, initialStore, middleware)});
          } else{
            self.setState({store: store});
          }
          self.setState({isStoreLoading: false});
        }).then((res)=> {
          //...
        })
    }

    componentWillUnmount() {

        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
        // stop listening for events
        this.notificationListener.remove();
      }
      _handleAppStateChange(currentAppState) {
        let storingValue = JSON.stringify(this.state.store.getState())

        if (storingValue){
           if (storingValue.form){
              storingValue.form.SignUpValidation = {}
           }
        }
      }
/*
    otherMethods(){

            FCM.subscribeToTopic('/topics/foo-bar');
            FCM.unsubscribeFromTopic('/topics/foo-bar');
            FCM.getInitialNotification().then(notif=>console.log(notif));
            FCM.presentLocalNotification({
                id: "UNIQ_ID_STRING",                               // (optional for instant notification)
                title: "My Notification Title",                     // as FCM payload
                body: "My Notification Message",                    // as FCM payload (required)
                sound: "default",                                   // as FCM payload
                priority: "high",                                   // as FCM payload
                click_action: "ACTION",                             // as FCM payload
                badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
                number: 10,                                         // Android only
                ticker: "My Notification Ticker",                   // Android only
                auto_cancel: true,                                  // Android only (default true)
                large_icon: "ic_launcher",                           // Android only
                icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
                big_text: "Show when notification is expanded",     // Android only
                sub_text: "This is a subText",                      // Android only
                color: "red",                                       // Android only
                vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
                tag: 'some_tag',                                    // Android only
                group: "group",                                     // Android only
                picture: "https://google.png",                      // Android only bigPicture style
                ongoing: true,                                      // Android only
                my_custom_data:'my_custom_field_value',             // extra data you want to throw
                lights: true,                                       // Android only, LED blinking (default false)
                show_in_foreground                                  // notification when app is in foreground (local & remote)
            });

            // 'Your next session is on getDate it is at get time. 
            
            FCM.scheduleLocalNotification({
                fire_date: new Date().getTime(),      //RN's converter is used, accept epoch time and whatever that converter supports
                id: "UNIQ_ID_STRING",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
                body: "from future past",
                repeat_interval: "week" //day, hour
            })

            FCM.getScheduledLocalNotifications().then(notif=>console.log(notif));

            //these clears notification from notification center/tray
            FCM.removeAllDeliveredNotifications()
            FCM.removeDeliveredNotification("UNIQ_ID_STRING")

            //these removes future local notifications
            FCM.cancelAllLocalNotifications()
            FCM.cancelLocalNotification("UNIQ_ID_STRING")

            FCM.setBadgeNumber(1);                                       // iOS only and there's no way to set it in Android, yet.
            // FCM.getBadgeNumber().then(number=>console.log(number));     // iOS only and there's no way to get it in Android, yet.
            // FCM.send('984XXXXXXXXX', {
            //   my_custom_data_1: 'my_custom_field_value_1',
            //   my_custom_data_2: 'my_custom_field_value_2'
            // });

            FCM.deleteInstanceId()
                .then( () => {
                  //Deleted instance id successfully
                  //This will reset Instance ID and revokes all tokens.
                })
                .catch(error => {
                  //Error while deleting instance id
                });
        }
        */

     //   _onNotification(notif) {
    //      console.log('_onNotification  - 3')
    //      console.log(notif)
    //    }

        render()
        {
          if (this.state.screen){
            return <Freebie onGoBack={()=> this.setState({screen: undefined})}/>
          }else if(this.state.isStoreLoading){
            return <Text>store is loading... </Text>
          }else if (this.state.isMounted){
            return (
              <Provider  store={this.state.store}>
                <AppWithNavigationState FCMtoken={this.state.FCMtoken} screen={this.state.screen}/>
              </Provider>
            )
          } else {
            return <Text>Wait ... </Text>
          }
        }
}