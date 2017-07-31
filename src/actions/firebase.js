
import * as firebase from "firebase";
import { NavigationActions } from 'react-navigation'



class _Firebase {

    async signup(email, pass, navigate, route) {

        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email, pass);

            console.log("Account created");

            // Navigate to the Home page, the user is auto logged in
            navigate(route)

        } catch (error) {
            console.log(error.toString())
        }

    }
    

    async login(email, pass) {
    
        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);

            console.log("Logged In!");

            // Navigate to the Home page
        } catch (error) {
            console.log(error.toString())
        }

    }

    async logout(navigate, route) {

        try {

            await firebase.auth().signOut();
             console.log("Logged Out!");
            // Navigate to login view
            navigate(route)
        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Sets a users mobile number  - EXAMPLE OF SETTING DATA IN DATABASE
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