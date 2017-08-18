import React, {Component} from 'react'
import {SessionItem} from '../windows'

export default class _SessionItem extends Component {

  constructor(props){
    super(props)

    this.state = {
      allSessions: '',
    }
  }

  handleOnStartSession(navigate, locationSelected, locations){
       navigate('UserProfile', { locationSelected: locationSelected, locations: locations })
  }

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    console.log('We ar in session-Item')

    console.log(params)
    return (
        <SessionItem 
          onSettings={()=> navigate('Settings')}
          onBible={()=> alert('onBible')}

          location={params.locationSelected}
          cancelLabel={params.cancelLabel}
          onStopSession={()=> navigate('FindSession', {locations: params.locations})}
          onStartSession={(location)=> this.handleOnStartSession(navigate, location, params.locations)}
        />
    )
  }
}


