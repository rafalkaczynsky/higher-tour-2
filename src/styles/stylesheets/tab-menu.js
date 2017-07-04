import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    container: {
        flex:1, 
        width: '100%', 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        backgroundColor: "black"
    },

})