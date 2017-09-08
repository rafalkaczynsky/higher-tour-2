import React, {Component} from 'react'
import {Read} from '../windows'
import geolib from 'geolib'
import * as firebase from 'firebase'



export default class _Read extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

handleOnBible(navigate, locations, userData, from, activeTabName){
  navigate('HigherBibleReadings', { locations: locations, userData: userData, from: from, activeTabName: activeTabName, loginStatus: 'loggedIn' })
}


  render() {

    const { navigate } = this.props.navigation

    const { params } = this.props.navigation.state
 
    return (
        <Read 
          onSettings={()=> navigate('Settings', {userData: params.userData, activeTabName: 'Settings'})}
          onBible={() =>  this.handleOnBible(navigate, locations, params.userData, 'Settings', 'Bible')}
          userData={params.userData}
          locations={params.locations}
          itemDay={params.itemDay}
          activeTabName={'Bible'}
        />
    )
  }
}
