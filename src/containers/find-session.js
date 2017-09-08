import React, {Component} from 'react'
import {FindSession} from '../windows'

export default class _FindSession extends Component {
  constructor(props){
    super(props)

    this.state = {
        locations: [],
        buttonsStyle: [
          {
            textColor: 'brown',
            bgColor: 'transparent',
          },
          {
            textColor: 'white',
            bgColor: 'brown',           
          }
        ]
    }
  }

  handleOnItem(navigate, locationSelected, locations, userData){
    navigate('SessionItem', { locationSelected: locationSelected,  locations: locations, userData: userData })
  }

  handleOnAlphabetical(locations){
    locations.sort(function(a, b){
      if(a.name.toLowerCase() < b.name.toLowerCase() ) return -1;
      if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    })
    this.setState({
      locations: locations,
      buttonsStyle: [
        {
          textColor: 'white',
          bgColor: 'brown',           
        },
        {
          textColor: 'brown',
          bgColor: 'transparent',
        }
      ]
    })

  }

  handleOnClosest(locations){
    function compare(a, b){
      return a.howFar - b.howFar;
    }
  
    locations.sort(compare);
    this.setState({
      locations: locations,
      buttonsStyle: [
        {
          textColor: 'brown',
          bgColor: 'transparent',
        },
        {
          textColor: 'white',
          bgColor: 'brown',           
        }
      ]
    
    })
  }

  componentDidMount(){
    const  {params}  = this.props.navigation.state
    this.setState({locations: params.locations})
  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state
  

    return (
        <FindSession 
          onSettings={()=> navigate('Settings', {userData: params.userData, locations: params.locations, from: 'FindSession', activeTabName: 'Settings'})}
          onBible={()=> navigate('HigherBibleReadings', {userData: params.userData, locations: params.locations, from: 'FindSession', activeTabName: 'Bible', loginStatus: 'loggedIn'})}
          onItem={(locationSelected)=> this.handleOnItem(navigate, locationSelected ,  params.locations, params.userData)}
          buttonsStyle={this.state.buttonsStyle}
          locations={params.locations}
          churchName={params.churchName ? params.churchName : null}
          onMoreSession={()=> this.handleOnMoreSession()}
          onAlphabetical={()=> this.handleOnAlphabetical(params.locations)}
          onClosest={()=> this.handleOnClosest(params.locations)}
          activeTabName={'Home'}
        />
    )
  }
}


