import {Platform} from 'react-native'

import {colors} from '../resources'

export default StyleSheet => StyleSheet.extend({

    container: {

    },

    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 18,
    },

    itemDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
    },

    title: {
        fontSize: 18,
        color: colors.brown,
    },

    label: {
        color: colors.grey2,
        marginTop: 5,
    },
    readingLabel: {
        color: colors.brown,
        marginTop: 5,
    },
    iconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        opacity: 0.2
    },

    progressBar: {
        height: '100%',
        backgroundColor: colors.yellow,
    },

    progressBarContainer: {
        marginTop: 10,
        width: '100%',
        height: 2,
        backgroundColor: colors.grey,
    }
})
