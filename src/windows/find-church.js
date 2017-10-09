import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, TouchableOpacity, Dimensions} from 'react-native'
import MapView from 'react-native-maps'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import {getRegionForCoordinates} from '../actions/tools'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

export default class FindChurch extends React.Component {

  constructor(props) {
    super(props);

    const {churches} = this.props
    const coordinatesArray = []

    churches.map((item)=> {
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
      churches: {}
    };
  }



  onRegionChange(region) {
    this.setState({ region: region});
  }
  onRegionChangeComplete(region) {
    this.setState({region: region });
  }
  
  componentDidMount(){
    this.setState({didMount: true, churches: this.props.churches})
  }

    render(){
      const {onAlphabetical, onClosest, buttonsStyle, churches} = this.props
      return(
      <View style={StyleSheet.window.default}>
        <Header 
          text='Find a church'
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
            {churches.map((item, indx)=> 
              <MapView.Marker
                key={'Marker'+ item.name + indx }
                title={item.name}
                pinColor='red'
                coordinate={
                    {
                      latitude: item.geoLoc.latitude,
                      longitude: item.geoLoc.longitude,
                      latitudeDelta:0.0922,
                      longitudeDelta: 0.0922 * ASPECT_RATIO,
                    }
                  }
                onCalloutPress={()=> this.onItem(item, this.state.churches)}
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
            {this.state.didMount && this.state.churches.map((item, indx)=> 
              <TouchableOpacity 
                 onPress={()=>this.props.onItem(item)}
                 key={'ListItemKey-'+indx}
              >
                <ListItem 
                  title={item.name}
                  label={item.howFar + ' miles' + ' - ' + item.meetingDay + ' ' + item.meetingTime}
                  handleIconPressed={()=>this.props.onItem(item)}
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
          onHome={this.props.onHome}
          onSettings={this.props.onSettings}
          oBible={this.props.onBible}
          activeTabName={this.props.activeTabName}
        /> 
      </View>
        )
    }
}