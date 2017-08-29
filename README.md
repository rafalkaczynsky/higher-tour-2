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
- react-native upgrade

2.1  FOR IOS
Because of react-native upgrade you have to go to :

https://developers.facebook.com/apps/1471790922910240/fb-login/quickstart/

click iOS and follow all steps 

if you find yourself difficulty with that. Tutorial step by step for that
https://www.youtube.com/watch?v=rAXVKapP5cM



2.2 FOR Android

Because of react-native upgrade you have to go to :

https://github.com/facebook/react-native-fbsdk

go to:

Configure native projects

Android project <--- follow all this steps

if you find yourself difficulty with that. Tutorial step by step for that
https://www.youtube.com/watch?v=mEKpjN1pm2s

2.2.1
From your editor

Go to in : /Users/rafal/higher-app/node_modules/react-native-fbsdk/android/src/main/java/com/facebook/reactnative/androidsdk/FBSDKPackage.java:61:

remove:
    @Override  // <-- remove just @Override 
	  public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
	
3. Ready tu run


- Run on Real Device Android

react-native run-android
- DEV SETTINGS -> DEV. SERVER and type XX.XX.XX.XX:8081 ( where XX.XX.XX.XX is your iPv4, 80881 is port)

- Run on iOS
react-native run-ios

In case of any error just reload HigherApp



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
	
	

For more informations about configurations sgo Wiki: https://bitbucket.org/mediacabin/higher-app/wiki/Home


