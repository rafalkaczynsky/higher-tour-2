import React, {Component} from 'react'
import { connect } from 'react-redux';

import * as ACTIONS from '../actions/actions/actions';
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

  handleOnItem(navigate, locationSelected, cancelLabel){
    this.props.dispatch(ACTIONS.SAVE_SELECTED_EVENT(locationSelected))
    navigate('SessionItem', {cancelLabel: cancelLabel})

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
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
    this.props.dispatch(ACTIONS.UPDATE_LOGGIN_STATUS('loggedIn'))
  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state

    const locations = this.props.events                 // data from the store
    const userData = this.props.user                    // data from the store
    const activeTabName = this.props.app.activeTabName  // data from the store
  
    console.log('Find Session Container')
    console.log(params)
    console.log(this.props)

    let churchName = '' // was from params.churchName

    return (
        <FindSession 
          onSettings={()=> navigate('Settings', {from: 'FindSession'})}
          onBible={()=> navigate('HigherBibleReadings')}
          onItem={(locationSelected)=> this.handleOnItem(navigate, locationSelected, false)}
          buttonsStyle={this.state.buttonsStyle}
          locations={locations}
          churchName={churchName}
          onAlphabetical={()=> this.handleOnAlphabetical(locations)}
          onClosest={()=> this.handleOnClosest(locations)}
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
      coords: state.coords,
      app: state.app,

  });
}

export default connect(mapStateToProps)(_FindSession);
