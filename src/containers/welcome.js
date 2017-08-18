import React, {Component} from 'react'
import {Welcome} from '../windows'

export default class _Welcome extends Component {

  render() {
    const { navigate } = this.props.navigation

    const ChurchesFakeObject = []

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
    
    for (i = 0; i <= 3; i++) {
      let item = {
        name: 'Church ' + i,
        howFar: '0.1 miles',
        sessions : SessionsFakeObject
      }
      ChurchesFakeObject.push(item)
     // console.log(ChurchesFakeObject)
    }

    const allSessions = {
      sessions: [],
    }

    ChurchesFakeObject.map((church)=> {
      church.sessions.map((session)=>{
        allSessions.sessions.push(session)
      })
    })
    
    console.log('ChurchesFakeObject')
    console.log(ChurchesFakeObject)
    console.log('allSessions')
    console.log(allSessions)
    
    return (
        <Welcome 
          onSettings={()=> navigate('Settings')}
          onBible={()=> alert('onBible')}
          churches={ChurchesFakeObject}
          allSessions={allSessions}
          onMoreSession={(allSessions)=> {
            console.log('More session Pressed')
            console.log(allSessions)
            navigate('FindSession', {church: allSessions, allSessions: allSessions})}
          }
          onChurchPressed={(church)=> {
            console.log('Church Pressed')
            console.log(church)
            navigate('FindSession', {church: church, allSessions: allSessions})
            }}
        />
    )
  }
}



