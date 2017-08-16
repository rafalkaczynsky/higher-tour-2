
import React from 'react'
import * as firebase from "firebase";
import { NavigationActions } from 'react-navigation'



class _Firebase {
    async signup(email, pass, navigate, route) {
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email, pass);
                alert("Account created");
                // Navigate to the Home page, the user is auto logged in
                navigate(route)

        } catch (error) {      
                console.log(error)
                switch(error.code) {

                    case "auth/email-already-in-use":
                        this.login(email, pass, navigate, route); 
                        break;
                    case "auth/invalid-email":
                        alert(error.code)
                        break;
                    case "auth/weak-password":
                        alert(error.code);
                        break
                    
                    default:
                    break;
                }
        }
    }
    

    async login(email, pass, navigate, route) {
        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);

            alert("Logged In!");
            // Navigate to the Home page
            navigate(route)
        } catch (error) {
            alert(error.toString())
        }
    }

    async logout(navigate, route) {
        try {
            await firebase.auth().signOut();
             alert("Logged Out!");
            // Navigate to login view
            navigate(route)
        } catch (error) {
            alert(error);
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