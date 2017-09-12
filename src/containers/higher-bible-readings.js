import React, {Component} from 'react'
import {HigherBibleReadings} from '../windows'

var readings = require('../data/readings') 

export default class _HigherBibleReadings extends Component {
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
        currentScreen: 'list', //  'item', 'dayItem',
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

  handleOnDayItem(itemDay, navigate, userData, locations, from, activeTabName, loginStatus, locationSelected){
      navigate('Read', {itemDay: itemDay, userData: userData, from: from, activeTabName: activeTabName, loginStatus: loginStatus, locationSelected})
  }

  handleOnSettings(navigate, userData, loginStatus, from, activeTabName){
    const  {params}  = this.props.navigation.state

    navigate('Settings', {userData: params.userData, loginStatus: 'loggedIn', from: 'HigherBibleReadings', activeTabName: 'Settings'})
  }

  handleOnSettingsLoggedInPlus(navigate, userData, loginStatus, from, activeTabName, locationSelected, locations){
    const  {params}  = this.props.navigation.state

    navigate('Settings', {userData: params.userData, loginStatus: 'loggedInPlus', from: 'HigherBibleReadings', activeTabName: 'Settings', locationSelected: locationSelected, locations: locations})
  }

  handleOnSettingsLoggedOut(navigate, route, userData, loginStatus, activeTabName){
    alert('Hahah')
    navigate(route, {userData: userData, loginStatus: loginStatus, activeTabName: activeTabName})
  }


  handleOnHome(){
    const { navigate } = this.props.navigation
    const { params } = this.props.navigation.state
    
    console.log('handleHome')

    if (params.loginStatus && params.loginStatus === 'loggedOut') {
      console.log('From SignIn')
      navigate('SignIn', {activeTabName: 'Home'})
    } else if (params.loginStatus && params.loginStatus === 'loggedInPlus') {
      navigate('UserProfile',  {userData: params.userData, locationSelected: params.locationSelected, locations: params.locations, activeTabName: 'Home', loginStatus: 'loggedInPlus'})
    } else if (params.from === 'SessionItemYellow'){ 
        console.log('From SessionItem Yellow')
        console.log(params)
        navigate('FindSession',  {userData: params.userData, locations: params.locations, activeTabName: 'Home'})
      }else if (params.from === 'SessionItemBrown'){ 
        console.log('From SessionItem Brown')
        console.log(params)
        navigate('UserProfile',  {userData: params.userData, locationSelected: params.locationSelected, locations: params.locations, activeTabName: 'Home'})
      } else if (params.from === 'UserProfile'){
        console.log('From UserProfile')
        console.log(params)
        navigate('UserProfile',  {userData: params.userData, locationSelected: params.locationSelected, locations: params.locations, activeTabName: 'Home'})
      } else if (params.from === 'FindSession'){
        console.log('From FindSession')
        console.log(params)
        navigate('FindSession',  {userData: params.userData, locationSelected: params.locationSelected, locations: params.locations, activeTabName: 'Home'})
      }
      else if (params.from === 'HigherBibleReadings'){
        // =========== TO BE CHECKED ==============
        console.log('From HigherBibleReadings')
        console.log(params)
        navigate('FindSession',  {userData: params.userData, locationSelected: params.locationSelected, locations: params.locations, activeTabName: 'Home'})
      } else { 
        console.log('From Welcome')
        navigate('Welcome', {userData: params.userData, activeTabName: 'Home'})
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
   
    console.log('HigherBibleReadings Container')
    console.log(params)
    return (
        <HigherBibleReadings 
          readings={readings}
          onSettings={()=> {
              if (this.state.loginStatus === 'loggedIn'){        
                this.handleOnSettings(navigate, params.userData, 'loggedIn', 'HigherBibleReadings', 'Settings')
                } else if (this.state.loginStatus === 'loggedInPlus') {
                  this. handleOnSettingsLoggedInPlus(navigate, params.userData, 'loggedInPlus', 'HigherBibleReadings', 'Settings', params.locationSelected, params.locations)
                } else {
                  this.handleOnSettingsLoggedOut(navigate, 'Settings', '', 'loggedOut', 'Settings')
              }
            }
          }
          onHome={()=> this.handleOnHome()}  
          onItem={(item)=> this.handleOnItem(item)}
          onDayItem={(item)=> this.handleOnDayItem(item, navigate, params.userData, params.locations, 'HigherBibleReadings', 'Bible', params.loginStatus, params.locationSelected)}
          buttonsStyle={this.state.buttonsStyle}
          locations={params.locations}
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

