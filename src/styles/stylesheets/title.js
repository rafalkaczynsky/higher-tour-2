import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    container: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',   
        height: 50,   
        width: "100%",

    },

    text: {
        fontSize: 18,
        lineHeight: 18,
        textAlign: "center",
        fontWeight: "bold",
        color: colors.brown,
    },
})
