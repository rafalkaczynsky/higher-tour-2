import React, {Component} from 'react'
import { connect } from 'react-redux';

import {FindSession} from '../windows'

class _FindSession extends Component {
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
    this.setState({locations: this.props.locations})
  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state

    const locations = this.props.events   // data from the store
    const userData = this.props.user      // data from the store
  
    console.log('Find Session Container')
    console.log(params)
    return (
        <FindSession 
          onSettings={()=> navigate('Settings', {userData: userData, locations: locations, from: 'FindSession', activeTabName: 'Settings'})}
          onBible={()=> navigate('HigherBibleReadings', {userData: userData, locations: locations, from: 'FindSession', activeTabName: 'Bible', loginStatus: 'loggedIn'})}
          onItem={(locationSelected)=> this.handleOnItem(navigate, locationSelected ,  locations, userData)}
          buttonsStyle={this.state.buttonsStyle}
          locations={locations}
          churchName={params.churchName ? params.churchName : null}
          onMoreSession={()=> this.handleOnMoreSession()}
          onAlphabetical={()=> this.handleOnAlphabetical(locations)}
          onClosest={()=> this.handleOnClosest(locations)}
          activeTabName={'Home'}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      churches: state.churches,
      coords: state.coords
  });
}

export default connect(mapStateToProps)(_FindSession);
