import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Dimensions, TouchableOpacity} from 'react-native'
import MapView from 'react-native-maps'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'


//const LATITUDE = 37.78825;
//const LONGITUDE = -122.4324;
//const LATITUDE_DELTA = 0.0922;
//const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//let id = 0;

export default class SessionItem extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          region: {
            latitude: this.props.location.geoLoc.latitude,
            longitude: this.props.location.geoLoc.longitude,
            latitudeDelta: this.props.location.geoLoc.latitudeDelta,
            longitudeDelta: this.props.location.geoLoc.longitudeDelta,
          },
          markers: [],
          willMount: false,
        };
      }

    componentWillMount(){
        this.setState({
            region:{
                latitude: this.props.location.geoLoc.latitude,
                longitude: this.props.location.geoLoc.longitude,
                latitudeDelta: this.props.location.geoLoc.latitudeDelta,
                longitudeDelta: this.props.location.geoLoc.longitudeDelta,            
            },
            willMount: true
        })
    }

    onRegionChange(region) {
        this.setState({ region: region});
    }
      onRegionChangeComplete(region) {
        this.setState({region: region });
    }
    
    render(){

    const {onSettings, location, onStartSession, cancelLabel, onStopSession} = this.props

    const coordinate = {
        latitude: location.geoLoc.latitude,
        longitude: location.geoLoc.longitude 
    }

    console.log('region statess')
    console.log(location)

    return(

      <View style={StyleSheet.window.default}>
        <Header 
          text={location.name}
          simple
        />
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}> 
            <View style={{width: '100%', height: '30%'}}>
            {this.state.willMount && 
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
              <MapView.Marker
                title="New Marker"
                pinColor='red'
                coordinate={coordinate}
                />
            </MapView>}
            </View>
            <View style={{ width: '95%', margin: 10, backgroundColor: 'white'}}>
                <Button 
                    type="default"
                    text={cancelLabel ? "Stop Session" : 'Start session'}
                    bgColor={cancelLabel ? "brown" : null}
                    textColor={cancelLabel ? "white" : null}
                    onPress={cancelLabel ? ()=> onStopSession() : ()=> onStartSession(location)}
                />
                <View style={{padding: 15}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Location
                    </Text>
                    <Text>
                        {location.address.firstLane}
                    </Text>
                    <Text>
                        {location.address.city} {location.address.postCode}
                    </Text>
                </View>

                <View style={{padding: 15}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Contact:  <Text style={{fontWeight: 'normal'}}>{location.contact}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Telephone:  <Text style={{fontWeight: 'normal'}}>{location.telephone}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Email:  <Text style={{fontWeight: 'normal'}}>{location.email}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Website:  <Text style={{fontWeight: 'normal'}}>{location.website}</Text>
                    </Text>
                </View>

                <View style={{padding: 15}}>

                    <Text style={{fontWeight: 'bold'}}>
                        Host:  <Text style={{fontWeight: 'normal'}}>{location.host}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Next session:  <Text style={{fontWeight: 'normal'}}>{location.nextSession}</Text>
                    </Text>
                </View>

                <Button 
                    type="default"
                    text={cancelLabel ? "Stop Session" : 'Start session'}
                    bgColor={cancelLabel ? "brown" : null}
                    textColor={cancelLabel ? "white" : null}
                    onPress={cancelLabel ? ()=> onStopSession() : ()=> onStartSession(location)}
                />
            </View>
            
        </View>
        <TabMenu 
          onSettings={onSettings}
        /> 
      </View>
        )
    }
}