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

  disable: StyleSheet.extend({
    // No Icons Modes
        container: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'lightgrey',
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

  transparent: StyleSheet.extend({
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

  settings: StyleSheet.extend({
// No Icons Modes
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.grey2,
      height: 60,
      width: '95%'
    },

    iconContainer: {
      borderWidth: 1,
      borderColor: "red"
    },

    text: {
      fontSize: 18,
      color: colors.brown,
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
      height: 40,
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
      marginLeft: 5,
      marginRight: 5,
      width: 10, 
      height: 20
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
      height: 40,
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
      width: 20, 
      height: 20
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
      height: 40,
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
      width: 20, 
      height: 20
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