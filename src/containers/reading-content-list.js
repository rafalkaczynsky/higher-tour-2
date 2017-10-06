import React, {Component} from 'react'
import {ReadingContentList} from '../windows'
import { connect } from 'react-redux';
import * as firebase from 'firebase'


import * as ACTIONS from '../actions/actions/actions';

var readings = require('../data/readings') 

class _ReadingContentList extends Component {
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

  handleOnDayItem(itemDay, navigate, numberOfDay, from){
      console.log(itemDay)
      this.props.dispatch(ACTIONS.UPDATE_CURRENT_BIBLE_READING_DAY_CONTENT(itemDay))
      this.props.dispatch(ACTIONS.SAVE_CURRENT_READING_DAY_NUMBER(numberOfDay))
      navigate('Read', {from: from})
  }

  handleOnSettings(navigate, loginStatus, from,){
    navigate('Settings', {loginStatus: loginStatus, from: from})
  }

  handleOnSettingsLoggedInPlus(navigate, from){
    navigate('Settings', {from: from})
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
      navigate('UserProfile')
    } else if (params.from === 'SessionItemYellow'){ 
        console.log('From SessionItem Yellow')
        console.log(params)
        navigate('FindSession')
      }else if (params.from === 'SessionItemBrown'){ 
        console.log('From SessionItem Brown')
        console.log(params)
        navigate('UserProfile')
      } else if (params.from === 'UserProfile'){
        console.log('From UserProfile')
        console.log(params)
        navigate('UserProfile',)
      } else if (params.from === 'FindSession'){
        console.log('From FindSession')
        console.log(params)
        navigate('FindSession')
      }
      else if (params.from === 'HigherBibleReadings'){
        // =========== TO BE CHECKED ==============
        console.log('From HigherBibleReadings')
        console.log(params)
        navigate('FindSession')
      } else { 
        console.log('From Welcome')
        navigate('Welcome')
      }
    }  


  componentWillMount(){


    const loginStatus = this.props.app.loginStatus      // data from the store
    
  }
  

  componentDidMount(){
    this.props.dispatch(ACTIONS.UPDATE_ACTIVE_TAB_NAME('Home'))
  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state

    const locations = this.props.events                                       // data from the store 
    const userData = this.props.user                                          // data from the store
    const loginStatus = this.props.app.loginStatus                            // data from the store
    const activeTabName = this.props.app.activeTabName                        // data from the store
    const currentBibleReading = this.props.currentBibleReading                // data from the store  


    console.log('ReadingContentList Container')

    return (
        <ReadingContentList 
          onSettings={()=> {
              if (loginStatus === 'loggedIn'){        
                this.handleOnSettings(navigate, 'HigherBibleReadings', 'Settings')
                } else if (loginStatus === 'loggedInPlus') {
                  this. handleOnSettingsLoggedInPlus(navigate,  'HigherBibleReadings', 'Settings')
                } else {
                  this.handleOnSettingsLoggedOut(navigate, 'Settings', '', 'loggedOut', 'Settings')
              }
            }
          }
          onHome={()=> this.handleOnHome()}  
          onItem={(item)=> this.handleOnItem(item)}
          onDayItem={(item, numberOfDay)=> this.handleOnDayItem(item, navigate,  numberOfDay, 'HigherBibleReadings')}
          buttonsStyle={this.state.buttonsStyle}
          onCompleted={()=> this.handleOnCompleted()}
          onNew={()=> this.handleOnNew()}
          lastReadDayNumber={this.props.app.lastReadDayNumber}
          chosenItem={currentBibleReading}
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
      currentBibleReading: state.currentBibleReading,
  });
}

export default connect(mapStateToProps)(_ReadingContentList);