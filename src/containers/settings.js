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

  handleHome(){
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    if (params.loginStatus === 'loggedOut') {
      navigate('SignIn')
    } else {
      navigate('Welcome', {userData: params.userData})
    }  
  }

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

    return (
        <Settings 
          onHome={()=> this.handleHome()}  
          onBible={() =>  alert('Bible Clicked! Work in progress.')}
          onSignOut={() => this.handleLogOut(navigate, 'SignIn')}
          userData={params.userData}
          onNotifications={() => this.handleNotification()}  
          onLocation={()=> this.handleLocation()}    
          buttonText={buttonTextArray}
        />
    )
  }
}

