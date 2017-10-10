import * as firebase from "firebase";

class FirebaseInit {
    
    uid = '';

    constructor() {
        /** FIREBASE INIT */
        firebase.initializeApp({
            apiKey: "AIzaSyB0ipFrAfLdhO-SKSYqc2LxA_4paraed4U",
            authDomain: "higher-app-a4b52.firebaseapp.com",
            databaseURL: "https://higher-app-a4b52.firebaseio.com",
            storageBucket: "higher-app-a4b52.appspot.com"
        });
    }
}

export default new FirebaseInit() 