import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from  '@react-native-community/async-storage';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

export default function Detail_Invoice() {
    const route = useRoute()

    const navigation = useNavigation()

    function navigateBack() {
        navigation.goBack()
    }

    async function loadPlan() {
        const clientID = await AsyncStorage.getItem('userID');

        const client = await api.get('especific-client', {
            headers: {
                Authorization: clientID
            }
        })

    }

    useEffect(() => {
        loadPlan()
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.salesman}>
                <PDFReader
                    style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height}}
                    source={{
                        uri: 'https://camara.fgv.br/sites/camara.fgv.br/files/artigos/teste33_0_3.pdf',
                    }}
                    useGoogleReader={true}
                />
 
            </View>

        </View>
    )
}
