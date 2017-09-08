import React, {Component} from 'react'
import {Button, View} from 'react-native'

import _Firebase from '../actions/firebase';
import {SignIn} from '../windows'

export default class _SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      email: '',
      password: '',
      error: '',
    }
  }

  handleEmail(email){
    this.setState({email: email})
  }


  handlePassword(password){
    this.setState({password: password})
  }

  handleOnNext(email, password, navigate, route, handleError){
    _Firebase.signup(email, password, navigate, route, handleError);
  }

  handleOnSettings(navigate, route, userData, loginStatus, activeTabName){
    navigate(route, {userData: userData, loginStatus: loginStatus, activeTabName: activeTabName})
  }

  handleOnBible(navigate, route , userData){
    navigate(route, {userData: userData, from: 'SignIn', activeTabName: 'Bible', loginStatus: 'loggedOut'})
  }

  onFacebook(navigate, route){
    _Firebase.fbAuth(navigate, route)
  }

  onTwitter(navigate, route){
    _Firebase._twitterSignIn(navigate, route)
  }


  render() {
 
    console.log(this.state.password)
    console.log(this.state.error)

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    return (
        <SignIn 
          onNext={()=> {
            this.handleOnNext(this.state.email, this.state.password, navigate, 'Welcome')

          }}
          onSettings={()=> {
            this.handleOnSettings(navigate, 'Settings', '', 'loggedOut', 'Settings')
            }
          }  
          onBible={() =>  this.handleOnBible(navigate, 'HigherBibleReadings')}
          
          onTwitter={()=> this.onTwitter(navigate, 'Welcome')}
          onFacebook={()=> this.onFacebook(navigate, 'Welcome')}
          email={this.state.email}
          password={this.state.password}
          handleEmail={(email) => this.handleEmail(email)}
          handlePassword={(email) => this.handlePassword(email)}
          activeTabName={'Home'} />
    )
  }
}
