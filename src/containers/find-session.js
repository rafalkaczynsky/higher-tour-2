import React, {Component} from 'react'
import {FindSession} from '../windows'

export default class _FindSession extends Component {

  render() {
    const { navigate } = this.props.navigation

    return (
        <FindSession 
          onSettings={()=> navigate('Settings')}
          onBible={()=> navigate('FindSession')}
        />
    )
  }
}


