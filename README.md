# higher-app
Higher Tour App

This is app for....

How to run it locally from command line

- git clone https://rafalkaczynsky@bitbucket.org/mediacabin/higher-app.git
- cd higher-app
- yarn install
- yarn add react-native-fbsdk@0.6.0
- react-native link

From your editor

Go to in : /Users/rafal/higher-app/node_modules/react-native-fbsdk/android/src/main/java/com/facebook/reactnative/androidsdk/FBSDKPackage.java:61:

remove:
    @Override  // <-- remove just @Override 
	  public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }
	
again from command line

- react-native upgrade
- react-native run-android (a this moment you can build just on real device) or react-native run-ios


Run on Real Device Android

- DEV SETTINGS -> DEV. SERVER and type XX.XX.XX.XX:8081 ( where XX.XX.XX.XX is your iPv4, 80881 is port)


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


