import React, {Component} from 'react'
import {Button, View} from 'react-native'
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob'

import _Firebase from '../actions/firebase';
import {Freebie} from '../windows'
import * as ACTIONS from '../actions/actions/actions';
import { NavigationActions } from 'react-navigation'

class _Freebie extends Component {
  constructor(props){
    super(props)
  }
  
  handleOnHome(){
    this.props.dispatch(ACTIONS.UPDATE_QUESTION_INDEX(0))
    const resetActionSignIn = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn'})
      ]
    })
      
    const resetActionUserProfile = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'UserProfile'})
      ]
    })
      
    const resetActionWelcome = NavigationActions.reset({
      index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Welcome'})
        ]
    })
      
      
    const loginStatus = this.props.app.loginStatus  // data from the store
      
    if (loginStatus && loginStatus === 'loggedOut') {
      //this.props.dispatch({type: 'SignInOnHomeAnimation'})
      this.props.dispatch(resetActionSignIn)
    } else if (loginStatus && loginStatus === 'loggedInPlus') {
      // this.props.dispatch({type: 'UserProfileOnHomeAnimation'})
      this.props.dispatch(resetActionUserProfile)
    } else {
      // this.props.dispatch({type: 'GotoWelcomeAnimation'})
      this.props.dispatch(resetActionWelcome)
    }
 }

 download(){
   console.log('download')

   //save in local storage of app
  RNFetchBlob
  .config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache : true,
  })
  .fetch('GET', 'http://www.planwallpaper.com/static/images/33ca912357a40f021a78ef6e06ba1ace.jpg', {
    //some headers ..
  })
  .then((res) => {
    // the temp file path
    console.log('The file saved to ', res.path())
  })

  RNFetchBlob
  .config({
      addAndroidDownloads : {
          useDownloadManager : true, // <-- this is the only thing required
          // Optional, override notification setting (default to true)
          notification : true,
          // Optional, but recommended since android DownloadManager will fail when
          // the url does not contains a file extension, by default the mime type will be text/plain
          mime : 'text/plain',
          description : 'File downloaded by download manager.'
      }
  })
  .fetch('GET', 'http://www.planwallpaper.com/static/images/33ca912357a40f021a78ef6e06ba1ace.jpg')
  .then((resp) => {
    // the path of downloaded file
    resp.path()
  })
 }

  handleOnBible(navigate, route){
      this.props.dispatch(ACTIONS.UPDATE_QUESTION_INDEX(0))
      this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
      this.props.dispatch({ type: 'BibleAnimation' }) 
  } 

  handleOnGoBack(){
    this.props.navigation.dispatch(NavigationActions.back())
  }
  
  handleOnSettings(){
    this.props.dispatch( {type: 'SettingsInAnimation'})
  }

  componentDidMount(){

  }
  
  render() {

     const { navigate } = this.props.navigation
     const { params } = this.props.navigation.state

     const locations = this.props.events                // data from the store
     const userData = this.props.user                   // data from the store
     const loginStatus = this.props.app.loginStatus

    return (
        <Freebie 
          onHome={()=> this.handleOnHome()}  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings')}
          onGoBack={()=> this.handleOnGoBack()}
          onSettings={()=> this.handleOnSettings()}
          userData={userData}
          download={()=>this.download()}
          loginStatus={loginStatus}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      churches: state.churches,
      coords: state.coords,
      app: state.app,
  });
}

export default connect(mapStateToProps)(_Freebie);
