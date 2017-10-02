import React, {Component} from 'react'
import { connect } from 'react-redux';

import * as ACTIONS from '../actions/actions/actions';
import {FindChurch} from '../windows'

class _FindChurch extends Component {
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

  handleOnItem(navigate, locationSelected){
    navigate('SessionItem', { locationSelected: locationSelected})
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
    const locations = this.props.events   // data from the store
    const churches = this.props.churches  // data from the store

    this.setState({locations: locations, churches: churches})
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state
  

    const locations = this.props.events   // data from the store
    const userData = this.props.user      // data from the store
    const churches = this.props.churches  // data from the store
    const activeTabName = this.props.app.activeTabName  // data from the store
  
    console.log('Find Church Container')
    console.log(params)
    console.log(this.props)
    return (
        <FindChurch 
          onSettings={()=> navigate('Settings', {from: 'FindSession', activeTabName: 'Settings'})}
          onBible={()=> navigate('HigherBibleReadings', {from: 'FindSession', activeTabName: 'Bible'})}
          onItem={(locationSelected)=> this.handleOnItem(navigate, locationSelected)}
          buttonsStyle={this.state.buttonsStyle}
          churches={churches}
          locations={locations}
          onHome={()=> navigate('FindSession')}
          onMoreSession={()=> navigate('FindSession')}
          onAlphabetical={()=> this.handleOnAlphabetical(churches)}
          onClosest={()=> this.handleOnClosest(churches)}
          activeTabName={activeTabName}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      churches: state.churches,
      app: state.app,

  });
}

export default connect(mapStateToProps)(_FindChurch);
