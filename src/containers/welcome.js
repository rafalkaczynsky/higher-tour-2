import React, {Component} from 'react'
import {Welcome} from '../windows'

export default class _Welcome extends Component {

  render() {
    const { navigate } = this.props.navigation

    return (
        <Welcome 
          onSettings={()=> navigate('Settings')}
        />
    )
  }
}



