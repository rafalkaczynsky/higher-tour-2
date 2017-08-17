import React, {Component} from 'react'
import {SessionItem} from '../windows'

export default class _SessionItem extends Component {

  constructor(props){
    super(props)

    this.state = {
      allSessions: '',
    }
  }

  handleOnStartSession(navigate, sessionItem, allSessions){
       navigate('UserProfile', { sessionItem: sessionItem, allSessions: allSessions })
  }



  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    console.log('We ar in session-Item')
    console.log(params.allSessions)
    return (
        <SessionItem 
          onSettings={()=> navigate('Settings')}
          onBible={()=> alert('onBible')}
          allSessions = {params.allSessions}
          session={params.session}
          cancelLabel={params.cancelLabel}
          onStopSession={()=> navigate('FindSession', {church: params.allSessions, allSessions: params.allSessions})}
          onStartSession={(sessionItem)=> this.handleOnStartSession(navigate, sessionItem, params.allSessions)}
        />
    )
  }
}


