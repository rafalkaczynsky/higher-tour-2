import React, {Component} from 'react'
import {Button, View} from 'react-native'
import { connect } from 'react-redux';

import _Firebase from '../actions/firebase';
import {Settings} from '../windows'
import * as ACTIONS from '../actions/actions/actions';

class _Settings extends Component {
  constructor(props){
    super(props)

    this.state = {
        signIn: false,
        notificationsOn: true,
        locationOn: true,
    }
  }
  
  handleNotification(){
    this.setState({notificationsOn: !this.state.notificationsOn})
  }

  handleLocation(){
    this.setState({locationOn: !this.state.locationOn})
  }

  handleLogOut(navigate, route){

    const loginStatus = this.props.app.loginStatus  // data from the store

    if (loginStatus === 'loggedOut') {
      navigate('SignIn')
    } else {

      //UPDATE_LOGGIN_STATUS
      this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedOut'))

      _Firebase.logout(navigate, route, this.props.dispatch(ACTIONS.SAVE_USER(null)), this.props.dispatch(ACTIONS.SAVE_SELECTED_EVENT(null)), this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_ITEM(null)), this.props.dispatch(ACTIONS.CLEAR_APP()));
    }  
  }

  handleOnHome(){
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events             // data from the store
    const userData = this.props.user                // data from the store
    const coords = this.props.coords                // data from the store
    const churches = this.props.churches            // data from the store
    const loginStatus = this.props.app.loginStatus  // data from the store

    console.log('handleHome')
    if (loginStatus === 'loggedOut') {
      console.log('From SignIn')
      navigate('SignIn')
    } else if (loginStatus && loginStatus === 'loggedInPlus') {
      navigate('UserProfile')
    }else if (params.from === 'SessionItemYellow'){ 
        console.log('From SessionItem Yellow')
        console.log(params)
        navigate('FindSession',  {activeTabName: 'Home'})
      }else if (params.from === 'SessionItemBrown'){ 
        console.log('From SessionItem Brown')
        console.log(params)
        navigate('UserProfile')
      } else if (params.from === 'UserProfile'){
        console.log('From UserProfile')
        console.log(params)
        navigate('UserProfile')
      } else if (params.from === 'FindSession'){
        console.log('From FindSession')
        console.log(params)
        navigate('FindSession')
      }
      else if (params.from === 'HigherBibleReadings'){
        // =========== TO BE CHECKED ==============
        console.log('From HigherBibleReadings')
        console.log(params)
        navigate('FindSession')
      } else { 
        console.log('From Welcome')
        navigate('Welcome')
      }
    }  

    handleOnBible(navigate, route){
      const { params } = this.props.navigation.state
      const loginStatus = this.props.app.loginStatus  // data from the store

      if (loginStatus === 'loggedOut') {
      navigate(route)
      } else if (loginStatus === 'loggedInPlus') {
        navigate(route)
      }else {
        navigate(route)
      }
  } 
  
//HigherBibleReadings
  componentDidMount(){
    const { params } = this.props.navigation.state
    const loginStatus = this.props.app.loginStatus  // data from the store

    if (loginStatus === 'loggedOut'){
      this.setState({ signIn: false})
    }else{
      this.setState({ signIn: true})
    }
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Settings'))
  }
  
  render() {
    const buttonTextArray = {
      signIn: this.state.signIn ? 'Sign Out' : 'Sign In', 
      notificationsOn: this.state.notificationsOn ? 'Turn Off' : 'Turn On', 
      locationOn: this.state.locationOn ? 'Turn Off' : 'Turn On'
    }

     const { navigate } = this.props.navigation
     const { params } = this.props.navigation.state

     const locations = this.props.events                // data from the store
     const userData = this.props.user                   // data from the store
     const coords = this.props.coords                   // data from the store
     const activeTabName =this.props.app.activeTabName  // data from the store
     const loginStatus = this.props.app.loginStatus


     console.log('Settings Container')
     console.log(params)
     console.log(this.props)
    return (
        <Settings 
          onHome={()=> this.handleOnHome()}  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings')}
          onSignOut={() => this.handleLogOut(navigate, 'SignIn')}
          userData={userData}
          loginStatus={loginStatus}
          onNotifications={() => this.handleNotification()}  
          onLocation={()=> this.handleLocation()}    
          buttonText={buttonTextArray}
          activeTabName={activeTabName}
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

export default connect(mapStateToProps)(_Settings);
