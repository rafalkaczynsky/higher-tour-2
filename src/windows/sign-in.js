import React, {Component} from 'react'
import {ScrollView, View, Text, TextInput} from 'react-native'
import { LoginManager, AccessToken} from 'react-native-fbsdk';
import * as firebase from "firebase";


const auth = firebase.auth();
const provider = firebase.auth.FacebookAuthProvider;


import StyleSheet from '../styles'
import {colors} from '../styles/resources'
import {TextBox, Icon, Title, Button, TabMenu, Header} from '../components'

export default class SignIn extends Component {

  fbAuth(){
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then(loginResult => {
        if (loginResult.isCancelled) {
            console.log('user canceled');
            return;
        }
        AccessToken.getCurrentAccessToken()
        .then(accessTokenData => {
            const credential = provider.credential(accessTokenData.accessToken);
            return auth.signInWithCredential(credential);
        })
        .then(credData => {
            console.log(credData);
        })
        .catch(err => {
            console.log(err);
        });
    });

    // Attempt a login using the Facebook login dialog asking for default permissions.
// LoginManager.logInWithReadPermissions(['public_profile']).then(
//   function(result) {
//     if (result.isCancelled) {
//       alert('Login cancelled');
//     } else {
//       alert('Login success with permissions: '
//         +result.grantedPermissions.toString());
//     }
//   },
//   function(error) {
//     alert('Login fail with error: ' + error);
//   }
// );
  }

  render() {



    const {handleEmail, handlePassword, email, password, onNext, onSettings, onBible} = this.props

    return (
      <View style={StyleSheet.window.default}>
        <Header
          text='Sign in'
          simple
        />
        <View style={StyleSheet.signIn.container}>
          <TextBox
            header="Welcome To The Higher App!"
            paragraph="Before you start, let's create an account. Register using one of the following options to receive exclusive freebies."
            style={StyleSheet.signIn.textBox}
          />
          <View>
            <Button
              type="facebook"
              text="Sign in with Facebook"
              iconName="facebook"
              onPress={this.fbAuth}
              buttonStyle={StyleSheet.signIn.socialButton}
            />
            <Button
              type="twitter"
              text="Sign in with Twitter"
              iconName="twitter"
              buttonStyle={StyleSheet.signIn.socialButton}
            />
            <Button
              type="google"
              text="Sign in with Google"
              iconName="google"
              buttonStyle={StyleSheet.signIn.socialButton}
            />
          </View>
          <View style={{width: '60%'}}>
            <Title
              text="Sign in with email"
              textStyle={{fontSize: 18}}
              style={{marginTop: 20}}
            />
            <TextInput
              style={StyleSheet.signIn.textInput}
              onChangeText={(text) => handleEmail(text)}
              placeholder='Email'
              underlineColorAndroid='transparent'
            />
            <TextInput
              style={StyleSheet.signIn.textInput}
              onChangeText={(text) => handlePassword(text)}
              placeholder='Password'
              underlineColorAndroid='transparent'
            />
            <Button
              type="default"
              text="Next"
              buttonStyle={{height: 30}}
              onPress={onNext}
            />
          </View>
        </View>
        <TabMenu
          onSettings={onSettings}
          onBible={onBible}
        />
      </View>
    )
  }
}
