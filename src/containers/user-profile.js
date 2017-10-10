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

  handleOnBible(){
    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
    this.props.dispatch({ type: 'BibleAnimation' }) 
  }

  handleReadingItemPressed(bibleReadingTitle){
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
      }
    })

  }

  componentWillMount(){
    var events = this.props.events  
    var churches = this.props.churches 
    var crd = this.props.coords  
    
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
        var TheDateFormatted = 'dd'

        var sessionsAvailable = []
        sessionArray.map((item, index)=>{
            let sessionDate = item.UTCTime
            if (( Date.parse(sessionDate) > TheDate ) && (sessionsAvailable.length <= 2)) {

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
  }

  componentWillUpdate(){

  }


  render() {
    this.props.screen = this.props.navigation.screen
    console.log('qqwedsafdsfdsfdfdfsdfsdfdfsdfdsfsdf')
    console.log(this.props.screen)

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