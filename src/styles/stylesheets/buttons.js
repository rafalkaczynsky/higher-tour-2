import {Platform, Dimensions} from 'react-native'
import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

  default: StyleSheet.extend({
    style: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    containerStyle: {

    },

    iconStyle: {

    },

    textStyle: {

    },

    activeTextStyle: {

    },

    activeOpacity: 1.0,
    textTransform: s => s.toUpperCase()
  }),

  rounded: StyleSheet.extend({

    style: {

    },

    containerStyle: {

    }
  }),

})