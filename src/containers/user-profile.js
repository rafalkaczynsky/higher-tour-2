import React, {Component} from 'react'
import {UserProfile} from '../windows'

export default class _UserProfile extends Component {

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    return (
        <UserProfile
          allSessions={params.allSessions}
          onSettings={()=> navigate('Settings')}
          onBible={()=> alert('on Bible')}
          sessionItem={params.sessionItem} 
          handleEditSession={(sessionItem, allSessions )=> navigate('SessionItem', {session: sessionItem, cancelLabel: true, allSessions: allSessions})}
        />
    )
  }
}
