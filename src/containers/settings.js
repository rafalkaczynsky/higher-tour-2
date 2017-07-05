import React, {Component} from 'react'
import {Button, View} from 'react-native'

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

  handleSignOut(){
    const { navigate } = this.props.navigation
    navigate('SignIn')
  }
  
  render() {
    const buttonTextArray = {
      signIn: this.state.signIn ? 'Sign Out' : 'Sign In', 
      notificationsOn: this.state.notificationsOn ? 'Turn Off' : 'Turn On', 
      locationOn: this.state.locationOn ? 'Turn Off' : 'Turn On'
    }
    
    return (
        <Settings 
          onHome={()=> navigate('Welcome')}  
          onSignOut={() => this.handleSignOut()}
          onNotifications={() => this.handleNotification()}  
          onLocation={()=> this.handleLocation()}    
          buttonText={buttonTextArray}
        />
    )
  }
}


