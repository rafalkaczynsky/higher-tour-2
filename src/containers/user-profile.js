import React, {Component} from 'react'
import {UserProfile} from '../windows'

export default class _UserProfile extends Component {

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    return (
        <UserProfile
          onSettings={()=> navigate('Settings')}
          onBible={()=> navigate('FindSession')}
          sessionItem={params.sessionItem} 
          handleEditSession={(sessionItem)=> navigate('SessionItem', {session: sessionItem, cancelLabel: true})}
        />
    )
  }
}
