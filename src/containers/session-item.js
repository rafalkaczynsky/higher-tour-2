import React, {Component} from 'react'
import {SessionItem} from '../windows'

export default class _SessionItem extends Component {

  render() {
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    return (
        <SessionItem 
          onSettings={()=> navigate('Settings')}
          onBible={()=> navigate('FindSession')}
          session={params.session}
        />
    )
  }
}


