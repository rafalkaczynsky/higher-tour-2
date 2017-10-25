import React, {Component} from 'react'
import {View, ActivityIndicator, Dimensions, Alert} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

import {TabMenu} from '../components'
import {UserProfile} from '../windows' 
import StyleSheet from '../styles'
import * as ACTIONS from '../actions/actions/actions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

class _UserProfile extends Component {
  
  static navigationOptions = {
    gesturesEnabled: false
  };

  constructor(props){
    super(props)

    //default fixed user location when GPS is OFF
     const fixedPosition = {
      coords: {
        accuracy: 500,
        altitude: 0,
        heading: 0,
        latitude:  53.3998261,
        longitude: -2.2522895,  // M22 4RG, Harper Rd, Manchester
        speed: 0,
       }
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.dispatch(ACTIONS.SAVE_COORDS(position.coords));
      },
      error => {
        this.props.dispatch(ACTIONS.SAVE_COORDS(fixedPosition.coords));
        alert('GPS is OFF! Please switch it ON!')
      },
    );
    
  }

  handleOnSettings(navigate, locationSelected, from){
    
    this.props.dispatch( {type: 'SettingsInAnimation'})
  }

  handleOnWeek(sessionTitle, sessionDateFormatted){
    const aaaSession = this.props.aaaSession
    sessionTitle = sessionTitle.toString()

    if(aaaSession[this.props.eventSelected.host]){
      this.props.dispatch(ACTIONS.SAVE_WEEK(aaaSession[this.props.eventSelected.host]))
      this.props.dispatch(ACTIONS.SAVE_WEEK_DATE(sessionDateFormatted))
      this.props.dispatch({type: 'GoToWeekListRightToLeftAnimation'})
    }

    aaaSession.map((item)=> {
      if (item.sessionTitle == sessionTitle) {
        // navigate('WeekList', {week: item})
        this.props.dispatch(ACTIONS.SAVE_WEEK(item))
        this.props.dispatch(ACTIONS.SAVE_WEEK_DATE(sessionDateFormatted))
        this.props.dispatch({type: 'GoToWeekListRightToLeftAnimation'})
      }
    })
  }

  handleOnBible(){
    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
    this.props.dispatch({ type: 'BibleAnimation' }) 
  }

  handleReadingItemPressed(bibleReadingTitle){
    const bibleReading = this.props.bibleReading
    const bibleReadingNames = this.props.bibleReadingNames

    bibleReadingNames.map((item, index)=>{
      //console.log(item[0])
      //console.log(bibleReadingTitle)
      if (item[0] === bibleReadingTitle[0]) {
        this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('item')) 
        this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM_TITLE(bibleReadingTitle))
        this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM(bibleReading[index]))
        this.props.dispatch({type:'AppUserBibleReadingAnimation'})
      }
    })

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

    //console.log(sessionDay)
	  let reminderDay = null
    
	  if (sessionDay !== 0) {  
    	reminderDay = sessionDay 
    } else {
    	reminderDay = 6
    }

    let sessionHour = parseInt(sessionDayTime)
    const minutesIndxStart = sessionDayTime.indexOf(':')+1
    const minutesIndxStop = sessionDayTime.indexOf(':')+ 3
    let sessionMinute = parseInt(sessionDayTime.substring(minutesIndxStart ,minutesIndxStop))

    const ampmIndxStart = sessionDayTime.length - 2 

    let sessionAMPM = sessionDayTime.substring(ampmIndxStart).toUpperCase()

    if (sessionAMPM === 'PM') {
      sessionHour += 12
    }

  //  console.log(sessionAMPM)
  //  console.log(sessionHour+ ' , ' + sessionMinute)
  //  console.log(d)
  //  console.log(sessionDay)

    d.setHours(sessionHour,sessionMinute,0,0);  

    let reminderDate = d.setDate(d.getDate() + (reminderDay+7 - d.getDay())%7)

   // console.log(reminderDate)
    return reminderDate
  }


  componentWillMount(){
    var events = this.props.events  
    var churches = this.props.churches 
    var crd = this.props.coords  
    
    var geoLoc = {}
  // //----------------- map events ----------
  //   events.map((item)=> {
  //     geoLoc = {
  //       latitude:  item.geoLoc.latitude,
  //       longitude: item.geoLoc.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0922 * ASPECT_RATIO,
  //     }
  
  //     let distance = geolib.getDistance(
  //       crd,
  //       geoLoc,
  //     );
    
  //     distance = geolib.convertUnit('mi', distance, 1)
  //     item.howFar = distance
  //   })
  // // -------------- map churches ------------- 
  //   churches.map((item)=> {
  
  //     geoLoc = {
  //       latitude:  item.geoLoc.latitude,
  //       longitude: item.geoLoc.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0922 * ASPECT_RATIO,
  //     }
  
  //     let distance = geolib.getDistance(
  //       crd,
  //       geoLoc,
  //     );
    
  //     distance = geolib.convertUnit('mi', distance, 1)
  //     item.howFar = distance
  //   })
  
    function compareDistance(a, b){
      return a.howFar - b.howFar;
    }
    // const z = churches.sort(compareDistance);
    // const x = events.sort(compareDistance);
  
    // this.props.dispatch(ACTIONS.SAVE_EVENTS(events));
    // this.props.dispatch(ACTIONS.SAVE_CHURCHES(churches));
  
    this.props.dispatch(ACTIONS.UPDATE_SHOW_USERPROFILE_CONTENT(false))
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedInPlus'))

    const userData = this.props.user  
    const eventSelected = this.props.eventSelected   

    // check if session ex in the session...
 
    firebase.database().ref('sessions/'+ eventSelected.host+'/').once("value", snapshot => {

      const session = snapshot.val();
      if (session){
        const sessionArray = Object.keys(session).map(function (key) { return session[key]; })
 
        var TheDate = new Date().getTime();
        var TheDateFormatted = 'dd'

        var sessionsAvailable = []
        sessionArray.map((item, index)=>{
            let sessionDate = item.UTCTime
            if (( Date.parse(sessionDate) > TheDate ) && (sessionsAvailable.length <= 2)) {

              sessionsAvailable.push(item)
              
            }
        })

        if(sessionsAvailable.length === 0){

         // eventSelected.meetingDay = // Monday
         // eventSelected.meetingTime = // 6pm
          const nextMeeting = this.calculateReminderDate(eventSelected.meetingDay, eventSelected.meetingTime)
         // console.log(nextMeeting)
        //  console.log(String(new Date(nextMeeting)))

          nextMetteingObj ={
            'UTCTime': String(new Date(nextMeeting).toISOString()),
            'aaaSession': String(eventSelected.name),
            'expired': true
          }

          sessionsAvailable.push(nextMetteingObj)
        }
        
       // console.log(sessionsAvailable)
        this.props.dispatch(ACTIONS.SAVE_SESSIONS(sessionsAvailable));

        this.props.dispatch(ACTIONS.UPDATE_SHOW_USERPROFILE_CONTENT(true))
      } else {
        console.log('There is no session in firebase ')
        const noSessions = []
        this.props.dispatch(ACTIONS.SAVE_SESSIONS(noSessions));
        this.props.dispatch(ACTIONS.UPDATE_SHOW_USERPROFILE_CONTENT(true))
      }
    })

    //----------------- CHeck app user bibleReadings

    this.firebaseAaaSession = firebase.database().ref('appUsers/');
    firebase.database().ref('appUsers/'+ this.props.user.uid+'/').once("value", snapshot => {
      const appUser = snapshot.val();
      let bibleReadings = appUser.bibleReadings
      //console.log(bibleReadings)
      let bibleReadingNames = appUser.bibleReadings

      if (bibleReadings){
        bibleReadings = Object.keys(bibleReadings).map(function (key, indx, name) { 
          return bibleReadings[key]; 
        })
        this.props.dispatch(ACTIONS.SAVE_APP_USER_BIBLE_READINGS(bibleReadings));
      }

      if (bibleReadingNames){
        bibleReadingNames = Object.keys(bibleReadingNames).map(function (key, indx, name) { 
          let arrayOfNames = []
          arrayOfNames.push(name[indx])
          return  arrayOfNames; 
        })
        this.props.dispatch(ACTIONS.SAVE_APP_USER_BIBLE_READINGS_NAMES(bibleReadingNames));
      }
    })
  }

  componentDidMount(){
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedInPlus'))

   // console.log('Schedule')
    FCM.getScheduledLocalNotifications().then(notif=> {
     // console.log(notif)
    });
  }

  render() {
    this.props.screen = this.props.navigation.screen

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events                 
    const userData = this.props.user                            
    const activeTabName = this.props.app.activeTabName  
    const eventSelected = this.props.eventSelected      
    const sessions = this.props.sessions                
    const bibleReading = this.props.bibleReading       
    const bibleReadingNames = this.props.bibleReadingNames        
    const aaaSession = this.props.aaaSession                     
    const lastReadDayNumber = this.props.app.lastReadDayNumber  
    const appUserBibleReading = this.props.appUserBibleReading  
    const appUserBibleReadingNames =  this.props.appUserBibleReadingNames 
    
    const months = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    const UserProfileScreen= () => 
      <UserProfile
        locations={locations}
        onSettings={()=> this.handleOnSettings(navigate, eventSelected,  "UserProfile")}
        onBible={()=> this.handleOnBible(navigate)}
        onHandleReadingItemPressed={(itemBibleReadingTitle) => this.handleReadingItemPressed(itemBibleReadingTitle)}
        onWeek={(week, sessionDateFormatted)=> this.handleOnWeek(week, sessionDateFormatted)}
        userData={userData}
        months={months}
        aaaSession={aaaSession}
        appUserBibleReading = {appUserBibleReading}
        appUserBibleReadingNames = {appUserBibleReadingNames}
        lastReadDayNumber={lastReadDayNumber}
        onSeeAllReadings={()=> this.handleOnBible()}
        sessions={sessions}
        bibleReading={bibleReading}
        bibleReadingNames={bibleReadingNames}
        locationSelected={eventSelected} 
        handleEditSession={(locationSelected)=> this.props.dispatch({type: 'SessionItemAnimation'})}
        activeTabName={activeTabName}
      />
 
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

  if (this.props.app.showUserProfileContent){
    return <UserProfileScreen/>
  } else return <EmptyScreen/> 
  }
}



function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      churches: state.churches,
      coords: state.coords,
      app: state.app,
      eventSelected: state.eventSelected,
      sessions: state.sessions,
      bibleReading: state.bibleReading,
      bibleReadingNames: state.bibleReadingNames,
      aaaSession: state.aaaSession,
      appUserBibleReading: state.appUserBibleReading,
      appUserBibleReadingNames: state.appUserBibleReadingNames,
  });
}

export default connect(mapStateToProps)(_UserProfile);