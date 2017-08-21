import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput} from 'react-native'
import MapView from 'react-native-maps'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

export default class SessionItem extends React.Component {

    render(){

        const {onSettings, location, onStartSession, cancelLabel, onStopSession} = this.props


        return(

      <View style={StyleSheet.window.default}>
        <Header 
          text={location.name}
          simple
        />
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}> 
            <View style={{width: '100%', height: '30%'}}>
                <MapView
                    style={{width: '100%', height: '100%'}}
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
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