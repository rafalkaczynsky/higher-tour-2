import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {Icon, Picture} from '../components'

export default class ListItem extends Component {

  render() {
    const {title, label, noBorder, borderBold, bgColor, listHeader, progressBar, progress, titleStyle, iconText, handleIconPressed, imageName, imageUrl} = this.props

    const border = noBorder ? null : {borderBottomColor: colors.grey2, borderBottomWidth: 0.5}
    const _borderBold = borderBold ? {borderBottomColor: colors.grey2, borderBottomWidth: 1} : null

    const image = StyleSheet.icons[imageName]
    return (
      <TouchableOpacity onPress={handleIconPressed} style={[{backgroundColor: bgColor ? bgColor : colors.white}, _borderBold]}>
        <View style={[StyleSheet.listItem.wrapper, border, !listHeader ? null :  {justifyContent: 'center' }  ]}>


{/* with imageName option*/}
       {imageName || imageUrl && (
            <View style={[StyleSheet.listItem.itemDetails]}>
             {imageName && <Image source={StyleSheet.images[imageName]} style={{width: 60, height: 60, marginRight: 15}} />}
             {imageUrl && <Image source={{uri: imageUrl}} style={{width: 60, height: 60, marginRight: 15}} />}
              <View>
                <Text style={[StyleSheet.listItem.title, titleStyle]}>{title}</Text>
                {label && <Text style={StyleSheet.listItem.label}>{label}</Text>}
              </View>
              {progressBar && 
              <View style={StyleSheet.listItem.progressBarContainer}>
                <View style={[StyleSheet.listItem.progressBar, {width: progress}]} >
                </View>
              </View>}
            </View>
            
       )}

       {!imageName && !imageUrl && (
          <View>
            <Text style={[StyleSheet.listItem.title, titleStyle]}>{title}</Text>
            {label && <Text style={StyleSheet.listItem.label}>{label}</Text>}
            {progressBar && 
            <View style={StyleSheet.listItem.progressBarContainer}>
              <View style={[StyleSheet.listItem.progressBar, {width: progress}]} >
              </View>
            </View>}
          </View>
       )}
       {!listHeader &&
          <TouchableOpacity onPress={handleIconPressed} style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{color: colors.yellow}}>{iconText}</Text><Icon name="next" style={StyleSheet.listItem.iconStyle}/>
          </TouchableOpacity>
          }
        </View>
      </TouchableOpacity>
    )
  }
}