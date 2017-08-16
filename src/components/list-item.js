import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {Icon} from '../components'

export default class ListItem extends Component {

  render() {
    const {title, label, noBorder, borderBold, bgColor} = this.props

    const border = noBorder ? null : {borderBottomColor: colors.grey2, borderBottomWidth: 0.5}
    const _borderBold = borderBold ? {borderBottomColor: colors.grey2, borderBottomWidth: 1} : null

    return (
      <View  style={[{backgroundColor: bgColor ? bgColor : colors.white}, _borderBold]}>
        <View style={[StyleSheet.listItem.wrapper, border]}>
          <View>
            <Text style={StyleSheet.listItem.title}>{title}</Text>
            {label && <Text style={StyleSheet.listItem.label}>{label}</Text>}
          </View>
          <TouchableOpacity  >
            <Icon name="next" style={StyleSheet.listItem.iconStyle}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}