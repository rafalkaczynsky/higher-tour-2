import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Dimensions, TouchableOpacity} from 'react-native'
import MapView from 'react-native-maps'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

export default class SessionItem extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          region: {
            latitude: this.props.location.geoLoc.latitude,
            longitude: this.props.location.geoLoc.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922 * ASPECT_RATIO,        
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
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0922 * ASPECT_RATIO,        
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
    const {
        onSettings, 
        location, 
        onStartSession, 
        cancelLabel, 
        onStopSession, 
        onHome, 
        onBible, 
        churchSelected, 
        onHostPressed,
        onTelPressed,
        onWebPressed,
        onEmailPressed,
        onGoBack,
    } = this.props

    const coordinate = {
        latitude: location.geoLoc.latitude,
        longitude: location.geoLoc.longitude 
    }

    return(

      <View style={StyleSheet.window.default}>
        <Header 
          text={location.name}
          onBack
          onBackCallback={onGoBack}
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
          <ScrollView style={{width: '95%',margin: 10,flex: 1,}}>
            <View 
                style={{
                    flex: 1,
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
     
                    backgroundColor: 'white'
        
                }}>

                <Button 
                    type="default"
                    text={cancelLabel ? "Stop Session" : 'Start session'}
                    bgColor={cancelLabel ? "brown" : null}
                    textColor={cancelLabel ? "white" : null}
                    onPress={cancelLabel ? ()=> onStopSession() : ()=> onStartSession(location)}
                    style={{flex: 1}}
                />
                <View style={{margin: 10}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Location
                    </Text>
                    <Text>
                        {location.address.firstLine}
                    </Text>
                    <Text>
                        {location.address.city} {location.address.postcode}
                    </Text>
                </View>

                <View style={{margin: 10}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Contact:  <Text style={{fontWeight: 'normal'}}>{location.contactPerson}</Text>
                    </Text>
                    <TouchableOpacity style={{marginTop: 5}} onPress={()=> onTelPressed(location.telephone)}>
                        <Text style={{fontWeight: 'bold'}}>
                            Telephone:  
                            <Text style={{fontWeight: 'normal'}}>
                           {' ' + location.telephone + ' '}        
                            </Text>
                                <Icon 
                                    name="externalLink"
                                />

                        </Text>
    
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 5}} onPress={()=> onEmailPressed(location.email)}>
                        <Text style={{fontWeight: 'bold'}}>
                            Email:  
                            <Text style={{fontWeight: 'normal'}}>
                                {' ' + location.email + ' '}
                            </Text>
                            <Icon 
                                name="externalLink"

                            />
                         </Text>
                    </TouchableOpacity>

                </View>

                <View style={{margin: 10}}>
                     <TouchableOpacity style={{marginTop: 5}} onPress={()=> onWebPressed(location.website)}>
                        <Text style={{fontWeight: 'bold'}}>
                            Visit Website {' '}
                            <Icon 
                                name="externalLink"
                            />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{marginTop: 5}} onPress={onHostPressed}>
                        <Text style={{fontWeight: 'bold'}}>
                            View Host Church {' '}
                            <Icon 
                                name="externalLink"
                            />
                        </Text>
                    </TouchableOpacity>     
                </View>

                </View>
                </ScrollView>
            
        </View>
        <TabMenu 
          onSettings={onSettings}
          onHome={onHome}
          onBible={onBible}
          activeTabName={this.props.activeTabName}
        /> 
      </View>
        )
    }
}