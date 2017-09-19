import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'

import StyleSheet from '../../styles'
import {colors} from '../../styles/resources'

const _TextInput = ({
  input: {onChange, value, ...restInput},
  onChangeText,
  type,
  ref,
  placeholder,
  style,
  errors,
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
  clearTextOnFocus,
  multiline,
  rightBar,
  keyboardType,
  meta: {touched, error, warning, dirty,invalid}
}) => {
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
        ref={ref}
        error={errors}
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
  )
}

export default _TextInput