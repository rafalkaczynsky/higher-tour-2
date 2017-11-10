import React, {Component} from 'react'
import {Text, Image, View, TouchableOpacity} from 'react-native'

import {Icon} from './'
import StyleSheet from '../styles'
import {colors} from '../styles/resources'

export default class Header extends Component {
  render() {
    const {text, simple, style, onBack, onBackCallback, onNextCallback, onNext} = this.props

    return (
        <View style={StyleSheet.header.container}>
            {simple && (
                <View style={StyleSheet.header.simpleHeaderContainer}>
                    <Text style={StyleSheet.header.text}>{text}</Text>
                </View>
            )}

            {!simple && onBack && !onNext && (
                <View style={StyleSheet.header.onBackContainer}>
                    <TouchableOpacity onPress={onBackCallback} style={[StyleSheet.header.onBackIconButton, {paddingRight: 30}]}>
                        <Icon name='back' style={StyleSheet.header.onBackIconStyle}/>
                    </TouchableOpacity>
                    <View>
                        <Text style={StyleSheet.header.text}>{text}</Text>
                    </View>
                </View>
            )}
            {!simple && !onBack && onNext && (
                <View style={StyleSheet.header.onNextContainer}>
                    <View>
                        <Text style={StyleSheet.header.text}>{text}</Text>
                    </View>
                    <TouchableOpacity onPress={onNextCallback} style={[StyleSheet.header.onNextIconButton, {paddingLeft: 30}]}>
                        <Icon name='next' style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                    </TouchableOpacity>       
                </View>
            )}
            {!simple && onBack && onNext && (
                <View style={StyleSheet.header.fullHeaderContainer}>

                    <TouchableOpacity  onPress={onBackCallback}   style={[StyleSheet.header.fullHeaderIconBtton, {paddingRight: 30}]}>
                        <Icon name='back' style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                    </TouchableOpacity>

                    <View style={{flex: 0.8, alignItems: 'center'}}>
                        <Text style={StyleSheet.header.text}>{text}</Text>
                    </View>

                    <TouchableOpacity onPress={onNextCallback} style={{flex: 0.1, alignItems: 'center', paddingLeft: 30}}>
                        <Icon name='next' style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                    </TouchableOpacity>       

                </View>
            )}
        </View>  
    )
  }
}
