# higher-app
Higher Tour App

This is app for....

1.
How to run it locally from command line

- git clone https://rafalkaczynsky@bitbucket.org/mediacabin/higher-app.git
- cd higher-app
- yarn install
- yarn add react-native-fbsdk@0.6.0
- react-native link  
- yarn add react-native-fbsdk@0.6.1

errors after fresh install

1. Override error
where?

- node_modules/react-native-fbsdk/android/src/main/java/com/facebook/reactnative/androidsdk/FBSDKPackage.java:61  
- node_modules/react-native-twitter/android/src/main/java/ga/piroro/rnt/RNTPackage.java:21:
- node_modules/react-native-twitter-signin/android/src/main/java/com/goldenowl/twittersignin/TwitterSigninPackage.java:28

solution: 
remove @Override

2. getIntent error on close app after press backButton on device

where?

-node_modules/react-native-fcm/src/main/java/com/evollu/react/fcm/FIRMessagingModule.java

soultion:

replace:

    @ReactMethod
    public void getInitialNotification(Promise promise){
        Activity activity = getCurrentActivity();
        Intent intent = activity.getIntent();
         if(activity == null || (intent.getAction() != null && intent.getAction().equals("android.intent.action.MAIN"))){
             promise.resolve(null);
             return;
         }
        promise.resolve(parseIntent(activity.getIntent()));
    }
	
with:

    @ReactMethod
    public void getInitialNotification(Promise promise){
        Activity activity = getCurrentActivity();
        if (activity != null){
            Intent intent = activity.getIntent();
            if(activity == null || (intent.getAction() != null && intent.getAction().equals("android.intent.action.MAIN"))){
                promise.resolve(null);
                return;
            }
            promise.resolve(parseIntent(activity.getIntent()));
        }

    }

 
2.
- Run on Device Android
react-native run-android

- Run on iOS
react-native run-ios





-----------------------------------------------------

Packages versions : 


	{
	"name": "HigherApp",
	"version": "0.0.1",
	"private": true,
	"scripts": {
		"start": "react-native start",
		"ios": "react-native run-ios",
		"android": "react-native run-android",
		"test": "jest",
		"build:ios": "node node_modules/react-native/local-cli/cli.js bundle --entry-file='index.ios.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios' --assets-dest='./ios'"
	},
	"dependencies": {
		"babel-preset-react-native": "2.1.0",
		"color": "^2.0.0",
		"firebase": "^4.3.0",
		"firebase-messaging": "^1.0.6",
		"geolib": "^2.0.23",
		"react": "16.0.0-alpha.12",
		"react-native": "0.47.2",
		"react-native-fbsdk": "0.6.1",
		"react-native-fcm": "^9.6.1",
		"react-native-firebase-auth": "^1.0.0",
		"react-native-keyboard-aware-scroll-view": "^0.3.0",
		"react-native-keyboard-spacer": "^0.4.0",
		"react-native-maps": ">=0.12.4",
		"react-native-permissions": "^1.0.1",
		"react-native-sound": "^0.10.4",
		"react-native-twitter": "^0.1.0",
		"react-native-twitter-signin": "^1.0.2",
		"react-navigation": "^1.0.0-beta.11",
		"react-redux": "^5.0.6",
		"redux": "^3.7.2",
		"redux-form": "^7.0.4",
		"redux-logger": "^3.0.6"
	},
	"devDependencies": {
		"babel-jest": "20.0.3",
		"jest": "20.0.4",
		"jest-react-native": "18.0.0",
		"prop-types": "^15.5.10",
		"react-test-renderer": "~15.4.0-rc.4"
	},
	"jest": {
		"preset": "react-native"
	}
	}

	
	
------------------------------------
Workearound for fleshing screens: 

in node_modules/react-navigation/src/views/ScenesReducer.js file

replace  in line 154 

staleScenes.forEach(mergeScene);
 
with 

- let k = null;
- let v = null;
- staleScenes.forEach(scene => {
-  let {key} = scene;
-  k = key;
-  v = scene;
- });
 
- newStaleScenes = k && v ? new Map([[k, v]]) : new Map();  
- newStaleScenes.forEach(mergeScene);
   
------------------------------------


For more informations about configurations sgo Wiki: https://bitbucket.org/mediacabin/higher-app/wiki/Home


