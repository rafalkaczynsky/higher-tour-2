import React, {Component} from 'react'
import {HigherBibleReadings} from '../windows'
import { connect } from 'react-redux';

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

  handleOnDayItem(itemDay, navigate, from, activeTabName, loginStatus, locationSelected){
      navigate('Read', {itemDay: itemDay, from: from, activeTabName: activeTabName, loginStatus: loginStatus, locationSelected})
  }

  handleOnSettings(navigate, loginStatus, from, activeTabName){
    navigate('Settings', {loginStatus: loginStatus, from: from, activeTabName: activeTabName})
  }

  handleOnSettingsLoggedInPlus(navigate,loginStatus, from, activeTabName, locationSelected){
    navigate('Settings', {loginStatus: loginStatus, from: from, activeTabName: activeTabName, locationSelected: locationSelected})
  }

  handleOnSettingsLoggedOut(navigate, route, userData, loginStatus, activeTabName){
    alert('Hahah')
    navigate(route, {userData: userData, loginStatus: loginStatus, activeTabName: activeTabName})
  }


  handleOnHome(){
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state

    const events = this.props.events      // from the store 
    const userData = this.props.user      // from the store
    
    console.log('handleHome')

    if (params.loginStatus && params.loginStatus === 'loggedOut') {
      console.log('From SignIn')
      navigate('SignIn', {activeTabName: 'Home'})
    } else if (params.loginStatus && params.loginStatus === 'loggedInPlus') {
      navigate('UserProfile',  {locationSelected: params.locationSelected, activeTabName: 'Home', loginStatus: 'loggedInPlus'})
    } else if (params.from === 'SessionItemYellow'){ 
        console.log('From SessionItem Yellow')
        console.log(params)
        navigate('FindSession',  {activeTabName: 'Home'})
      }else if (params.from === 'SessionItemBrown'){ 
        console.log('From SessionItem Brown')
        console.log(params)
        navigate('UserProfile',  {locationSelected: params.locationSelected,  activeTabName: 'Home'})
      } else if (params.from === 'UserProfile'){
        console.log('From UserProfile')
        console.log(params)
        navigate('UserProfile',  { locationSelected: params.locationSelected, activeTabName: 'Home'})
      } else if (params.from === 'FindSession'){
        console.log('From FindSession')
        console.log(params)
        navigate('FindSession',  {locationSelected: params.locationSelected, activeTabName: 'Home'})
      }
      else if (params.from === 'HigherBibleReadings'){
        // =========== TO BE CHECKED ==============
        console.log('From HigherBibleReadings')
        console.log(params)
        navigate('FindSession',  { locationSelected: params.locationSelected, activeTabName: 'Home'})
      } else { 
        console.log('From Welcome')
        navigate('Welcome', {activeTabName: 'Home'})
      }
    }  

  componentWillMount(){
    const  {params}  = this.props.navigation.state
    if (params.loginStatus){
        this.setState({loginStatus: params.loginStatus})
    }
  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state

    const locations = this.props.events      // from the store 
    const userData = this.props.user      // from the store
   
    console.log('HigherBibleReadings Container')
    console.log(params)
    console.log(this.props)
    return (
        <HigherBibleReadings 
          readings={readings}
          onSettings={()=> {
              if (this.state.loginStatus === 'loggedIn'){        
                this.handleOnSettings(navigate, 'loggedIn', 'HigherBibleReadings', 'Settings')
                } else if (this.state.loginStatus === 'loggedInPlus') {
                  this. handleOnSettingsLoggedInPlus(navigate,  'loggedInPlus', 'HigherBibleReadings', 'Settings', params.locationSelected)
                } else {
                  this.handleOnSettingsLoggedOut(navigate, 'Settings', '', 'loggedOut', 'Settings')
              }
            }
          }
          onHome={()=> this.handleOnHome()}  
          onItem={(item)=> this.handleOnItem(item)}
          onDayItem={(item)=> this.handleOnDayItem(item, navigate, 'HigherBibleReadings', 'Bible', params.loginStatus, params.locationSelected)}
          buttonsStyle={this.state.buttonsStyle}
          locations={locations}
          onCompleted={()=> this.handleOnCompleted()}
          onNew={()=> this.handleOnNew()}
          currentScreen={this.state.currentScreen}
          chosenItem={this.state.chosenItem}
          chosenDayItem={this.state.chosenDayItem}
          activeTabName={'Bible'}
        />
    )
  }
}

function mapStateToProps(state){
  return({
      user: state.user,
      events: state.events,
  });
}

export default connect(mapStateToProps)(_HigherBibleReadings);