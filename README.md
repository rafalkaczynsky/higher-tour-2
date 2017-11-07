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

where?
- node_modules/react-native-fbsdk/android/src/main/java/com/facebook/reactnative/androidsdk/FBSDKPackage.java:61  
- node_modules/react-native-twitter/android/src/main/java/ga/piroro/rnt/RNTPackage.java:21:
- node_modules/react-native-twitter-signin/android/src/main/java/com/goldenowl/twittersignin/TwitterSigninPackage.java:28

solution: 
remove @Override


 
2.
- Run on Device Android
react-native run-android

- Run on iOS
react-native run-ios





-----------------------------------------------------

Packages versions : 

	"dependencies": {
		"babel-preset-react-native": "2.1.0",
		"color": "^2.0.0",
		"firebase": "^4.3.0",
		"geolib": "^2.0.23",
		"react": "16.0.0-alpha.12",
		"react-native": "0.47.2",
		"react-native-fbsdk": "0.6.0",
		"react-native-firebase-auth": "^1.0.0",
		"react-native-maps": ">=0.12.4",
		"react-navigation": "^1.0.0-beta.11"
	},
	"devDependencies": {
		"babel-jest": "20.0.3",
		"jest": "20.0.4",
		"jest-react-native": "18.0.0",
		"prop-types": "^15.5.10",
		"react-test-renderer": "~15.4.0-rc.4"
	},
	
	
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


