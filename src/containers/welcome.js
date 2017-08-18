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

// ====================== NEW DATA OBJECTS =================================

    let sessionBlock = []

    for (let i = 1; i <= 6; i++){
      let item = {
        week: {
          title: 'This is title of Week' + i,
          description: 'This is description of Week'+ i
        }
      }
      sessionBlock.push(item)
    }

    let churches = []

    for (let i = 1; i<=50; i++){
      let item = {
        id: 'church' + i,
        info: 'We belive in ' + i + ' Gods',
        name: 'In ' + i + ' Gods Belivers',
        serviceTime: '10 am',
        serviceDay: 'Sunday',
        contactPerson: 'Tom Perks',
        telephone: '07912323244',
        email: 'example@gmail.com',
        website: 'www.example.com',
      }
      churches.push(item)
    }

    let locations = []

    churches.map((church, indx)=> {
      let item = {
        id: 'location'+indx,
        name: church.name + 'sessions',
        contactPerson: church.contactPerson,
        telephone: church.telephone,
        email: church.email,
        website: church.website,
        host: church.name,
        address: {
          firstLane: 'Harper Road',
          city: 'Manchester',
          postcode: 'M22 4RG'
        },
        geoLoc: {
          longitude: '',
          latitude: '',
        },
        sessionsStartDates: {
          welcome: {
            StartDate: '1 Oct',
            StartTime: '7pm',
          },
          week1: {
            StartDate: '4 Oct',
            StartTime: '7pm',
          },
                    
          week2: {
            StartDate: '14 Nov',
            StartTime: '7pm',
          },
                    
          week3: {
            StartDate: '24 Dec',
            StartTime: '7pm',
          },
                    
          week4: {
            StartDate: '4 Jan',
            StartTime: '7pm',
          },
                    
          week5: {
            StartDate: '14 Feb',
            StartTime: '7pm',
          },          
          week6: {
            StartDate: '24 Mar',
            StartTime: '7pm',
          },
        }
      }
      locations.push(item)
    })


    console.log('session')
    console.log(sessionBlock)
    console.log('church')
    console.log(churches)
    console.log('locations')
    console.log(locations)

    return (
        <Welcome 
          onSettings={()=> navigate('Settings')}
          onBible={()=> alert('onBible')}

          locations={locations}
          onMoreSession={()=> {
            navigate('FindSession', {locations: locations})}
          }
          onChurchPressed={(locationSelected)=> {
            navigate('SessionItem', {locationSelected: locationSelected,  locations: locations})
            }}
        />
    )
  }
}



