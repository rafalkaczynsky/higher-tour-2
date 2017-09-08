import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, TouchableOpacity, Dimensions} from 'react-native'
import MapView from 'react-native-maps'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import {getRegionForCoordinates} from '../actions/tools'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

export default class FindSession extends React.Component {

  constructor(props) {
    super(props);

    const {locations} = this.props
    const coordinatesArray = []

    locations.map((item)=> {
      const coordinate = {
        latitude: item.geoLoc.latitude,
        longitude: item.geoLoc.longitude 
      }
      coordinatesArray.push(coordinate) 
    })

    const regionCalculated = getRegionForCoordinates(coordinatesArray)
    
    this.state = {
      region: regionCalculated,
      markers: [],
      willMount: false,
      didMount: false,
      locations: {},
    };
  }



  onRegionChange(region) {
    this.setState({ region: region});
  }
  onRegionChangeComplete(region) {
    this.setState({region: region });
  }
  
  componentDidMount(){
    this.setState({didMount: true, locations: this.props.locations})
  }

    render(){
      console.log('FindSession Window')
      const {locations, onAlphabetical, onClosest, buttonsStyle} = this.props

      console.log(this.state)
      return(
      <View style={StyleSheet.window.default}>
        <Header 
          text='Find a session'
          simple
        />
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}> 
            <View style={{width: '100%', height: '30%'}}>
            <MapView
              provider={this.props.provider}
              style={{width: '100%', height: '100%'}}
              region={this.state.region}
              zoomEnabled={true}
              scrollEnabled={true}
              showsScale={true}
              onRegionChange={this.onRegionChange.bind(this)}
              onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
            >
            {locations.map((item, indx)=> 
              <MapView.Marker
                key={'Marker'+ item.name + indx }
                title={item.name}
                pinColor='red'
                coordinate={item.geoLoc}
                onCalloutPress={()=>this.props.onItem(item, this.state.locations)}
              />)}
             </MapView>
            </View>
            <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                  type="default"
                  text="Closest"
                  bgColor={buttonsStyle[1].bgColor}  
                  textColor={buttonsStyle[1].textColor}
                  buttonStyle={{margin: 10 , marginRight: 0, width:'40%', height: 30}}
                  onPress={onClosest}
                /> 
                <Button 
                  type="default"
                  text="Alphabetical"
                  bgColor={buttonsStyle[0].bgColor}  
                  textColor={buttonsStyle[0].textColor}
                  buttonStyle={{margin: 10, marginLeft: 0, width: '40%', height: 30}}
                  onPress={onAlphabetical}
                /> 
            </View>
            <ScrollView style={{width: '100%'}}>
              {this.state.didMount && this.state.locations.map((item, indx)=> 
              <TouchableOpacity 
                 onPress={()=>this.props.onItem(item, this.state.locations)}
                 key={'ListItemKey-'+indx}
              >
                <ListItem 
                  title={item.name}
                  label={item.howFar + ' miles'}
                 
                />
              </TouchableOpacity>
              )}
              <ListItem
                title="See more sessions"
                bgColor={colors.grey3}
                borderBold
                handleIconPressed={this.props.onMoreSession}
                
              />
            </ScrollView>
            
        </View>
        <TabMenu 
          onSettings={this.props.onSettings}
          oBible={this.props.onBible}
          activeTabName={this.props.activeTabName}
        /> 
      </View>
        )
    }
}