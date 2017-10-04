import React, {Component} from 'react'
import {View, ActivityIndicator, Dimensions} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import {TabMenu} from '../components'
import {UserProfile} from '../windows' 
import StyleSheet from '../styles'
import * as ACTIONS from '../actions/actions/actions';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

class _UserProfile extends Component {

  constructor(props){
    super(props)

  }

  handleOnSettings(navigate, locationSelected, from){
    this.props.dispatch( {type: 'SettingsInAnimation'})
    //navigate('Settings', { locationSelected: locationSelected, from: from})
  }

  handleOnWeek(navigate, sessionTitle){
    const aaaSession = this.props.aaaSession
    sessionTitle = sessionTitle.toString()
    aaaSession.map((item)=> {
      if (item.sessionTitle == sessionTitle) {
        // navigate('WeekList', {week: item})
        this.props.dispatch(ACTIONS.SAVE_WEEK(item))
        this.props.dispatch({type: 'GoToWeekListRightToLeftAnimation'})

      }
    })
  }

  handleOnBible(navigate){
    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
    //navigate('HigherBibleReadings')
    this.props.dispatch({ type: 'BibleAnimation' }) 
  }

  handleReadingItemPressed(bibleReadingTitle){
    console.log('On Item clicked')
    const { navigate } = this.props.navigation
    const bibleReading = this.props.bibleReading
    const bibleReadingNames = this.props.bibleReadingNames

    bibleReadingNames.map((item, index)=>{
      console.log(item[0])
      console.log(bibleReadingTitle)
      if (item[0] === bibleReadingTitle[0]) {

        this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('item')) 
        this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM_TITLE(bibleReadingTitle))
        this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM(bibleReading[index]))
        this.props.dispatch({type:'AppUserBibleReadingAnimation'})
        //navigate('HigherBibleReadings')
      }
    })

  }


  componentWillMount(){
    var events = this.props.events  // data from the store 
    var churches = this.props.churches // data from the store
    var crd = this.props.coords  // data from the store
    
    var geoLoc = {}
  //----------------- map events ----------
    events.map((item)=> {
      geoLoc = {
        latitude:  item.geoLoc.latitude,
        longitude: item.geoLoc.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * ASPECT_RATIO,
      }
  
      let distance = geolib.getDistance(
        crd,
        geoLoc,
      );
    
      distance = geolib.convertUnit('mi', distance, 1)
      item.howFar = distance
    })
  // -------------- map churches ------------- 
    churches.map((item)=> {
  
      geoLoc = {
        latitude:  item.geoLoc.latitude,
        longitude: item.geoLoc.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0922 * ASPECT_RATIO,
      }
  
      let distance = geolib.getDistance(
        crd,
        geoLoc,
      );
    
      distance = geolib.convertUnit('mi', distance, 1)
      item.howFar = distance
    })
  
    function compareDistance(a, b){
      return a.howFar - b.howFar;
    }
    const z = churches.sort(compareDistance);
    const x = events.sort(compareDistance);
  
    this.props.dispatch(ACTIONS.SAVE_EVENTS(events));
    this.props.dispatch(ACTIONS.SAVE_CHURCHES(churches));

   
              
    this.props.dispatch(ACTIONS.UPDATE_SHOW_USERPROFILE_CONTENT(false))
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedInPlus'))

    const userData = this.props.user  
    const eventSelected = this.props.eventSelected   

    // check if session ex in the session...
 
    console.log('ComponentWillMount of UserProfile container')
    firebase.database().ref('sessions/'+ eventSelected.host+'/').once("value", snapshot => {
      const session = snapshot.val();

      if (session){
        const sessionArray = Object.keys(session).map(function (key) { return session[key]; })
 
        var TheDate = new Date().getTime();
        var TheDateFormatted = 'dd'//TheDate.substring(5,7)+'/'+TheDate.substring(8,10)+'/'+TheDate.substring(0,4);

        console.log(TheDate)
      
        var sessionsAvailable = []
        sessionArray.map((item, index)=>{
            let sessionDate = item.UTCTime
            if (( Date.parse(sessionDate) > TheDate ) && (sessionsAvailable.length <= 2)) {
              //const sessionDateFormatted = sessionDate.substring(5,7)+'/'+sessionDate.substring(8,10)+'/'+sessionDate.substring(0,4)
              //console.log(sessionDateFormatted)
              sessionsAvailable.push(item)
            }
        })

       // console.log(sessionsAvailable)
        this.props.dispatch(ACTIONS.SAVE_SESSIONS(sessionsAvailable));
        this.props.dispatch(ACTIONS.UPDATE_SHOW_USERPROFILE_CONTENT(true))
      }
    })

    //----------------- CHeck app user bibleReadings

    this.firebaseAaaSession = firebase.database().ref('appUsers/');
    firebase.database().ref('appUsers/'+ this.props.user.uid+'/').once("value", snapshot => {
      const appUser = snapshot.val();
      let bibleReadings = appUser.bibleReadings
      console.log(bibleReadings)
      let bibleReadingNames = appUser.bibleReadings

      bibleReadings = Object.keys(bibleReadings).map(function (key, indx, name) { 
        return bibleReadings[key]; 
      })

      bibleReadingNames = Object.keys(bibleReadingNames).map(function (key, indx, name) { 
        let arrayOfNames = []
        arrayOfNames.push(name[indx])
        return  arrayOfNames; 
      })

      //save it to the redux store in to arrays, content and names
      this.props.dispatch(ACTIONS.SAVE_APP_USER_BIBLE_READINGS(bibleReadings));
      this.props.dispatch(ACTIONS.SAVE_APP_USER_BIBLE_READINGS_NAMES(bibleReadingNames));
    })


  }

  componentDidMount(){
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedInPlus'))
  }
  
  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events                 // data from the store
    const userData = this.props.user                    // data from the store         
    const activeTabName = this.props.app.activeTabName  // data from the store
    const eventSelected = this.props.eventSelected      // data from the store
    const sessions = this.props.sessions                // data from the store
    const bibleReading = this.props.bibleReading        // data from the store
    const bibleReadingNames = this.props.bibleReadingNames        // data from the store
    const aaaSession = this.props.aaaSession                     // data from the store
    const lastReadDayNumber = this.props.app.lastReadDayNumber   // data from the store

    const appUserBibleReading = this.props.appUserBibleReading   // data from the store
    const appUserBibleReadingNames =  this.props.appUserBibleReadingNames // data from the store
    
    console.log('UserProfile Container')
    const months = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
    


    const UserProfileScreen= () => 
      <UserProfile
        locations={locations}
        onSettings={()=> this.handleOnSettings(navigate, eventSelected,  "UserProfile")}
        onBible={()=> this.handleOnBible(navigate)}
        onHandleReadingItemPressed={(itemBibleReadingTitle) => this.handleReadingItemPressed(itemBibleReadingTitle)}
        onWeek={(week)=> this.handleOnWeek(navigate, week)}
        userData={userData}
        months={months}
        aaaSession={aaaSession}
        appUserBibleReading = {appUserBibleReading}
        appUserBibleReadingNames = {appUserBibleReadingNames}
        lastReadDayNumber={lastReadDayNumber}
        onSeeAllReadings={()=> this.props.dispatch({ type: 'BibleAnimation' }) }
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