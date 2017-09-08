import React, {Component} from 'react'
import {HigherBibleReadings} from '../windows'

var readings = require('../data/readings') 

export default class _HigherBibleReadings extends Component {
  constructor(props){
    super(props)
    
    this.state = {
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

  handleOnDayItem(itemDay, navigate, userData, locations, from, activeTabName){
      navigate('Read', {itemDay: itemDay, userData: userData, from, activeTabName})
  }

  componentDidMount(){
  
  }

  render() {

    const { navigate } = this.props.navigation 
    const  {params}  = this.props.navigation.state
   

    return (
        <HigherBibleReadings 
          readings={readings}
          onSettings={()=> navigate('Settings', {userData: params.userData, locations: params.locations, from: 'HigherBibleReadings', activeTabName: 'Settings'})}
          onItem={(item)=> this.handleOnItem(item)}
          onDayItem={(item)=> this.handleOnDayItem(item, navigate, params.userData, params.locations, 'HigherBibleReadings', 'Bible')}
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


