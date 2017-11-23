import React, {Component} from 'react'
import {Button, View} from 'react-native'
import { connect } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob'
import Sound from 'react-native-sound'
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

 download(type, url){
  //https://stackoverflow.com/questions/42584718/how-to-download-and-retrieve-local-files-on-ios-with-react-native-and-react-nati
  
  const section =  {
    section_id: '123456789',
    section_url: url
  }


      //console.log('download start for id = ',section.section_id ) //start download
    RNFetchBlob
      .config({
        path: RNFetchBlob.fs.dirs.DocumentDir + '/courseSections/' + section.section_id + '.mp3',
        appendExt: 'mp3'
      })
      .fetch('GET', section.section_url, {
        'Cache-Control': 'no-store'
      })
      .progress({ count: 10 }, (received, total) => {
       // console.log(`progress for section ${section.section_id}: `, Math.floor(received/total*100), '%')
       // console.log('id: '+ section.section_id + ', progress: ' + Math.floor(received/total*100)/100)
      })
      .then(res => {
      //  console.log(`section ${section.section_id} is saved to: `, res.path())
        filePath = RNFetchBlob.fs.dirs.DocumentDir + '/' + section.section_id + '.mp3'
        return { path: filePath, id: section.section_id }
      })
      .then(pathInfo => console.log(pathInfo)) //download finished
    }
  

   // ANDROID WORKING VERSION  BELOW 
   /*
  let downloadDest = null 
  let extension = 'txt'

  switch(type) {
    case 'image':
        downloadDest = RNFetchBlob.fs.dirs.PictureDir 
        extension= '.jpg'
        break;
    case 'music':
        downloadDest = RNFetchBlob.fs.dirs.MusicDir 
        extension= '.mp3'
        break;
    case 'video':
        downloadDest = RNFetchBlob.fs.dirs.MovieDir 
        extension= '.avi'
        break;
    default:
        downloadDest = RNFetchBlob.fs.dirs.DownloadDir 
  }
  
  downloadDest = downloadDest +'/higher-tour-' + type + extension;

  console.log(RNFetchBlob.fs.dirs)
  RNFetchBlob
  .config({  
      addAndroidDownloads : {
          path : downloadDest,
          useDownloadManager : true, // <-- this is the only thing required
          // Optional, override notification setting (default to true)
          notification : true,
          // Optional, but recommended since android DownloadManager will fail when
          // the url does not contains a file extension, by default the mime type will be text/plain
          mime : 'image/jpg',
          description : 'File downloaded by download manager.'
      }
  })
  .fetch('GET', url)
  .then((resp) => {
    // the path of downloaded file
    console.log('The file saved to ', resp.path())
  })
  */
 
  handleOnPlay(musicUrl){
    //console.log('Play')
      this.sound = new Sound(musicUrl,
        undefined,
        error => {
          if (error) {
            console.log(error)
          } else {
           // console.log("Playing sound");
            this.sound.play(() => {
              // Release when it's done so we're not using up resources
              this.sound.release();
            });
          }
        });

      this.sound.play(() => {
        // Release when it's done so we're not using up resources
        this.sound.release();
      });
 
  }
  
  handleOnStop(){
    this.sound.pause();
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
   //http://www.planwallpaper.com/static/images/33ca912357a40f021a78ef6e06ba1ace.jpg
   //https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3
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
          onPlay={()=>this.handleOnPlay("/var/mobile/Containers/Data/Application/C9A1F664-93F9-42D5-A1DF-66A8184CB763/Documents/123456789.mp3")}
          userData={userData}
          download={()=>this.download('image', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')} 
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
