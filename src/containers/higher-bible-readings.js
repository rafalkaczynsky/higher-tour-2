import React, {Component} from 'react'
import {HigherBibleReadings} from '../windows'
import { connect } from 'react-redux';

import * as ACTIONS from '../actions/actions/actions';

var readings = require('../data/readings') 

class _HigherBibleReadings extends Component {
  constructor(props){
    super(props)
    
    this.state = {
        loginStatus: 'loggedOut',
        buttonsStyle: [
          {
            textColor: 'brown',
            bgColor: 'transparent',
          },
          {
            textColor: 'white',
            bgColor: 'brown',           
          }
        ],
        currentScreen: 'list', //  or 'item', 'dayItem',
        chosenItem: null,
        chosenDayItem: false
    }
  }

  handleOnNew(){
    this.setState({
        
              buttonsStyle: [
                {
                  textColor: 'brown',
                  bgColor: 'transparent',
                },
                {
                  textColor: 'white',
                  bgColor: 'brown',           
                }]
            })
  }

  handleOnCompleted(){
    this.setState({
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

  handleOnItem(item){
      console.log(item)
      this.setState({currentScreen: 'item', chosenItem: item})
  }

  handleOnDayItem(itemDay, navigate, from, locationSelected){
      navigate('Read', {itemDay: itemDay, from: from, locationSelected})
  }

  handleOnSettings(navigate, loginStatus, from,){
    navigate('Settings', {loginStatus: loginStatus, from: from})
  }

  handleOnSettingsLoggedInPlus(navigate, from,locationSelected){
    navigate('Settings', {from: from, locationSelected: locationSelected})
  }

  handleOnSettingsLoggedOut(navigate, route){
    navigate(route)
  }


  handleOnHome(){
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const events = this.props.events                // data from the store 
    const userData = this.props.user                // data from the store
    const loginStatus = this.props.app.loginStatus  // data from the store

    console.log('handleHome')

    if (loginStatus && loginStatus === 'loggedOut') {
      console.log('From SignIn')
      navigate('SignIn')
    } else if (loginStatus && loginStatus === 'loggedInPlus') {
      navigate('UserProfile',  {locationSelected: params.locationSelected})
    } else if (params.from === 'SessionItemYellow'){ 
        console.log('From SessionItem Yellow')
        console.log(params)
        navigate('FindSession')
      }else if (params.from === 'SessionItemBrown'){ 
        console.log('From SessionItem Brown')
        console.log(params)
        navigate('UserProfile',  {locationSelected: params.locationSelected})
      } else if (params.from === 'UserProfile'){
        console.log('From UserProfile')
        console.log(params)
        navigate('UserProfile',  { locationSelected: params.locationSelected})
      } else if (params.from === 'FindSession'){
        console.log('From FindSession')
        console.log(params)
        navigate('FindSession',  {locationSelected: params.locationSelected})
      }
      else if (params.from === 'HigherBibleReadings'){
        // =========== TO BE CHECKED ==============
        console.log('From HigherBibleReadings')
        console.log(params)
        navigate('FindSession',  { locationSelected: params.locationSelected,})
      } else { 
        console.log('From Welcome')
        navigate('Welcome')
      }
    }  

  componentWillMount(){
    const loginStatus = this.props.app.loginStatus      // data from the store

    if (loginStatus){
        this.setState({loginStatus: loginStatus})
    }
  }

  componentDidMount(){
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state

    const locations = this.props.events                 // data from the store 
    const userData = this.props.user                    // data from the store
    const loginStatus = this.props.app.loginStatus      // data from the store
    const activeTabName = this.props.app.activeTabName  // data from the store

   
    console.log('HigherBibleReadings Container')
    console.log(params)
    console.log(this.props)
    return (
        <HigherBibleReadings 
          readings={readings}
          onSettings={()=> {
              if (loginStatus === 'loggedIn'){        
                this.handleOnSettings(navigate, 'HigherBibleReadings', 'Settings')
                } else if (loginStatus === 'loggedInPlus') {
                  this. handleOnSettingsLoggedInPlus(navigate,  'HigherBibleReadings', 'Settings', params.locationSelected)
                } else {
                  this.handleOnSettingsLoggedOut(navigate, 'Settings', '', 'loggedOut', 'Settings')
              }
            }
          }
          onHome={()=> this.handleOnHome()}  
          onItem={(item)=> this.handleOnItem(item)}
          onDayItem={(item)=> this.handleOnDayItem(item, navigate, 'HigherBibleReadings', 'Bible', params.locationSelected)}
          buttonsStyle={this.state.buttonsStyle}
          locations={locations}
          onCompleted={()=> this.handleOnCompleted()}
          onNew={()=> this.handleOnNew()}
          currentScreen={this.state.currentScreen}
          chosenItem={this.state.chosenItem}
          chosenDayItem={this.state.chosenDayItem}
          activeTabName={activeTabName}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
      app: state.app,

  });
}

export default connect(mapStateToProps)(_HigherBibleReadings);