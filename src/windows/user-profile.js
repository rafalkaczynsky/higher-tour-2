import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput, TouchableOpacity, Image} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {TextBox, Icon, Title, Button, TabMenu, Header, ListItem, Picture} from '../components'

export default class UserProfile extends React.Component {
    render(){

        const { onSettings, sessionItem, handleEditSession } = this.props
        const name = 'profileImage'
        const image = StyleSheet.icons[name]
        return(
      <View style={[StyleSheet.window.default,]}>
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}> 
            <View style={[StyleSheet.userProfile.header]} >
                <Image source={StyleSheet.images[name]} style={StyleSheet.userProfile.headerImage} >
                </Image>
                <Text style={{marginTop: '-10%', marginLeft: 10, color: colors.white, fontSize: 25 ,backgroundColor: 'transparent'}}>Welcome Back Andy!</Text>
            </View>
            <View style={StyleSheet.userProfile.contentBox}>
                <ListItem 
                  title={sessionItem.host}
                  iconText='view/edit'
                  handleIconPressed={()=>handleEditSession(sessionItem)}
                /> 
                <ListItem 
                  title="Session One: God"
                  label="Available 14 October 2016"
                  titleStyle={{color: colors.grey2}}
                /> 
                <ListItem 
                  title="Welcome Session"
                  label="7 October 2016"
                /> 
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
        /> 
      </View>
        )
    }
}