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
    const {
        onSettings,  
        onHome, 
        onBible, 
        onGoToWebsite, 
        onGoBack, 
        church, 
        loginStatus,
        onTelPressed,
        onWebPressed,
        onEmailPressed,
        onGoToSession,
    } = this.props

    const coordinate = {
        latitude: church.geoLoc.latitude,
        longitude: church.geoLoc.longitude
    }
    function addhttp(url) {
       if (!/^(f|ht)tps?:\/\//i.test(url)) {
          url = "http://" + url;
       }
       return url;
    }
    if(church.website){
      church.website = addhttp(church.website)
    }
    return(

      <View style={StyleSheet.window.default}>
        <Header
          text={church.name}
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
                title={church.name}
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
                    text={'VIEW SESSION'}
                    onPress={onGoToSession}
                    style={{flex: 1}}
                />
                <View style={{margin: 10}}>
                <Text style={{fontWeight: 'bold'}}>
                    Location
                </Text>
                <Text>
                    {church.address.firstLine}
                </Text>
                <Text>
                    {church.address.city} {church.address.postcode}
                </Text>
            </View>

            <View style={{margin: 10}}>
               {(!!church.contactPerson && church.contactPerson != "") &&
                  <Text style={{fontWeight: 'bold'}}>
                      Contact:  <Text style={{fontWeight: 'normal'}}>{church.contactPerson}</Text>
                  </Text>
                }
                {(!!church.telephone && church.telephone != "")&&
                  <TouchableOpacity style={{marginTop: 5, flexDirection: 'row', alignItems: 'center'}} onPress={()=> onTelPressed(church.telephone)}>
                      <Text style={{fontWeight: 'bold'}}>
                          Telephone:
                          <Text style={{fontWeight: 'normal'}}>
                         {' ' + church.telephone + ' '}
                          </Text>
                      </Text>
                      <Icon
                          name="externalLink"
                          style={{height: '50%', resizeMode:'contain'}}
                      />
                  </TouchableOpacity>
                }
                {(!!church.email && church.email != "") &&
                  <TouchableOpacity style={{marginTop: 5, flexDirection: 'row', alignItems: 'center'}} onPress={()=> onEmailPressed(church.email)}>
                      <Text style={{fontWeight: 'bold'}}>
                          Email:
                          <Text style={{fontWeight: 'normal'}}>
                              {' ' + church.email + ' '}
                          </Text>
                       </Text>
                       <Icon
                          name="externalLink"
                          style={{height: '50%', resizeMode:'contain'}}
                       />
                  </TouchableOpacity>
                }

            </View>

            <View style={{margin: 10}}>
                {(!!church.facebook && church.facebook != "") &&  <TouchableOpacity style={{marginTop: 5, flexDirection: 'row', alignItems: 'center'}} onPress={()=> onWebPressed(church.facebook)}>
                   <Text style={{fontWeight: 'bold'}}>
                       Find us on Facebook
                   </Text>
                   <Icon
                       name="externalLink"
                       style={{height: '50%', resizeMode:'contain'}}
                   />
               </TouchableOpacity>}
               {!!church.twitter && church.twitter != ""  &&  <TouchableOpacity style={{marginTop: 5, flexDirection: 'row', alignItems: 'center'}} onPress={()=> onWebPressed(church.twitter)}>
                  <Text style={{fontWeight: 'bold'}}>
                      Follow us on Twitter
                  </Text>
                  <Icon
                      name="externalLink"
                      style={{height: '50%', resizeMode:'contain'}}
                  />
              </TouchableOpacity>}
                {(!!church.website && church.website != "") &&
                   <TouchableOpacity style={{marginTop: 5, flexDirection: 'row', alignItems: 'center'}} onPress={()=> onWebPressed(church.website)}>
                      <Text style={{fontWeight: 'bold'}}>
                          Visit Website {' '}
                      </Text>
                      <Icon
                          name="externalLink"
                          style={{height: '50%', resizeMode:'contain'}}
                      />
                  </TouchableOpacity>
                }
            </View>
             {/*}
                <Button
                    type="default"
                    text={loginStatus === 'loggedInPlus' ? 'GO BACK' : 'SEE MORE CHURCHES'}
                    onPress={onGoBack}
                    style={{flex: 1}}
                />*/}

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
