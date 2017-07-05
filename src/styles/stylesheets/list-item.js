import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    container: {
       width: "100%"
    },

    wrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 18, 
    },

    title: {
        fontSize: 18, 
        color: colors.brown
    },

    label: {
        color: colors.grey2, 
        marginTop: 5,
    },

    iconStyle: {
        width: 20, 
        height: 20, 
        resizeMode: 'contain', 
        opacity: 0.2
    },
})