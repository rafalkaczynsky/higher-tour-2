import {Dimensions} from 'react-native'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;


var churches = require('./churches') 
var events = []

for (i = 0; i<=9; i++){

    let  item =  {

        id: 'location'+i,
        name: churches[i].name,
        meetingDayAndTime: 'Thu Mar 24 2016 22:00:00 GMT+0000 (GMT)',
        contactPerson: 'Johny Stone',
        telephone: churches[i].telephone,
        email: churches[i].email,
        website: churches[i].website,
        twitter: churches[i].twitter,
        facebook: churches[i].facebook,
        host: churches[i].name,
        address: {
          firstLane: churches[i].address.firstLane,
          city: churches[i].address.city,
          postcode: churches[i].address.postcode
        },
        geoLoc: {
          longitude: churches[i].location.lng,
          latitude: churches[i].location.lat,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922 * ASPECT_RATIO,
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
        },
    }

    events.push(item)
}

module.exports = events