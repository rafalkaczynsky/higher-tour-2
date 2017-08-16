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

  handleOnSettings(navigate, route){
    navigate(route)
  }




  render() {
 
    console.log(this.state.password)
    console.log(this.state.error)

    const { navigate } = this.props.navigation
    return (
        <SignIn 
          onNext={()=> {
            this.handleOnNext(this.state.email, this.state.password, navigate, 'Welcome')

          }}
          onSettings={()=> {
            this.handleOnSettings(navigate, 'Settings')
            }
          }  
          email={this.state.email}
          password={this.state.password}
          handleEmail={(email) => this.handleEmail(email)}
          handlePassword={(email) => this.handlePassword(email)}
        />

    )
  }
}
