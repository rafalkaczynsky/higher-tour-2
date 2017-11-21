import React, {Component} from 'react'
import {Button, View, BackHandler} from 'react-native'
import { connect } from 'react-redux';

import _Firebase from '../actions/firebase';
import {Settings} from '../windows'
import * as ACTIONS from '../actions/actions/actions';
import { NavigationActions } from 'react-navigation'

class _Settings extends Component {
  constructor(props){
    super(props)

    this.state = {
        signIn: false,
        notificationsOn: true,
        locationOn: true,
    }

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  
  handleNotification(){
    this.setState({notificationsOn: !this.state.notificationsOn})
  }

  handleLocation(){
    this.setState({locationOn: !this.state.locationOn})
  }

  handleLogOut(navigate, route){
    const loginStatus = this.props.app.loginStatus  // data from the store

    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn'})
      ]
    })
    
    if (loginStatus === 'loggedOut') {
      this.props.navigation.dispatch(resetAction)
    } else {
      this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedOut'))
      _Firebase.logout(this.props.navigation.dispatch(resetAction) , route, this.props.dispatch(ACTIONS.SAVE_USER(null), this.props.dispatch(ACTIONS.SAVE_APP_USER(null))));

    } 
  }

  handleOnHome(){
      
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

  handleOnBible(navigate, route){
      this.props.dispatch(ACTIONS.UPDATE_BIBLE_READING_SCREEN('list'))
      this.props.dispatch({ type: 'BibleAnimation' }) 
  } 
  handleOnGoBack(){
    this.props.navigation.dispatch(NavigationActions.back())
  }
  
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
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
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
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

    return (
        <Settings 
          onHome={()=> this.handleOnHome()}  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings')}
          onSignOut={() => this.handleLogOut(navigate, 'SignIn')}
          onGoBack={()=> this.handleOnGoBack()}
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
