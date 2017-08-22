
const Churches = [
    {   
        id: 1,
        name: 'All Saints Marple',
        meetingDayAndTime: 'Sunday - 8:15PM',
        contactPerson: '',
        telephone: '01614272378',
        email: 'office@allsaintsmarple.co.uk',
        website: 'http://allsaintsmarple.co.uk/',
        twitter: '@AllSaintsMarple',
        facebook: 'https://www.facebook.com/allsaintsmarple',
        address: {
            firstLane: 'All Saints Church, 155 Church Lane, Marple, Stockport',
            city: 'Stockport',
            postcode: 'SK6 7LD'
        },
        location: {
            lat : 53.3883067,
            lng : -2.0592767
         },
    },
    {   
        id: 2,
        name: 'Altrincham Baptist',
        meetingDayAndTime: 'Sunday - 6:30PM',
        contactPerson: '',
        telephone: '0161 941 3052',
        email: 'church@altrinchambaptist.org',
        website: 'http://www.altrinchambaptist.org/',
        twitter: '@thehubalty',
        facebook: 'https://www.facebook.com/Altrincham-Baptist-Church-345586915534417/',
        address: {
            firstLane: 'Hale Road',
            city: 'Altrincham',
            postcode: 'WA14 2EW'
        },
        location: {
            lat : 53.3815763,
            lng : -2.3497703
         },
    },
    {   
        id: 3,
        name: 'Audacious',
        meetingDayAndTime: 'Sunday - 10AM, 12PM, 5PM',
        contactPerson: '',
        telephone: '0161 830 7000',
        email: 'info@audaciouschurch.com',
        website: 'http://allsaintsmarple.co.uk/',
        twitter: '@audaciouschurch',
        facebook: 'http://www.facebook.com/audaciouschurch',
        address: {
            firstLane: 'Trinity Way',
            city: 'Manchester',
            postcode: 'M3 7BD'
        },
        location: {
            lat : 53.4849465,
            lng : -2.2548547
         }
    },
    {   
        id: 4,
        name: 'Billinge Family Church',
        meetingDayAndTime: 'Wednesday - 10:30AM',
        contactPerson: '',
        telephone: '01744 894374',
        email: 'info@billingefamilychurch.org',
        website: 'www.billingefamilychurch.org',
        twitter: '@B_F_Church',
        facebook: 'www.facebook.com/billingefamilychurch',
        address: {
            firstLane: 'Billinge Family Church, 31 Crank Road, Billinge',
            city: 'Wigan',
            postcode: 'WN5 7DT'
        },
        location : {
            lat : 53.51710139999999,
            lng : -2.7157064
         },
    },
    {   
        id: 5,
        name: 'Bridge Youth',
        meetingDayAndTime: 'Friday - 7:30PM',
        contactPerson: '',
        telephone: '01204 361704',
        email: 'info@bridgebolton.com',
        website: 'www.bridgebolton.com',
        twitter: 'twitter.com/bridge_youth_',
        facebook: 'www.facebook.com/Bridgeyouthbolton/',
        address: {
            firstLane: '109 Bradford Street',
            city: ' Bolton',
            postcode: 'BL2 1JX'
        },
        location : {
            lat : 53.5789768,
            lng : -2.4143238
         },
    },
    {   
        id: 6,
        name: 'Bury Christian Fellowship',
        meetingDayAndTime: 'Sunday - 10:30AM',
        contactPerson: '',
        telephone: '01617648131',
        email: 'office@bury.org.uk',
        website: 'www.bury.org.uk',
        twitter: '@BuryFellowship',
        facebook: 'https://www.facebook.com/BuryFellowship/',
        address: {
            firstLane: 'The Manna House, Irwell Street',
            city: 'Bury',
            postcode: 'BL9 0HE'
        },
        location: {
            lat : 53.59322419999999,
            lng : -2.3029418
         },
    },
    {   
        id: 7,
        name: 'Christ Central',
        meetingDayAndTime: 'Sunday - 10:30AM',
        contactPerson: '',
        telephone: '01618342229',
        email: 'students@christcentral.org.uk',
        website: 'http://www.christcentral.org.uk/',
        twitter: '@ChristCentralUK',
        facebook: 'https://www.facebook.com/christcentraluk',
        address: {
            firstLane: 'The Comedy Store, Deansgate Locks',
            city: 'Manchester',
            postcode: 'M1 5LH'
        },
        location: {
            lat : 53.474548,
            lng : -2.25048
         },
    },
    {   
        id: 8,
        name: 'Elmwood Salford',
        meetingDayAndTime: 'Sunday - 10:30AM; 6:30PM',
        contactPerson: '',
        telephone: '01612814545',
        email: 'admin@elmwoodchurch.org.uk',
        website: 'http://elmwoodchurch.org.uk/',
        twitter: '@ElmwoodChurch',
        facebook: 'https://www.facebook.com/ElmwoodChurch',
        address: {
            firstLane: 'Eccles Old Road',
            city: 'Salford',
            postcode: 'M6 8AG'
        },
        location: {
            lat : 53.4892167,
            lng : -2.3207301
         },
    },
    {   
        id: 9,
        name: 'Emmanuel Baptist Church',
        meetingDayAndTime: 'Sunday - 11:00AM',
        contactPerson: '',
        telephone: '01519311151',
        email: 'tom.grant@eden-network.org',
        website: 'http://www.emmanuelnetherton.org',
        twitter: '@emmanuelbaptist',
        facebook: 'https://www.facebook.com/emmanuelnetherton/',
        address: {
            firstLane: 'Emmanuel Baptist Church, Fleetwoods Lane',
            city: 'Netherton',
            postcode: 'L30 0QG'
        },
        location: {
            lat : 53.4903439,
            lng : -2.9829934
         },
    },
    {   
        id: 10,
        name: 'St James & Emmanuel',
        meetingDayAndTime: 'Sunday - 10:30AM: 6:15PM',
        contactPerson: '',
        telephone: '01614464150',
        email: 'office@stjamesandemmanuel.org',
        website: 'http://www.stjamesandemmanuel.org/',
        twitter: '@stjamesemmanuel',
        facebook: 'https://www.facebook.com/StJamesandEmmanuel',
        address: {
            firstLane: '6 Barlow Moor Road, Didsbury',
            city: ' Manchester',
            postcode: 'M20 6TR'
        },
        location: {
            lat : 53.4182869,
            lng : -2.2329948
         },

    },
]

module.exports = Churches;