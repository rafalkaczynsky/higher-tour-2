import {Platform, Animated, Easing} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    container: {
        flex: 1, 
        alignItems: 'center', 
        width: '100%'
    },

    textBox: {
        marginTop: 30, 
        marginBottom: 20
    },

    socialButton: {
        margin: 5, 
        width: '60%'
    },

    textInput: {
        height: 40, 
        borderColor: colors.grey2, 
        backgroundColor: colors.white, 
        borderWidth: 1, 
        marginBottom: 10, 
        fontSize: 12, 
        paddingLeft: 10
    },

    error: {
        fontSize: 10,
        color: 'red',
        marginBottom: 5,
    },

    emptyScreen: {        
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
})

