import {Platform, Dimensions} from 'react-native'
import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

  default: StyleSheet.extend({
    style: {
      flex: 1,
      backgroundColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center'
    },

    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },

    iconStyle: {

    },

    textStyle: {
      letterSpacing: 1,
      fontWeight: 'bold',
      fontSize: 13,
      lineHeight: 13,
      color: colors.white,
      margin: 0,
      padding: 0
    },

    activeTextStyle: {

    },

    activeOpacity: 1.0,
    underlayColor: colors.highlightBlack,
    textTransform: s => s.toUpperCase()
  }),

  rounded: StyleSheet.extend({
    underlayColor: colors.highlightBlack,

    style: {
      borderRadius: 22,
      flex: 0
    },

    containerStyle: {
      height: 44
    }
  }),

})