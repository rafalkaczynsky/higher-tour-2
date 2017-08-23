import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, TouchableOpacity, Dimensions} from 'react-native'
import MapView from 'react-native-maps'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE = 53.4787644;
const LONGITUDE = -2.25428;
const LATITUDE_DELTA = 0.922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function getRegionForCoordinates(points) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX);
  const deltaY = (maxY - minY);

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
}

export default class FindSession extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE ,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      willMount: false,
      didMount: false,
      locations: {},
    };
  }

  componentDidMount(){
    const {locations} = this.props
    const coordinatesArray = []

    locations.map((item)=> {
      const coordinate = {
        latitude: item.geoLoc.latitude,
        longitude: item.geoLoc.longitude 
      }
      coordinatesArray.push(coordinate) 
    })

    console.log(getRegionForCoordinates(coordinatesArray))

    this.setState({didMount: true, locations: this.props.locations })
  }

    render(){
      console.log('FindSession Window')
      const {locations} = this.props

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
            >
            {locations.map((item, indx)=> 
              <MapView.Marker
                key={'Marker'+ item.name + indx }
                title={item.name}
                pinColor='red'
                coordinate={item.geoLoc}
              />)}

             </MapView>
            </View>
            <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                  type="default"
                  text="Closest"
                  bgColor="brown"  
                  textColor="white"
                  buttonStyle={{margin: 10 , marginRight: 0, width:'40%', height: 30}}
                  onPress={()=>alert('Closest')}
                /> 
                <Button 
                  type="default"
                  text="Alphabetical"
                  bgColor="transparent"
                  transparent
                  textColor="brown"
                  buttonStyle={{margin: 10, marginLeft: 0, width: '40%', height: 30}}
                  onPress={()=> alert('Alpha')}
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
                  label={item.howFar + ' miles'} //This bit needs to be compere with user position and then calculated
                 
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
        /> 
      </View>
        )
    }
}