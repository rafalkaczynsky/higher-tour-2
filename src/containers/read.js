import React, {Component} from 'react'
import geolib from 'geolib'
import { connect } from 'react-redux';

import {Read} from '../windows'
import * as ACTIONS from '../actions/actions/actions';



class _Read extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

handleOnBible(navigate, from){
  navigate('HigherBibleReadings', {from: from})
}

handleOnSettings(navigate, route){
  const { params } = this.props.navigation.state
  const loginStatus = this.props.app.loginStatus  // data from the store

  if (loginStatus === 'loggedOut') {
     navigate('Settings')
  } else if (params.loginStatus === 'loggedIn ') {
    navigate('Settings')
  } else {
    navigate('Settings')
  }
}

handleHome(navigate){
  const loginStatus = this.props.app.loginStatus  // data from the store

  if (loginStatus === 'loggedOut') {
    navigate('SignIn')
  } else if (loginStatus === 'loggedIn'){
      navigate('Welcome')
    } else {
        navigate('UserProfile')
      }
}

  render() {

    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const locations = this.props.events             // data from the store
    const userData = this.props.user                // data from the store
    const loginStatus = this.props.app.loginStatus  // data from the store
 
    console.log('Read Container')
    console.log(params)
    console.log(this.props)
    return (
        <Read 
          onSettings={()=> this.handleOnSettings(navigate)}
          onHome={()=> this.handleHome(navigate)}
          userData={userData}
          locations={locations}
          itemDay={params.itemDay}
          activeTabName={'Bible'}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      app: state.app,

  });
}

export default connect(mapStateToProps)(_Read);
