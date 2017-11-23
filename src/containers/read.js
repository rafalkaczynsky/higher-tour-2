import React, {Component} from 'react'
import geolib from 'geolib'
import { connect } from 'react-redux';
import * as firebase from 'firebase'

import {BackHandler} from 'react-native'

import Sound from 'react-native-sound'


import {Read} from '../windows'
import * as ACTIONS from '../actions/actions/actions';

class _Read extends Component {
  constructor(props){
    super(props)

    this.state = {
      soundLoader: true,
    }

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    
}

handleOnBible(navigate, from){
  this.sound.release();
  
  this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
  this.props.dispatch({ type: 'BibleAnimation' }) 
}

handleOnSettings(navigate){
   this.sound.release();

  this.props.dispatch( {type: 'SettingsInAnimation'})
}

handleHome(navigate){

  if(this.sound) this.sound.release();
  
  const loginStatus = this.props.app.loginStatus  // data from the store
  
      if (loginStatus && loginStatus === 'loggedOut') {
        this.props.dispatch({type: 'SignInOnHomeAnimation'})
      } else if (loginStatus && loginStatus === 'loggedInPlus') {
        this.props.dispatch({type: 'UserProfileOnHomeAnimation'}) 
      } else { 
        this.props.dispatch({type: 'GotoWelcomeAnimation'})
      }
}

componentWillMount(){

  this.setState({soundLoader: true})

  console.log('Component Will Mount')
  const currentDayContent = this.props.app.currentDayContent              // data from the store
  
  this.sound = new Sound(currentDayContent.Listen, undefined, (error) => {

  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
     this.setState({soundLoader: false})
    console.log('duration in seconds: ' + this.sound.getDuration() + 'number of channels: ' + this.sound.getNumberOfChannels());
  });

  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
}

componentWillUnmount() {
  console.log('Component Will Un Mount')
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
  this.sound.release();

  this.props.navigation.goBack(null);
  return true;
}

handleOnPlay(musicUrl){

// Play the sound with an onEnd callback
this.sound.play((success) => {
  if (success) {
    console.log('successfully finished playing');
  } else {
    console.log('playback failed due to audio decoding errors');
    // reset the player to its uninitialized state (android only)
    // this is the only option to recover after an error occured and use the player again
    this.sound.release();
  }
 });
}

handleOnStop(){
 this.sound.pause();
 //this.sound.release();
}

componentDidMount(){

  const userData = this.props.user          
  const currentBibleReading = this.props.currentBibleReading
  const currentReadingDayNumber = this.props.app.currentReadingDayNumber
  const currentBibleReadingTitle = this.props.app.currentBibleReadingTitle                    
  const loginStatus = this.props.app.loginStatus
  
  if (loginStatus!=='loggedOut') {

    const firebaseDataAppUsers = firebase.database().ref('appUsers/'+ userData.uid +'/bibleReadings/'+ currentBibleReadingTitle +'/');    
      firebase.database().ref('appUsers/'+ userData.uid +'/bibleReadings/'+ currentBibleReadingTitle +'/').once("value", snapshot => {
        const bibleReading = snapshot.val();

        if (bibleReading !== null){       
          if (bibleReading.lastReadDayNumber < currentReadingDayNumber ) {
            firebaseDataAppUsers.update({
              lastReadTimeStamp: new Date().getTime(),
              lastReadDayNumber : currentReadingDayNumber,
              progress: parseInt((currentReadingDayNumber/ currentBibleReading.length) *100 )
            })
          }  
        } else {
          firebaseDataAppUsers.update({
            lastReadTimeStamp: new Date().getTime(),
            lastReadDayNumber : currentReadingDayNumber,
            progress: parseInt((currentReadingDayNumber/ currentBibleReading.length) *100 )
          })
        }
 
      })
  }
}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const userData = this.props.user                                        // data from the store
    const loginStatus = this.props.app.loginStatus                          // data from the store
    const currentDayContent = this.props.app.currentDayContent              // data from the store
    const currentReadingDayNumber = this.props.app.currentReadingDayNumber  // data from the store
  
    console.log('currentDayContent')
    console.log(currentDayContent.Listen)
    console.log('soundLoader')
    console.log(this.state.soundLoader)
    return (
        <Read 
          onSettings={()=> this.handleOnSettings(navigate)}
          onHome={()=> this.handleHome(navigate)}
          userData={userData}
          soundLoader={this.state.soundLoader}
          goToHome={()=> null}
          onPlayPressed={(musicUrl)=> this.handleOnPlay(musicUrl)}
          onStopPressed={() => this.handleOnStop()}
          onItemBackPressed={()=>{
              if(this.sound) this.sound.release();
              this.props.dispatch({type: 'GoToHigherRightToLeftAnimation'})
            }
          }
          onItemNextPressed={()=>{
              if(this.sound) this.sound.release();
              this.props.dispatch({type: 'GoToThinkLeftToRightAnimation'})
            }
          }
          currentReadingDayNumber={currentReadingDayNumber}
          itemDay={currentDayContent}
          activeTabName={'Bible'}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      app: state.app,
      currentBibleReading: state.currentBibleReading,
      currentReadingDayNumber: state.currentReadingDayNumber,

  });
}

export default connect(mapStateToProps)(_Read);
