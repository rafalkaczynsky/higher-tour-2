import React, {Component} from 'react'
import {Linking} from 'react-native'
import { connect } from 'react-redux';
import * as firebase from 'firebase'

import {ChurchItem} from '../windows'
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

class _ChurchItem extends Component {

  constructor(props){
    super(props)

    this.state = {
      allSessions: '',
      churchSelected: {},
    }
  }

  handleOnGoBack(){
    const loginStatus = this.props.app.loginStatus

    if (loginStatus === 'loggedInPlus') {
      this.props.dispatch({type: 'SessionItemAnimation'})
     } else {
      this.props.dispatch({type: 'FindChurchesAnimation'})
     }
  }

  handleOnSettings(navigate, from){
    this.props.dispatch({type: 'SettingsInAnimation'})
  }

  handleOnHome(navigate, from){
    const cancelLabel = this.props.app.cancelLabel

    if (cancelLabel){
        this.props.dispatch({type: 'UserProfileOnHomeAnimation'})
    } else {
        this.props.dispatch({type: 'GotoWelcomeAnimation'})
    }
  }

  handleOnBible(){
    this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
    this.props.dispatch({ type: 'BibleAnimation' }) 
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


  componentDidMount(){
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME(''))
  }

  render() {
    const { navigate } = this.props.navigation

    const churchSelected = this.props.selectedChurch
    const userData = this.props.user                   
    const activeTabName = this.props.app.activeTabName  
    const loginStatus = this.props.app.loginStatus    

    console.log('ChurchItem Container')
    console.log(churchSelected)
    return (
        <ChurchItem 
          onHome={()=> this.handleOnHome(navigate)}
          onSettings={()=> this.handleOnSettings(navigate)}
          onGoBack={()=> this.handleOnGoBack()}
          onBible={()=> this.handleOnBible(navigate)}
          onTelPressed={(telephone)=> this.handleOnTelPressed(telephone)}
          onEmailPressed={(email)=> this.handleOnEmailPressed(email)}
          onWebPressed={(website)=> this.handleOnWebPressed(website)}
          loginStatus={loginStatus}
          myPosition={myPosition[0]}
          church={churchSelected}
          activeTabName={activeTabName}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      app: state.app,
      selectedChurch: state.selectedChurch
  });
}

export default connect(mapStateToProps)(_ChurchItem);

