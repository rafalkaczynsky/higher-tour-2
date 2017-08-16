import React, {Component} from 'react'
import {FindSession} from '../windows'

export default class _FindSession extends Component {


  handleOnItem(navigate, sessionItem){
    navigate('SessionItem', { session: sessionItem })
  }

  render() {
    const { navigate } = this.props.navigation

    // --------------- !!!!!!FAKE OBJCECT -------------
    const SessionsFakeObject = []
    for (let i = 0; i< 20; i++){
      let item = {
        id: i,
        name: 'Ivy SHarston Youth Sessions nr: '+ i,
        howFar: '13.1 miles',
        address: {
          firstLane: 'Harper Road, Sharston',
          city: 'Manchester',
          postCode: 'M22 4RG'
        },
        contact: 'Tom Perks',
        telephone: '01619462300',
        email: 'sharston@ivychurch.org',
        website: 'www.ivychurch.org',
        host: 'Ivy Sharston',
        nextSession: ' 21 March'
      }
      SessionsFakeObject.push(item)
    } 



    return (
        <FindSession 
          onSettings={()=> navigate('Settings')}
          onBible={()=> navigate('FindSession')}
          onItem={(sessionItem)=> this.handleOnItem(navigate, sessionItem)}
          sessions={SessionsFakeObject}
        />
    )
  }
}


