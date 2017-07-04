import React, {Component} from 'react'
import {Text, Image, View, TouchableOpacity} from 'react-native'

import {Icon} from './'
import StyleSheet from '../styles'
import {colors} from '../styles/resources'

export default class Header extends Component {
  render() {
    const {text, simple, style, onBack, onNext} = this.props

    return (
        <View style={StyleSheet.header.container}>
            {simple && (
                <View style={StyleSheet.header.simpleHeaderContainer}>
                    <Text style={StyleSheet.header.text}>{text}</Text>
                </View>
            )}

            {!simple && onBack && !onNext && (
                <View style={StyleSheet.header.onBackContainer}>
                    <TouchableOpacity style={StyleSheet.header.onBackIconButton}>
                        <Icon name='back' style={StyleSheet.header.onBackIconStyle}/>
                    </TouchableOpacity>
                    <View>
                        <Text style={StyleSheet.header.text}>{text}</Text>
                    </View>
                </View>
            )}
            {!simple && onBack && onNext && (
                <View style={StyleSheet.header.fullHeaderContainer}>

                    <TouchableOpacity style={StyleSheet.header.fullHeaderIconBtton}>
                        <Icon name='back' style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                    </TouchableOpacity>

                    <View style={{flex: 0.8, alignItems: 'center'}}>
                        <Text style={StyleSheet.header.text}>{text}</Text>
                    </View>

                    <TouchableOpacity style={{flex: 0.1, alignItems: 'center'}}>
                        <Icon name='next' style={{width: 20, height: 20, resizeMode: 'contain'}}/>
                    </TouchableOpacity>       

                </View>
            )}
        </View>  
    )
  }
}
