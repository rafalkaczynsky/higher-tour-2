import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import { connect } from 'react-redux'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

class UserProfile extends React.Component {
  constructor(props){
   super(props)

   this.state ={
     sessions: []
   }
  }

  getFirstWord(str) {
    let spacePosition = str.indexOf(' ');
    if (spacePosition === -1){
      atPosition = str.indexOf('@');
      if (atPosition === -1){
        return str;
       } else return str.substr(0, atPosition);
    } else  return str.substr(0, spacePosition);   
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  componentWillMount(){


  }

    render(){

        const { onSettings, locationSelected, locations, handleEditSession, userData, months} = this.props
        const name = 'profileImage'
        const image = StyleSheet.icons[name]

        console.log('User profile window')
        let userFirstName = this.getFirstWord(this.props.userData.displayName ? this.props.userData.displayName : this.props.userData.email)
        userFirstName = this.capitalizeFirstLetter(userFirstName)

        return(
      <View style={[StyleSheet.window.default,]}>
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}> 
            <View style={[StyleSheet.userProfile.header]} >
                <Image source={StyleSheet.images[name]} style={StyleSheet.userProfile.headerImage} >
                </Image>
                <Text style={{marginTop: '-10%', marginLeft: 10, color: colors.white, fontSize: 25 ,backgroundColor: 'transparent'}}>
                  Welcome Back {userFirstName}!
                </Text>
            </View>
            <View style={StyleSheet.userProfile.contentBox}>
                <ListItem 
                  title={locationSelected.name}
                  iconText='view/edit'
                  handleIconPressed={()=>handleEditSession(locationSelected, locations, userData)}
                /> 

                {this.props.sessions.map((item, index)=> {
                   let sessionDate = item.UTCTime
                   const sessionDateFormatted = sessionDate.substring(8,10)+' '+ months[parseFloat(sessionDate.substring(5,7))-1]+' '+sessionDate.substring(0,4)
                   if (index === 1)
                    return(
                      <ListItem 
                        key={item.aaaSession + '-' + index}
                        title={item.aaaSession}
                        label={'Available from: ' + sessionDateFormatted}
                        titleStyle={{color: colors.grey2}}
                      /> 
                    )
                })}

                {this.props.sessions.map((item, index)=> {
                   let sessionDate = item.UTCTime
                   const sessionDateFormatted = sessionDate.substring(8,10)+' '+ months[parseFloat(sessionDate.substring(5,7))-1]+' '+sessionDate.substring(0,4)
                   if (index === 0)
                    return(
                      <ListItem 
                        key={item.aaaSession + '-' + index}
                        title={item.aaaSession}
                        label={sessionDateFormatted}
                      /> 
                    )
                })}


            </View>
            <View style={StyleSheet.userProfile.contentBox}>
                <ListItem 
                  title='Higher Bible Readings'
                  listHeader
                /> 
                <ListItem 
                  title='Journey through Acts'
                  progressBar
                  progress="50%"
                /> 
                <ListItem
                    title="See all reading plans"
                    bgColor={colors.grey3}
                    borderBold
                />
            </View>
        </View>
        <TabMenu 
          onSettings={onSettings}
          activeTabName={this.props.activeTabName}
          onBible={this.props.onBible}
        /> 
      </View>
        )
    }
}


function mapStateToProps(state){
  return({
      sessions: state.sessions,
  });
}

export default connect(mapStateToProps)(UserProfile);