import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    container: {
        flex: 1, 
        width: '100%', 
        flexDirection: 'column', 
        alignItems:'center', 
        justifyContent: 'flex-start'
    },

    buttonGroup: {
        width: '100%', 
        flexDirection: 'column', 
        alignItems:'center', 
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10,
    },

    text: {
        textAlign: "center",
        color: colors.grey2,
    },
})