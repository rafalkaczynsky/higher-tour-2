import React, {Component} from 'react'
import {Button, View} from 'react-native'

import _Firebase from '../actions/firebase';


import {Settings} from '../windows'

export default class _Settings extends Component {
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
    
    console.log('handleHome')
    if (params.loginStatus === 'loggedOut') {
      console.log('From SignIn')
      navigate('SignIn', {activeTabName: 'Home'})
    } else if (params.from === 'SessionItemYellow'){ 
        console.log('From SessionItem Yellow')
        console.log(params)
        navigate('FindSession',  {userData: params.userData, locations: params.locations, activeTabName: 'Home'})
      }else if (params.from === 'SessionItemBrown'){ 
        console.log('From SessionItem Brown')
        console.log(params)
        navigate('UserProfile',  {userData: params.userData, locationSelected: params.locationSelected, locations: params.locations, activeTabName: 'Home'})
      } else if (params.from === 'UserProfile'){
        console.log('From UserProfile')
        console.log(params)
        navigate('UserProfile',  {userData: params.userData, locationSelected: params.locationSelected, locations: params.locations, activeTabName: 'Home'})
      } else if (params.from === 'FindSession'){
        console.log('From FindSession')
        console.log(params)
        navigate('FindSession',  {userData: params.userData, locationSelected: params.locationSelected, locations: params.locations, activeTabName: 'Home'})
      }
      else if (params.from === 'HigherBibleReadings'){
        // =========== TO BE CHECKED ==============
        console.log('From HigherBibleReadings')
        console.log(params)
        navigate('FindSession',  {userData: params.userData, locationSelected: params.locationSelected, locations: params.locations, activeTabName: 'Home'})
      } else { 
        console.log('From Welcome')
        navigate('Welcome', {userData: params.userData, activeTabName: 'Home'})
      }
    }  

    handleOnBible(navigate, route,locationSelected, locations, userData){
      navigate(route, { locationSelected: locationSelected, locations: locations, userData: userData, from: 'SessionItemBrown', activeTabName: 'Bible'})
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
    console.log('Settings Container')
    const buttonTextArray = {
      signIn: this.state.signIn ? 'Sign Out' : 'Sign In', 
      notificationsOn: this.state.notificationsOn ? 'Turn Off' : 'Turn On', 
      locationOn: this.state.locationOn ? 'Turn Off' : 'Turn On'
    }

     const { navigate } = this.props.navigation
     const { params } = this.props.navigation.state

    return (
        <Settings 
          onHome={()=> this.handleOnHome()}  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings', params.locationSelected, params.locations, params.userData,)}
          onSignOut={() => this.handleLogOut(navigate, 'SignIn')}
          userData={params.userData}
          onNotifications={() => this.handleNotification()}  
          onLocation={()=> this.handleLocation()}    
          buttonText={buttonTextArray}
          activeTabName={params.activeTabName}
        />
    )
  }
}

