import React, {Component} from 'react'
import {Button, View} from 'react-native'
import { connect } from 'react-redux';

import _Firebase from '../actions/firebase';
import {Settings} from '../windows'

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
    const { params } = this.props.navigation.state

    if (params.loginStatus === 'loggedOut') {
      navigate('SignIn')
    } else {
      _Firebase.logout(navigate, route);
    }  
  }

  handleOnHome(){
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events   // data from the store
    const userData = this.props.user      // data from the store
    const coords = this.props.coords      // data from the store
    const churches = this.props.churches  // data from the store

    console.log('handleHome')
    if (params.loginStatus === 'loggedOut') {
      console.log('From SignIn')
      navigate('SignIn', {activeTabName: 'Home'})
    } else if (params.loginStatus && params.loginStatus === 'loggedInPlus') {
      navigate('UserProfile',  {locationSelected: params.locationSelected, activeTabName: 'Home', loginStatus: 'loggedInPlus'})
    }else if (params.from === 'SessionItemYellow'){ 
        console.log('From SessionItem Yellow')
        console.log(params)
        navigate('FindSession',  {activeTabName: 'Home'})
      }else if (params.from === 'SessionItemBrown'){ 
        console.log('From SessionItem Brown')
        console.log(params)
        navigate('UserProfile',  {locationSelected: params.locationSelected, activeTabName: 'Home', loginStatus: 'loggedInPlus'})
      } else if (params.from === 'UserProfile'){
        console.log('From UserProfile')
        console.log(params)
        navigate('UserProfile',  {locationSelected: params.locationSelected, activeTabName: 'Home', loginStatus: 'loggedInPlus'})
      } else if (params.from === 'FindSession'){
        console.log('From FindSession')
        console.log(params)
        navigate('FindSession',  {locationSelected: params.locationSelected, activeTabName: 'Home'})
      }
      else if (params.from === 'HigherBibleReadings'){
        // =========== TO BE CHECKED ==============
        console.log('From HigherBibleReadings')
        console.log(params)
        navigate('FindSession',  {locationSelected: params.locationSelected,activeTabName: 'Home'})
      } else { 
        console.log('From Welcome')
        navigate('Welcome', {activeTabName: 'Home'})
      }
    }  

    handleOnBible(navigate, route, locationSelected){
      const { params } = this.props.navigation.state
      if (params.loginStatus === 'loggedOut') {
      navigate(route, { activeTabName: 'Bible',loginStatus: 'loggedOut'})
      } else if (params.loginStatus === 'loggedInPlus') {
        navigate(route, { activeTabName: 'Bible', loginStatus: 'loggedInPlus', locationSelected: locationSelected})
      }else {
        navigate(route, {activeTabName: 'Bible', loginStatus: 'loggedIn'})
      }
  } 
  
//HigherBibleReadings
  componentDidMount(){
    const { params } = this.props.navigation.state

    if (params.loginStatus === 'loggedOut'){
      this.setState({ signIn: false})
    }else{
      this.setState({ signIn: true})
    }
  }
  
  render() {
    const buttonTextArray = {
      signIn: this.state.signIn ? 'Sign Out' : 'Sign In', 
      notificationsOn: this.state.notificationsOn ? 'Turn Off' : 'Turn On', 
      locationOn: this.state.locationOn ? 'Turn Off' : 'Turn On'
    }

     const { navigate } = this.props.navigation
     const { params } = this.props.navigation.state

     const locations = this.props.events    // data from the store
     const userData = this.props.user       // data from the store
     const coords = this.props.coords       // data from the store

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
          activeTabName={params.activeTabName}
        />
    )
  }
}


function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      churches: state.churches,
      coords: state.coords
  });
}

export default connect(mapStateToProps)(_Settings);
