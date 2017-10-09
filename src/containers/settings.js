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
      this.props.dispatch({ type: 'LogoutAnimation' }) 
    } else {
      this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedOut'))
      _Firebase.logout(this.props.dispatch({ type: 'LogoutAnimation' }) , route, this.props.dispatch(ACTIONS.SAVE_USER(null)));
    }  
  }

  handleOnHome(){

    const loginStatus = this.props.app.loginStatus  // data from the store
    
        if (loginStatus && loginStatus === 'loggedOut') {
          this.props.dispatch({type: 'SignInOnHomeAnimation'})
        } else if (loginStatus && loginStatus === 'loggedInPlus') {
          this.props.dispatch({type: 'UserProfileOnHomeAnimation'}) 
        } else { 
          this.props.dispatch({type: 'GotoWelcomeAnimation'})
        }

    }  

    handleOnBible(navigate, route){
      this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
      this.props.dispatch({ type: 'BibleAnimation' }) 
  } 
  

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
