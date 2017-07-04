import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    container: {
        flex: 1, 
        alignItems: 'center', 
        paddingBottom: 5
    },

    iconStyle: {
        width: 25, 
        height: 25, 
        margin: 10, 
        marginBottom: 5
    },

    text: {
        textAlign: "center",
        color: colors.white,
    },
})