import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    container: {
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: colors.white1, 
        height: 70,
        width: '100%', 
        borderBottomColor: colors.grey1, 
        borderBottomWidth: 0.5
    },

    text: {
        fontSize: 18,
    },
    //onBack
    onBackContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent:'center',
        flex: 1, width: '100%'
    },

    onBackIconButton: {
        position: 'absolute',
        left: 10, 
        top: 15, 
        bottom: 0
    },

    onBackIconStyle: {
        width: 20, 
        height: 20, 
        resizeMode: 'contain'
    },

    //onBack and onNext
    fullHeaderContainer : {
        flexDirection: 'row', 
        alignItems: 'center', 
        flex: 1, 
        justifyContent: 'space-between' 
    },

    fullHeaderIconButton: {
        flex: 0.1, 
        alignItems: 'center',
    },
})