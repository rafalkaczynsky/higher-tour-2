import React, {Component} from 'react'
import {Button, View} from 'react-native'

import _Firebase from '../actions/firebase';


import {Settings} from '../windows'

export default class _Settings extends Component {
  constructor(props){
    super(props)

    this.state = {
        signIn: true,
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
     _Firebase.logout(navigate, route);
  }

  handleHome(){
    const { navigate } = this.props.navigation
    navigate('Welcome')
  }
  
  render() {
    const buttonTextArray = {
      signIn: this.state.signIn ? 'Sign Out' : 'Sign In', 
      notificationsOn: this.state.notificationsOn ? 'Turn Off' : 'Turn On', 
      locationOn: this.state.locationOn ? 'Turn Off' : 'Turn On'
    }

     const { navigate } = this.props.navigation
     const { params } = this.props.navigation.state

    return (
        <Settings 
          onHome={()=> this.props.handleHome}  
          onBible={()=> navigate('FindSession', {userData: params.userData})}
          onSignOut={() => this.handleLogOut(navigate, 'SignIn')}
          userData={params.userData}
          onNotifications={() => this.handleNotification()}  
          onLocation={()=> this.handleLocation()}    
          buttonText={buttonTextArray}
        />
    )
  }
}

