import React, {Component} from 'react'
import {View, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import {TabMenu} from '../components'
import {UserProfile} from '../windows' 
import StyleSheet from '../styles'
import * as ACTIONS from '../actions/actions/actions';

class _UserProfile extends Component {

  constructor(props){
    super(props)

  }

  handleOnSettings(navigate, locationSelected, from){
    navigate('Settings', { locationSelected: locationSelected, from: from})
  }

  handleOnWeek(navigate, week){
    navigate('Read', {week: week})
  }

  handleOnBible(navigate, locationSelected, from){
    navigate('HigherBibleReadings', { locationSelected: locationSelected, from: from})
  }

  handleReadingItemPressed(itemBibleReading, itemBibleReadingTitle){
    // bibleReading Item Was pressed ...
    const { navigate } = this.props.navigation
    console.log(itemBibleReading)
    itemBibleReading = Object.keys(itemBibleReading).map(function (key) { return itemBibleReading[key]; })
    console.log(itemBibleReading)
    //set into Redux Store 
    //BibleReadingScreen - list or item       
    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('item'))
    //currentReading - bibleReading
    this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM(itemBibleReading))
    //itemBibleReadingTitle
    this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM_TITLE(itemBibleReadingTitle))
    console.log('lalalalala'+ itemBibleReadingTitle)
    navigate('HigherBibleReadings')
  }

  componentWillMount(){

    const userData = this.props.user                    // data from the store    
    this.props.dispatch(ACTIONS.UPDATE_SHOW_USERPROFILE_CONTENT(false))
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedInPlus'))

    const eventSelected = this.props.eventSelected      // data from the store

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
    const aaaSession = this.props.aaaSession                     // data from the store
    const lastReadDayNumber = this.props.app.lastReadDayNumber   // data from the store
    console.log('UserProfile Container')
    const months = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
    


    const UserProfileScreen= () => 
      <UserProfile
        locations={locations}
        onSettings={()=> this.handleOnSettings(navigate, eventSelected,  "UserProfile")}
        onBible={()=> this.handleOnBible(navigate, eventSelected,  "UserProfile")}
        onHandleReadingItemPressed={(itemBibleReading, itemBibleReadingTitle) => this.handleReadingItemPressed(itemBibleReading, itemBibleReadingTitle)}
        onWeek={(week)=> this.handleOnWeek(navigate, week)}
        userData={userData}
        months={months}
        aaaSession={aaaSession}
        lastReadDayNumber={lastReadDayNumber}
        sessions={sessions}
        bibleReading={bibleReading}
        locationSelected={eventSelected} 
        handleEditSession={(locationSelected)=> navigate('SessionItem', {locationSelected: locationSelected, cancelLabel: true, cancelLabel: true})}
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
      app: state.app,
      eventSelected: state.eventSelected,
      sessions: state.sessions,
      bibleReading: state.bibleReading,
      aaaSession: state.aaaSession
  });
}

export default connect(mapStateToProps)(_UserProfile);