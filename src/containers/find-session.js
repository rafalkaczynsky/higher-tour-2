import React, {Component} from 'react'
import {FindSession} from '../windows'

export default class _FindSession extends Component {

  handleOnItem(navigate, locationSelected, locations){

    navigate('SessionItem', { locationSelected: locationSelected,  locations: locations })
  }

  handleOnMoreSession(){

  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state
    
    console.log('FindSession')
    console.log(params)
    

    return (
        <FindSession 
          onSettings={()=> navigate('Settings')}
          onItem={(locationSelected)=> this.handleOnItem(navigate, locationSelected ,  params.locations)}

          locations={params.locations}
          churchName={params.churchName ? params.churchName : null}
          onMoreSession={()=> this.handleOnMoreSession()}
        />
    )
  }
}


