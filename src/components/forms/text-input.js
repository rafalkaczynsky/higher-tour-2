import React, {Component} from 'react'
import {View, Text, TextInput, findNodeHandle} from 'react-native'

import StyleSheet from '../../styles'
import {colors} from '../../styles/resources'

export default class _TextInput extends Component{
  constructor(props){
    super(props)

  }

  inputFocused (refName) {
/* 
      setTimeout(() => {
        let scrollResponder= this.props.handleOnFocus.getScrollResponder()
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
          findNodeHandle(this.refs[refName]),
          250, //additionalOffset
          true
        );
      }, 50)*/
  }

render() {

 const  {
  input: {onChange, value, onFocus, ...restInput},
  onChangeText,
  type,
  placeholder,
  style,
  errors,
  handleOnFocus,
  autoCapitalize,
  autoCorrect,
  textStyle,
  autoFocus,
  returnKeyType,
  selectTextOnFocus,
  enablesReturnKeyAutomatically,
  onSubmitEditing,
  icon,
  secureTextEntry,
  ref,
  clearTextOnFocus,
  multiline,
  reference,
  rightBar,
  keyboardType,
  meta: {touched, error, warning, dirty,invalid}
} = this.props



  let borderStyleOnError = null
  let textStyleOnError = null
  let errorOutput = null

  touched  && error ? borderStyleOnError = {borderBottomColor: colors.pink} : null
  touched && error ? errorOutput = (<Text style={StyleSheet.signIn.error}>{error}</Text>) : null


   return (
    <View>
      {errorOutput}
      <TextInput
        value={value}
        onChangeText={onChange}
        type={type}
        ref={reference}
        error={errors}
        onFocus={this.inputFocused.bind(this, reference)}
        placeholder={placeholder}
        style={[style, borderStyleOnError]}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        textStyle={[textStyle, textStyleOnError]}
        underlineColorAndroid='transparent'
        autoFocus={autoFocus}
        returnKeyType={returnKeyType}
        selectTextOnFocus={selectTextOnFocus}
        enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
        onSubmitEditing={onSubmitEditing}
        icon={icon}
        secureTextEntry={secureTextEntry}
        clearTextOnFocus={clearTextOnFocus}
        multiline={multiline}
        rightBar={rightBar}
        keyboardType={keyboardType}
      />
    </View>
  )}
}

