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
     sessions: [],
     isMounted : false
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

    getMyData(arrayOfObjectsWithIds) {

      var functionArray = arrayOfObjectsWithIds.map( function (value) {
         return {myGetDataFunction: MyService.getMyData(value.id)};
      })
      var promises = functionArray.map( function (getDataFunction) {
      var deferred =$q.defer(); getDataFunction.myGetDataFunction.success( function(data) { deferred.resolve(data) }). error( function (error) { deferred.reject(); }); return deferred.promise; }); $q.all(promises).then( function (dataArray) { })
    };

    render(){
        const { onSeeAllReadings, onSettings, locationSelected, locations, handleEditSession, userData, months, bibleReading,  bibleReadingNames, lastReadDayNumber,  onHandleReadingItemPressed, aaaSession, onWeek} = this.props
        const name = 'profileImage'
        const image = StyleSheet.icons[name]

        let userFirstName

        if (this.props.userData){
          userFirstName = this.getFirstWord(this.props.userData.displayName ? this.props.userData.displayName : this.props.userData.email)
          userFirstName = this.capitalizeFirstLetter(userFirstName)
        } else {
          userFirstName = 'Unknown'
        }

        let locationSelectedName = ''

        if (locationSelected) {
         locationSelectedName = locationSelected.name
        } else {
         locationSelectedName = ''
        }

        return(
      <View style={[StyleSheet.window.default]}>
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
            <View style={[StyleSheet.userProfile.header]} >
                <Image source={StyleSheet.images[name]} style={StyleSheet.userProfile.headerImage} >
                  <Text style={{ position: 'absolute', bottom: 5, marginLeft: 10, color: colors.white, fontSize: 25 ,backgroundColor: 'transparent'}}>
                    Welcome Back {userFirstName}!
                  </Text>
                </Image>
            </View>
            <ScrollView style={{width: '95%'}}>
            <View style={StyleSheet.userProfile.contentBox}>

                <ListItem
                  title={locationSelectedName}
                  iconText='view/edit'
           
                  handleIconPressed={()=>handleEditSession(locationSelected, locations, userData)}
                />

                {this.props.sessions.length === 0 &&
                  <ListItem
                      title={''}
                      simple
                      label={'Higher sessions coming soon'}
                    />
                }

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
                        disabled
                      />
                    )
                })}

                {/*  - -------- !!!!!! !!!!!!!!!!!!!  =======  !!!!!!-!!!!!!!!!!!!!-------*/}
                {this.props.sessions.map((item, index)=> {
                   let sessionDate = item.UTCTime
                   const sessionDateFormatted = sessionDate.substring(8,10)+' '+ months[parseFloat(sessionDate.substring(5,7))-1]+' '+sessionDate.substring(0,4)
                   const aaaSessionItem = item.aaaSession

                   if (index === 0)
                    return(
                      <ListItem
                        key={item.aaaSession + '-' + index}
                        title={item.aaaSession}
                        label={sessionDateFormatted}
                        handleIconPressed={()=>onWeek(item.aaaSession, sessionDateFormatted)}
                        simplePlus={item.expired ? true : null}
                      />
                    )
                })}

            </View>
            <View style={StyleSheet.userProfile.contentBox}>
                <ListItem
                  title='Higher Bible Readings'
                  listHeader
                  disabled
                /> 

                {this.props.appUserBibleReading.map((item, index) => {

                const title = this.props.appUserBibleReadingNames[index]
                const progress = item.progress + '%'
                return (
                  <ListItem
                    key={'appUserBibleReadingKey'+ index}
                    title={title}
                    progressBar
                    progress={progress}
                    progressBarColor={colors.grey3}
                    handleIconPressed={() => onHandleReadingItemPressed(title)}
                  />
                  )
                })}

                <ListItem
                    title="See all reading plans"
                    bgColor={colors.grey3}
                    borderBold
                    handleIconPressed={this.props.onSeeAllReadings}

                />
            </View>
            </ScrollView>
        </View>
        <TabMenu
          onSettings={onSettings}
          activeTabName={'Home'}
          onBible={this.props.onBible}
        />
      </View>
        )
    }
}


export default UserProfile
