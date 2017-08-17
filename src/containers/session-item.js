import React, {Component} from 'react'
import {SessionItem} from '../windows'

export default class _SessionItem extends Component {

  handleOnStartSession(navigate, sessionItem){
       navigate('UserProfile', { sessionItem: sessionItem })
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    return (
        <SessionItem 
          onSettings={()=> navigate('Settings')}
          onBible={()=> navigate('FindSession')}
          session={params.session}
          cancelLabel={params.cancelLabel}
          onStopSession={()=> navigate('FindSession')}
          onStartSession={(sessionItem)=> this.handleOnStartSession(navigate, sessionItem)}
        />
    )
  }
}


