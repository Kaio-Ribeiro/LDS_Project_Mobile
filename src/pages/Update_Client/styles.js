import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontSize: 30,
        marginBottom: 10,
        marginTop: 25,
        color: '#13131a',
        fontWeight: 'bold',
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
    },

    form: {
        marginBottom: 16,
        marginTop: 20,
        borderRadius: 8,
    },

    formProperty: {
        marginTop: 8,
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
    },

    input: {
        height: 40,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dcdce6',
        borderRadius: 8,
        marginTop: 8,
        padding: 8,
    },

    inputGroup: {
        flexDirection: 'row',
    },

    inputCity: {
        width: '78%',
        height: 40,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dcdce6',
        borderRadius: 8,
        marginTop: 8,
        padding: 8,
    },

    inputUF: {
        width: '18%',
        height: 40,
        marginLeft: 8,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dcdce6',
        borderRadius: 8,
        marginTop: 8,
        padding: 8,
    },

    action: {
        marginBottom: 16,
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
    },

    inputPicker: {
        height: 40,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dcdce6',
        borderRadius: 8,
        marginTop: 8,
        padding: 8,
        justifyContent: 'center',
    },

    picker: {
        height: 20,
    },

})