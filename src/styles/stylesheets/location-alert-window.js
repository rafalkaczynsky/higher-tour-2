import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 50, 
        backgroundColor: 'grey'
    },

    alertWindow: {
        backgroundColor: 'white', 
        padding: 20, 
        alignItems: 'center',
    },

    button: {
        width: '50%',
        marginTop: 15,
        backgroundColor: 'lightblue',
        padding: 10,
    },

    header: {
        textAlign: 'center'
    },

    text: {
        marginTop: 10, 
        textAlign: 'center'
    }

})