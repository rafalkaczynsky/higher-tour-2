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
      _Firebase.logout(navigate, route);
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
      navigate('UserProfile',  {locationSelected: params.locationSelected})
    }else if (params.from === 'SessionItemYellow'){ 
        console.log('From SessionItem Yellow')
        console.log(params)
        navigate('FindSession',  {activeTabName: 'Home'})
      }else if (params.from === 'SessionItemBrown'){ 
        console.log('From SessionItem Brown')
        console.log(params)
        navigate('UserProfile',  {locationSelected: params.locationSelected})
      } else if (params.from === 'UserProfile'){
        console.log('From UserProfile')
        console.log(params)
        navigate('UserProfile',  {locationSelected: params.locationSelected})
      } else if (params.from === 'FindSession'){
        console.log('From FindSession')
        console.log(params)
        navigate('FindSession',  {locationSelected: params.locationSelected})
      }
      else if (params.from === 'HigherBibleReadings'){
        // =========== TO BE CHECKED ==============
        console.log('From HigherBibleReadings')
        console.log(params)
        navigate('FindSession',  {locationSelected: params.locationSelected})
      } else { 
        console.log('From Welcome')
        navigate('Welcome')
      }
    }  

    handleOnBible(navigate, route, locationSelected){
      const { params } = this.props.navigation.state
      const loginStatus = this.props.app.loginStatus  // data from the store

      if (loginStatus === 'loggedOut') {
      navigate(route)
      } else if (loginStatus === 'loggedInPlus') {
        navigate(route, { locationSelected: locationSelected})
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

     console.log('Settings Container')
     console.log(params)
     console.log(this.props)
    return (
        <Settings 
          onHome={()=> this.handleOnHome()}  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings', params.locationSelected)}
          onSignOut={() => this.handleLogOut(navigate, 'SignIn')}
          userData={userData}
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
