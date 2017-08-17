import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

export default class SessionItem extends React.Component {

    render(){

        const {onSettings, session, onStartSession, cancelLabel, onStopSession} = this.props
  
        return(

      <View style={StyleSheet.window.default}>
        <Header 
          text={session.name}
          simple
        />
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}> 
            <View style={{width: '100%'}}>
              <Picture 
                name="mapsPlaceholder"
                />
            </View>

            <View style={{ width: '95%', margin: 10, backgroundColor: 'white'}}>
                <Button 
                    type="default"
                    text={cancelLabel ? "Stop Session" : 'Start session'}
                    bgColor={cancelLabel ? "brown" : null}
                    textColor={cancelLabel ? "white" : null}
                    onPress={cancelLabel ? ()=> onStopSession() : ()=> onStartSession(session)}
                />

                <View style={{padding: 15}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Location
                    </Text>
                    <Text>
                        {session.address.firstLane}
                    </Text>
                    <Text>
                        {session.address.city} {session.address.postCode}
                    </Text>
                </View>

                <View style={{padding: 15}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Contact:  <Text style={{fontWeight: 'normal'}}>{session.contact}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Telephone:  <Text style={{fontWeight: 'normal'}}>{session.telephone}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Email:  <Text style={{fontWeight: 'normal'}}>{session.email}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Website:  <Text style={{fontWeight: 'normal'}}>{session.website}</Text>
                    </Text>
                </View>

                <View style={{padding: 15}}>

                    <Text style={{fontWeight: 'bold'}}>
                        Host:  <Text style={{fontWeight: 'normal'}}>{session.host}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Next session:  <Text style={{fontWeight: 'normal'}}>{session.nextSession}</Text>
                    </Text>
                </View>

                <Button 
                    type="default"
                    text={cancelLabel ? "Stop Session" : 'Start session'}
                    bgColor={cancelLabel ? "brown" : null}
                    textColor={cancelLabel ? "white" : null}
                    onPress={cancelLabel ? ()=> onStopSession() : ()=> onStartSession(session)}
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