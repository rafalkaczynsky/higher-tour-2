import React, {Component} from 'react'
import {UserProfile} from '../windows'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import * as ACTIONS from '../actions/actions/actions';

class _UserProfile extends Component {

  constructor(props){
    super(props)

  }

  handleOnSettings(navigate, locationSelected, from){
    navigate('Settings', { locationSelected: locationSelected, from: from})
  }

  handleOnBible(navigate, locationSelected, from){
    navigate('HigherBibleReadings', { locationSelected: locationSelected, from: from})
  }

  componentWillMount(){
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedInPlus'))

    const eventSelected = this.props.eventSelected      // data from the store
    // check if session ex in the session...

    console.log(eventSelected.id)
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
    const sessions = this.props.sessions      // data from the store

    console.log('UserProfile Container')
    console.log(params)
    console.log(this.props)

    const months = ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
    
    return (
        <UserProfile
          locations={locations}
          onSettings={()=> this.handleOnSettings(navigate, eventSelected,  "UserProfile")}
          onBible={()=> this.handleOnBible(navigate, eventSelected,  "UserProfile")}
          userData={userData}
          months={months}
          locationSelected={eventSelected} 
          handleEditSession={(locationSelected)=> navigate('SessionItem', {locationSelected: locationSelected, cancelLabel: true, cancelLabel: true})}
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
      sessions: state.sessions,
  });
}

export default connect(mapStateToProps)(_UserProfile);