
import React from 'react'
import * as firebase from "firebase";

import { NavigationActions } from 'react-navigation'
import {NativeModules} from 'react-native'
import { LoginManager, AccessToken} from 'react-native-fbsdk';


//startWithConsumerKey:@"uOiSkazdnmcQYpeI0r144286A" consumerSecret:@"KpJ2CkeYQcbl7vDAyKWCFxvg6J95RURl7FLsYmM8PqZceTIChC"


const auth = firebase.auth();

const provider = firebase.auth.FacebookAuthProvider;
const providerTwitter =firebase.auth.TwitterAuthProvider;

var Constants = {
    //Dev Parse keys
    TWITTER_COMSUMER_KEY: 'uOiSkazdnmcQYpeI0r144286A',
    TWITTER_CONSUMER_SECRET: 'KpJ2CkeYQcbl7vDAyKWCFxvg6J95RURl7FLsYmM8PqZceTIChC',
  };


class _Firebase {

      // ================ TWITTER STAFF ================
      _twitterSignIn(navigate, route, events, coords, churches) {
        const   RNTwitterSignIn =  NativeModules.RNTwitterSignIn;
        //console.log('twitter')
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
             RNTwitterSignIn.logIn()
               .then((loginData)=>{
                 //console.log(loginData);
                 const { authToken, authTokenSecret } = loginData;
                 if (authToken && authTokenSecret) {
                   // we are loged successfull
                   console.log(authToken)
                       const credential = providerTwitter.credential(authToken, authTokenSecret);
                       return auth.signInWithCredential(credential);
                 }
               }).then(credData => {
                // we are loged successfull
                //console.log('twitter data')
                //console.log(credData);
                navigate(route, {userData: credData, events: events, coords: coords, churches: churches})
            }).catch((error)=>{
                 console.log('twitter error')
                 console.log(error);
               });
         }
       
         handleLogout() {
           //console.log('logout');
           RNTwitterSignIn.logOut();
           this.setState({
             isLoggedIn: false,
           });
         }

     // =============== FACEBOOK STAFF ==========


  fbAuth(navigate, route, events, coords, churches){
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then(loginResult => {
        if (loginResult.isCancelled) {
            alert('User canceled');
            return;
        }
        AccessToken.getCurrentAccessToken()
        .then(accessTokenData => {
            const credential = provider.credential(accessTokenData.accessToken);
            return auth.signInWithCredential(credential);
        })
        .then(credData => {
            // we are logged in successfull
            //console.log('facebook data')
            //console.log(credData);
            navigate(route, {userData: credData, events: events, coords: coords, churches: churches})
        })
        .catch(err => {
            console.log('Facebook error')
            console.log(error);

        });
    });
    }

    //==============  FIREBASE ================
    async signup(email, pass, navigate, route, events, coords, churches) {
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email, pass);
                // Navigate to the Home page, the user is auto logged in
                navigate(route, { email: email, events: events, coords: coords, churches: churches})

        } catch (error) {      
                return error
        }
    }
    

    async login(email, pass, navigate, route,  events, coords, churches) {
        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);
                console.log('!!!!!!!!!!!!!!!!!!')
                
                console.log(email, pass, navigate, route,  events, coords, churches)

            // Navigate to the Home page
            navigate(route, { email: email, events: events, coords: coords, churches: churches})
        } catch (error) {
            return error
        }
    }

    async logout(navigate, route) {
        try {
            await firebase.auth().signOut();
            // Navigate to login view
            navigate(route)
        } catch (error) {
            console.log('logout error')
            console.log(error);
            return error
        }

    }

   


    /**
     * 
     * Sets a users mobile number - EXAMPLE OF SETTING DATA IN DATABASE
     *
     * @param userId
     * @param mobile
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */

    static setUserMobile(userId, mobile) {

        let userMobilePath = "/user/" + userId + "/details";

        return firebase.database().ref(userMobilePath).set({
            mobile: mobile
        })

    }

    /**
     * Listen for changes to a users mobile number - EXAMPLE OF LISTENING FOR CHANGES
     * @param userId
     * @param callback Users mobile number
     */
    static listenUserMobile(userId, callback) {

        let userMobilePath = "/user/" + userId + "/details";

        firebase.database().ref(userMobilePath).on('value', (snapshot) => {
            var mobile = "";
            if (snapshot.val()) {
                mobile = snapshot.val().mobile
            }
            callback(mobile)
        });
    }



}

export default new _Firebase();