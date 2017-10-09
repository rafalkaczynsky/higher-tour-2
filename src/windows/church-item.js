import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, Dimensions, TouchableOpacity, Linking} from 'react-native'
import MapView from 'react-native-maps'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

export default class ChurchItem extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          region: {
            latitude: this.props.church.geoLoc.latitude,
            longitude: this.props.church.geoLoc.longitude,
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
                latitude: this.props.church.geoLoc.latitude,
                longitude: this.props.church.geoLoc.longitude,
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
    const {onSettings,  onHome, onBible, onGoToWebsite, onGoBack, church, loginStatus} = this.props

    const coordinate = {
        latitude: church.geoLoc.latitude,
        longitude: church.geoLoc.longitude 
    }

    return(

      <View style={StyleSheet.window.default}>
        <Header 
          text={church.name}
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
                    text={'GO TO WEBSITE'}
                    onPress={()=> {
	                    const url = church.website;
	                    Linking.canOpenURL(url)
		                .then((supported) => {
			                if (supported) {
				                return Linking.openURL(url)
					            .catch(() => null);
		                    }
		                });
                    }}
                    style={{flex: 1}}
                />
                <View style={{margin: 10}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Location
                    </Text>
                    <Text>
                        {church.address.firstLane}
                    </Text>
                    <Text>
                        {church.address.city} {church.address.postCode}
                    </Text>
                </View>

                <View style={{margin: 10}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Contact:  <Text style={{fontWeight: 'normal'}}>{church.contact}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Telephone:  <Text style={{fontWeight: 'normal'}}>{church.telephone}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Email:  <Text style={{fontWeight: 'normal'}}>{church.email}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Website:  <Text style={{fontWeight: 'normal'}}>{church.website}</Text>
                    </Text>
                </View>

                <View style={{margin: 10}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Host:  <Text style={{fontWeight: 'normal'}}>{church.name}</Text>
                    </Text>
                    <Text style={{fontWeight: 'bold'}}>
                        Next session:  <Text style={{fontWeight: 'normal'}}>{church.nextSession}</Text>
                    </Text>
                </View>

                <Button 
                    type="default"
                    text={loginStatus === 'loggedInPlus' ? 'GO BACK' : 'SEE MORE CHURCHES'}
                    onPress={onGoBack}
                    style={{flex: 1}}
                />
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