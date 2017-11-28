import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native'
import AnimatedBar from "react-native-animated-bar";

import StyleSheet from '../styles'
import {colors} from '../styles/resources'

import {Icon, Picture} from '../components'

export default class ListItem extends Component {

  constructor(props){
    super(props)

    this.state ={
      animatedProgress: 0
    }
  }

  componentWillMount(){
    this.setState({animatedProgress: 0})
  }

  componentDidMount(){
    if (this.props.progress) {
      let updatedProgress = parseFloat(this.props.progress / 100).toFixed(2)
      console.log(updatedProgress)
      this.setState({animatedProgress: updatedProgress})
    }


  }
  
  render() {
    const {
      title, 
      simple, 
      simplePlus, 
      label, 
      disabled, 
      noIcon, 
      noBorder, 
      borderBold, 
      bgColor, 
      listHeader, 
      progressBarColor,
      progressBar, 
      progress, 
      titleStyle, 
      iconText, 
      handleIconPressed, 
      imageName, 
      imageUrl, 
      containerStyle,
      animated,
      opacity} = this.props

    const border = noBorder ? null : {borderBottomColor: colors.grey2, borderBottomWidth: 0.5}
    const _borderBold = borderBold ? {borderBottomColor: colors.grey2, borderBottomWidth: 1} : null

    const image = StyleSheet.icons[imageName]

    if (!disabled) return (
      <TouchableOpacity onPress={handleIconPressed} style={[{backgroundColor: bgColor ? bgColor : colors.white}, _borderBold,]}>
        <View style={[StyleSheet.listItem.wrapper, border, !listHeader ? null :  {justifyContent: 'center' }  , {paddingRight: 30}]}>

       {imageName || imageUrl && !simple && !simplePlus &&(
            <View style={[StyleSheet.listItem.itemDetails,{opacity: opacity}]}>
             {imageName && <Image source={StyleSheet.images[imageName]} style={{width: 60, height: 60, marginRight: 15}} />}
             {imageUrl && <Image source={{uri: imageUrl}} style={{width: 60, height: 60, marginRight: 15}} />}
              <View>
                <Text style={[StyleSheet.listItem.title, titleStyle]}>{title}</Text>
                {label && <Text style={StyleSheet.listItem.readingLabel}>{label}</Text>}
              </View>
              {progressBar &&
              <View style={[StyleSheet.listItem.progressBarContainer,{backgroundColor: progressBarColor}]}>
                <View style={[StyleSheet.listItem.progressBar, {width: progress}]} />
              </View>}
            </View>
       )}

       {!imageName && !imageUrl && !simple && !simplePlus &&(
          <View style={{width: iconText ? null : '100%' }}>
            <Text style={[StyleSheet.listItem.title, titleStyle]}>{title}</Text>
            {label && <Text style={StyleSheet.listItem.label}>{label}</Text>}
            {progressBar &&
            <View style={[StyleSheet.listItem.progressBarContainer,{backgroundColor: progressBarColor, width: '90%'}]}>
              {!animated &&<View style={[StyleSheet.listItem.progressBar, {width: progress}]} />}
              {animated && <AnimatedBar
                progress={this.state.animatedProgress}
                duration={2000}
                height={5}
                fillColor={colors.grey}
                barColor={colors.yellow}
                borderWidth={0}
              />}
              </View>}
          </View>
       )}
       {!listHeader && !simple && !simplePlus &&
          <TouchableOpacity onPress={handleIconPressed} style={{display: 'flex', flexDirection: 'row'}}>
            {iconText && <Text style={{color: colors.yellow}}>{iconText}</Text>}
            {!iconText && <Icon name="next" style={StyleSheet.listItem.iconStyle}/>}
          </TouchableOpacity>
          }
        {simple && !simplePlus &&
            <View style={[StyleSheet.listItem.itemDetails,{opacity: opacity}]}>
             {imageName && <Image source={StyleSheet.images[imageName]} style={{width: 60, height: 60, marginRight: 15}} />}
             {imageUrl && <Image source={{uri: imageUrl}} style={{width: 60, height: 60, marginRight: 15}} />}
              <View>
                {label && <Text style={StyleSheet.listItem.label}>{label}</Text>}
              </View>
            </View>
          }

        {simplePlus && !simple &&
            <View style={[StyleSheet.listItem.itemDetails,{opacity: opacity}]}>
             {imageName && <Image source={StyleSheet.images[imageName]} style={{width: 60, height: 60, marginRight: 15}} />}
             {imageUrl && <Image source={{uri: imageUrl}} style={{width: 60, height: 60, marginRight: 15}} />}
              <View>
                <Text style={[StyleSheet.listItem.title, titleStyle]}>{title}</Text>
                {label && <Text style={StyleSheet.listItem.label}>{label}</Text>}
              </View>
            </View>
          }
        </View>
      </TouchableOpacity>
    ) 
    else return  ( <View style={[{backgroundColor: bgColor ? bgColor : colors.white}, _borderBold]}>
    <View style={[StyleSheet.listItem.wrapper, border, !listHeader ? null :  {justifyContent: 'center' }  , {paddingRight: 30} ]}>

   {imageName || imageUrl && !simple && !simplePlus &&(
        <View style={[StyleSheet.listItem.itemDetails,{opacity: opacity}]}>
         {imageName && <Image source={StyleSheet.images[imageName]} style={{width: 60, height: 60, marginRight: 15}} />}
         {imageUrl && <Image source={{uri: imageUrl}} style={{width: 60, height: 60, marginRight: 15}} />}
          <View>
            <Text style={[StyleSheet.listItem.title, titleStyle]}>{title}</Text>
            {label && <Text style={StyleSheet.listItem.readingLabel}>{label}</Text>}
          </View>
          {progressBar &&
          <View style={StyleSheet.listItem.progressBarContainer}>
            <View style={[StyleSheet.listItem.progressBar, {width: progress}]} />
          </View>}
        </View>
   )}

   {!imageName && !imageUrl && !simple && !simplePlus &&(
      <View style={{width: '100%'}}>
        <Text style={[StyleSheet.listItem.title, titleStyle]}>{title}</Text>
        {label && <Text style={StyleSheet.listItem.label}>{label}</Text>}
        {progressBar &&
            <View style={[StyleSheet.listItem.progressBarContainer,{backgroundColor: progressBarColor, width: '90%'}]}>
              {!animated &&<View style={[StyleSheet.listItem.progressBar, {width: progress}]} />}
              {animated && <AnimatedBar
                progress={this.state.animatedProgress}
                duration={2000}
                height={5}
                fillColor={colors.grey}
                barColor={colors.yellow}
                borderWidth={0}
              />}
              </View>}
      </View>
   )}

   {!listHeader && !simple && !simplePlus && !noIcon &&
      <TouchableOpacity onPress={handleIconPressed} style={{display: 'flex', flexDirection: 'row',}}>
        <Text style={{color: colors.yellow}}>{iconText}</Text>
        <Icon name="next" style={[StyleSheet.listItem.iconStyle, ]}/>
      </TouchableOpacity>
      }
    {simple && !simplePlus &&
        <View style={[StyleSheet.listItem.itemDetails,{opacity: opacity}]}>
         {imageName && <Image source={StyleSheet.images[imageName]} style={{width: 60, height: 60, marginRight: 15}} />}
         {imageUrl && <Image source={{uri: imageUrl}} style={{width: 60, height: 60, marginRight: 15}} />}
          <View>
            {label && <Text style={StyleSheet.listItem.label}>{label}</Text>}
          </View>
        </View>
      }

    {simplePlus && !simple &&
        <View style={[StyleSheet.listItem.itemDetails,{opacity: opacity}]}>
         {imageName && <Image source={StyleSheet.images[imageName]} style={{width: 60, height: 60, marginRight: 15}} />}
         {imageUrl && <Image source={{uri: imageUrl}} style={{width: 60, height: 60, marginRight: 15}} />}
          <View>
            <Text style={[StyleSheet.listItem.title, titleStyle]}>{title}</Text>
            {label && <Text style={StyleSheet.listItem.label}>{label}</Text>}
          </View>
        </View>
      }
    </View>
  </View>)
}
}
