import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    container: {
        width: "80%",
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: 'center',       
    },

    header :{
        fontSize: 16,
        textAlign: "center",
        marginBottom: 15,
      //  fontFamily: "Arial"
    },

    text: {
        fontSize: 12,
        textAlign: "center",
       // fontFamily: "Arial"  
    }
})