import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

  default: {
    flex: 1,
    backgroundColor: colors.backgroundWindow,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 60,

  },

})