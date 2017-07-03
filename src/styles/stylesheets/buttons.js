import {Platform, Dimensions} from 'react-native'
import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

  default: StyleSheet.extend({
// No Icons Modes
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.yellow,
      height: 50,
      width: '100%'
    },

    iconContainer: {
      borderWidth: 1,
      borderColor: "red"
    },

    text: {
      fontSize: 14,
      color: colors.black,
    },

    textTransform: s => s.toUpperCase()
  }),

  rounded: StyleSheet.extend({

    style: {

    },

    container: {

    }
  }),
// Icon Modes

  facebook: StyleSheet.extend({

    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.facebook,
      height: 50,
      width: '100%'
    },

    wraper: {
      flex: 1, 
      width: '100%', 
      flexDirection: "row", 
      alignItems: 'center',
    },

    iconContainer: {
      borderRightColor: '#082e7d', 
      borderRightWidth: 0.5, 
      padding: 10
    },

    iconStyle: {
      resizeMode: "contain", 
      width: 30, 
      height: 30
    },

    textContainer: {
      flex: 1,
      alignItems: 'flex-start',
      paddingLeft: '5%',
    },
    
    text: {
      fontSize: 14,
      color: colors.white,
    },

  }),

  google: StyleSheet.extend({

    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.google,
      height: 50,
      width: '100%'
    },

    wraper: {
      flex: 1, 
      width: '100%', 
      flexDirection: "row", 
      alignItems: 'center',
    },

    iconContainer: {
      borderRightColor: '#005aef', 
      borderRightWidth: 0.5, 
      padding: 10
    },

    iconStyle: {
      resizeMode: "contain", 
      width: 30, 
      height: 30
    },

    textContainer: {
      flex: 1,
      alignItems: 'flex-start',
      paddingLeft: '5%',
    },
    
    text: {
      fontSize: 14,
      color: colors.white,
    },

  }),

  twitter: StyleSheet.extend({

    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.twitter,
      height: 50,
      width: '100%'
    },

    wraper: {
      flex: 1, 
      width: '100%', 
      flexDirection: "row", 
      alignItems: 'center',
    },

    iconContainer: {
      borderRightColor: '#1d80d2', 
      borderRightWidth: 0.5, 
      padding: 10
    },

    iconStyle: {
      resizeMode: "contain", 
      width: 30, 
      height: 30
    },

    textContainer: {
      flex: 1,
      alignItems: 'flex-start',
      paddingLeft: '5%',
    },
    
    text: {
      fontSize: 14,
      color: colors.white,
    },

  }),
  

})