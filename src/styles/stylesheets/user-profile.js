import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    header: {
        height: '30%',
        width: '100%',
    },

    headerImage: {
        width: '100%',
        height: '100%',
      //  resizeMode: 'cover'
    },

    contentBox: {
        width: '95%',
        flex: 0,
        margin:5,
    },
    headerText: {
        height: 120,
        width: 320,
        backgroundColor: 'rgba(0,0,0,0)',
    }
})