import React, {Component} from 'react'
import {ScrollView, View, Text} from 'react-native'
import twitter, {auth} from 'react-native-twitter';
import {Field, reduxForm} from 'redux-form'

import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import validation from '../config/validation'
import {TextBox, Icon, Title, Button, TabMenu, Header} from '../components'
import {TextInput} from '../components/forms'

var dataBase 
var Events
var latestSnapshot = null;

class SignIn extends Component {

  constructor(props){
    super(props)

    this.state = {
      events:[]
    }
  }

  submit = values => {
        this.props.onNext(values.email, values.password)
  }


  render() {

    const {handleEmail, handlePassword, email, password, onNext, onSettings, onBible, onTwitter, onFacebook, handleSubmit, valid} = this.props

    let errorCode = this.props.signInError && this.props.signInError.code;
    let showError = this.props.showError

    return (
      <View style={StyleSheet.window.default}>

        <Header
          text='Sign in'
          simple
        />
        <View style={StyleSheet.signIn.container}>
          <TextBox
            header="Welcome To The Higher App!!!"
            paragraph="Before you start, let's create an account. Register using one of the following options to receive exclusive freebies."
            style={StyleSheet.signIn.textBox}
          />
          <View>
            <Button
              type="facebook"
              text="Sign in with Facebook"
              iconName="facebook"
              onPress={onFacebook}
              buttonStyle={StyleSheet.signIn.socialButton}
            />
            <Button
              type="twitter"
              text="Sign in with Twitter"
              iconName="twitter"
              onPress={onTwitter}
              buttonStyle={StyleSheet.signIn.socialButton}
            />
          </View>
          <View style={{width: '60%'}}>
            <Title
              text="Sign in with email"
              textStyle={{fontSize: 18}}
              style={{marginTop: 20}}
            />

            {errorCode === 'auth/invalid-email' && showError && (
              <Text style={StyleSheet.signIn.error}>The email address is badly formatted</Text>
            )}
            {errorCode === 'auth/user-not-found' && showError && (
              <Text style={StyleSheet.signIn.error}>User not found</Text>
            )}
            {errorCode === 'auth/user-disabled' && showError &&  (
              <Text style={StyleSheet.signIn.error}>User is disabled</Text>
            )}
            {errorCode === 'auth/account-exists-with-different-credential'&& showError && (
              <Text style={StyleSheet.signIn.error}>You've signed up with this email already. Please login with your details</Text>
            )}

            <Field
            name="email"
            component={TextInput}
            type="flat"
            ref="email"
            placeholder={"Email"}
            validate={[validation.required, validation.email]}
            autoCapitalize="none"
            autoCorrect={false}
            style={StyleSheet.signIn.textInput}
            returnKeyType="next"
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
            keyboardType="email-address"
            icon="email"
            />
            {errorCode === 'auth/wrong-password' && showError &&  (
              <Text style={StyleSheet.signIn.error}>The password is invalid or you've been signed up with Facebook or Twitter. </Text>
            )}
            {errorCode === 'auth/weak-password' && showError &&  (
              <Text style={StyleSheet.signIn.error}>Password should be at least 6 characters</Text>
            )}

          <Field
            name="password"
            component={TextInput}
            type="flat"
            ref="password"
            placeholder={"Password"}
            validate={[validation.required, validation.minChars]}
            style={StyleSheet.signIn.textInput}
            secureTextEntry={!this.state.showPassword}
            returnKeyType="next"
            selectTextOnFocus={false}
            clearTextOnFocus={false}
            enablesReturnKeyAutomatically={true}
            icon="password"
            multiline={false}
          />
            <Button
              type={valid ? "default" : "disable"}
              text="Next"
              buttonStyle={{height: 30}}
              onPress={handleSubmit(this.submit)}
            />
          </View>
        </View>
        <TabMenu
          onSettings={onSettings}
          onBible={onBible}
          activeTabName={this.props.activeTabName}
        />
      </View>
    )
  }
}

export default reduxForm({
  form: 'SignUpValidation',
})(SignIn)