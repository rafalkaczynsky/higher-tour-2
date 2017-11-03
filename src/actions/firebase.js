
import React from 'react'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'
import {NativeModules} from 'react-native'
import { LoginManager, AccessToken} from 'react-native-fbsdk'
import * as ACTIONS from './actions/actions'

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
      _twitterSignIn(props) {
        const   RNTwitterSignIn =  NativeModules.RNTwitterSignIn;

        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
             RNTwitterSignIn.logIn()
               .then((loginData)=>{
           
                 const { authToken, authTokenSecret } = loginData;
                 if (authToken && authTokenSecret) {
                   // we are loged successfull
            
                       const credential = providerTwitter.credential(authToken, authTokenSecret);
                       return auth.signInWithCredential(credential);
                 }
               }).then(credData => {
                    //..
            }).catch((error)=>{
         
                 props.dispatch(ACTIONS.UPDATE_SHOW_LOGGIN_CONTENT(true))
               });
         }
       
         handleLogout() {
       
           RNTwitterSignIn.logOut();
           this.setState({
             isLoggedIn: false,
           });
         }

     // =============== FACEBOOK STAFF ==========


  fbAuth(props){
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then(loginResult => {
        if (loginResult.isCancelled) {
            props.dispatch(ACTIONS.UPDATE_SHOW_LOGGIN_CONTENT(true))
            return;
        }
        AccessToken.getCurrentAccessToken()
        .then(accessTokenData => {
            const credential = provider.credential(accessTokenData.accessToken);
            return auth.signInWithCredential(credential);
        })
        .then(credData => {
            //...
        })
        .catch(err => {


        });
    });
    }

    //==============  FIREBASE ================
    async signup(email, pass, navigate, route) {
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email, pass);
                //navigate(route)
                const resetAction = NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                      NavigationActions.navigate({ routeName: route})
                    ]
                    })
                  
                    props.navigation.dispatch(resetAction)
        } catch (error) {      
                return error
        }
    }
    

    async login(email, pass, navigate, route) {
        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);
                //navigate(route)
                const resetAction = NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                      NavigationActions.navigate({ routeName: route})
                    ]
                    })
                  
                    props.navigation.dispatch(resetAction)
        } catch (error) {
            return error
        }
    }
//  );

    async logout(navigate, route, clearUserDataFromState, ) {
        try {
            await firebase.auth().signOut();
            clearUserDataFromState;
            // Navigate to SignIn
            navigate
        } catch (error) {

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