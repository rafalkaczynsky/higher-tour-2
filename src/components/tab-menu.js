import React, {Component} from 'react'
import {View, Text, TouchableHighlight} from 'react-native'

import StyleSheet from '../styles'
import {Icon} from './'

export default class TabMenu extends Component {
  render() {
   // const {Icon} = this.props
   // const image = StyleSheet.icons[name + (active ? 'Active' : '')]

    return (
        <View style={{flex:1, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: "black"}}>
          <TouchableHighlight
            style={{flex: 1, alignItems: 'center', backgroundColor: 'yellow', paddingBottom: 5}}
            onPress={()=> alert('H pressed!!')} 
            underlayColor="yellow">
              <View>
                <Icon 
                    name="logoActive" 
                    style={{width: 25, height: 25, margin: 10, marginBottom: 5}}
                />
                <Text style={{textAlign: 'center'}}>Home</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{flex: 1, alignItems: 'center', paddingBottom: 5}}
            onPress={()=> alert('bible pressed!!')} 
            underlayColor="yellow">
              <View >
                <Icon 
                    name="bible" 
                    style={{width: 25, height: 25, margin: 10, marginBottom: 5}}
                />
                <Text style={{textAlign: 'center', color: 'white'}}>Bible</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{flex: 1, alignItems: 'center', paddingBottom: 5 }}
            onPress={()=> alert('Events pressed!!')} 
            underlayColor="yellow">
              <View >
                <Icon 
                    name="events" 
                    style={{width: 25, height: 25, margin: 10, marginBottom: 5}}
                />
                <Text style={{textAlign: 'center', color: 'white'}}>Events</Text>                
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{flex: 1, alignItems: 'center', paddingBottom: 5}}
            onPress={()=> alert('Settings pressed!!')} 
            underlayColor="yellow">
              <View >
                <Icon 
                    name="settings" 
                    style={{width: 25, height: 25, margin: 10, marginBottom: 5}}
                />
                <Text style={{textAlign: 'center', color: 'white'}}>Settings</Text>
            </View>
          </TouchableHighlight>
        </View>
    )
  }
}