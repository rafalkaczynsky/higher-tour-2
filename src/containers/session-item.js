import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as firebase from 'firebase'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import {Linking} from 'react-native'

import { NavigationActions } from 'react-navigation'

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

    this.handleOnTelPressed = this.handleOnTelPressed.bind(this)
  }

  calculateReminderDate(sessionDayName, sessionDayTime){
    let d = new Date();

    let weekday = new Array(7);
    weekday[0] = "Sunday"
    weekday[1] = "Monday"
    weekday[2] = "Tuesday"
    weekday[3] = "Wednesday"
    weekday[4] = "Thursday"
    weekday[5] = "Friday"
    weekday[6] = "Saturday"

    let sessionDay = weekday.indexOf(sessionDayName) // is 5
	  let reminderDay = null
    
	  if (sessionDay !== 0) {  
    	reminderDay = sessionDay - 1
    } else {
    	reminderDay = 6
    }

    let sessionHour = parseInt(sessionDayTime)
    const minutesIndxStart = sessionDayTime.indexOf(':')+1
    const minutesIndxStop = sessionDayTime.indexOf(':')+ 3
    let sessionMinute = parseInt(sessionDayTime.substring(minutesIndxStart ,minutesIndxStop))

    const ampmIndxStart = sessionDayTime.length - 2 

    let sessionAMPM = sessionDayTime.substring(ampmIndxStart)

    if (sessionAMPM === 'PM') {
      sessionHour += 12
    }

    d.setHours(sessionHour,sessionMinute,0,0);  

    let reminderDate = d.setDate(d.getDate() + (reminderDay+7 - d.getDay())%7)

    return reminderDate
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
      uid: userData.uid,
      FCMtoken: this.props.navigation.FCMtoken,
    })

    FCM.subscribeToTopic(eventSelected.host);
    const schedulNotifBody = "Your next session is on this " + eventSelected.meetingDay + " it is at " + eventSelected.meetingTime 
   // 'Your next session is on getDate it is at get time. )

    FCM.scheduleLocalNotification({
      fire_date: this.calculateReminderDate(eventSelected.meetingDay, eventSelected.meetingTime),
      id: "schedule_reminder_notif_01",
      title: 'Session Reminder',
      body: schedulNotifBody,
      show_in_foreground: true,
      priority: 'high',
      repeat_interval: "week"
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
    FCM.unsubscribeFromTopic(this.props.eventSelected.host)
    FCM.cancelAllLocalNotifications()
    this.props.dispatch(ACTIONS.UPDATE_FOLLOW_STATUS(false)) 
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedIn')) 
    //this.props.dispatch({type:'FindSessionAnimation'})
    this.props.dispatch({type: 'Navigation/RESET', index: 0, actions: [{ type: 'Navigate', routeName:'Welcome'}]})
  }

  handleOnSettings(){
    this.props.dispatch({type: 'SettingsInAnimation'})
  }

  handleOnHome(navigate){
    const loginStatus = this.props.app.loginStatus

    if (loginStatus && loginStatus === 'loggedInPlus') {
      this.props.dispatch({type: 'UserProfileOnHomeAnimation'}) 
    } else { 
        this.props.dispatch({type: 'GotoWelcomeAnimation'})
      }

  }

  handleOnBible(navigate, locationSelected,  from){
    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
    this.props.dispatch({ type: 'BibleAnimation' }) 
  }

  handleOnHostPressed(navigate){
    this.props.dispatch({type: 'GotoChurchItemAnimation'})
  }

  handleOnTelPressed(telephone){
    if (telephone) Linking.openURL("tel:"+telephone)
  }

  handleOnWebPressed(website){
    if (website) Linking.openURL(website)
  }

  handleOnEmailPressed(email){
    if (email) Linking.openURL("mailto://"+email)
  }

  handleOnGoBack(){
    this.props.navigation.dispatch(NavigationActions.back())
/*    const loginStatus  = this.props.app.loginStatus   

    if (loginStatus === 'loggedIn'){
      this.props.dispatch({type: 'FindSessionAnimation'})
    } else {//                  
      this.props.dispatch({type: 'UserProfileOnStartSessionAnimation'})
    }*/
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

    const locations = this.props.events               
    const userData = this.props.user                   
    const activeTabName =this.props.app.activeTabName 
    const eventSelected  =this.props.eventSelected     
    const loginStatus  = this.props.app.loginStatus   
    const churchSelected = this.props.selectedChurch

    return (
        <SessionItem 
          onHome={()=> this.handleOnHome(navigate)}
          onSettings={()=> this.handleOnSettings()}
          onBible={()=> this.handleOnBible(navigate)}
          onTelPressed={(telephone)=> this.handleOnTelPressed(telephone)}
          onEmailPressed={(email)=> this.handleOnEmailPressed(email)}
          onWebPressed={(website)=> this.handleOnWebPressed(website)}
          onGoBack={()=> this.handleOnGoBack()}
          myPosition={myPosition[0]}
          location={eventSelected}
          churchSelected={churchSelected}
          onHostPressed={()=> this.handleOnHostPressed(navigate)}
          cancelLabel= {loginStatus === 'loggedInPlus' ? true :false}
          onStopSession={()=> this.handleOnStopSession(navigate, 'FindSession')}
          onStartSession={(location)=> {
            this.handleOnStartSession(navigate, 'UserProfile', location)}
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

