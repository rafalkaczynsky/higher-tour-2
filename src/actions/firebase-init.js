import * as firebase from "firebase";

class FirebaseInit {
    
    uid = '';

    constructor() {
    console.log('Firebase INIT!!!');
        /** FIREBASE INIT */
        firebase.initializeApp({
            apiKey: "AIzaSyB0ipFrAfLdhO-SKSYqc2LxA_4paraed4U",
            authDomain: "higher-app-a4b52.firebaseapp.com",
            databaseURL: "https://higher-app-a4b52.firebaseio.com",
            storageBucket: "higher-app-a4b52.appspot.com"
        });
        /*
        // user authorisation	
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.uid = user.uid;
            } else {
                firebase.auth().signInAnonymously().catch((error) => {   
                alert(error.message);
                });
            }
        });
        */
    }
}

export default new FirebaseInit() 