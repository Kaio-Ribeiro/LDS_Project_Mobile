import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from  '@react-native-community/async-storage';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

export default function Detail_Plans() {
    const route = useRoute()
    const [speed, setSpeed] = useState('')
    const [price, setPrice] = useState(0)

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

        const plan = await api.get('especific-plan', {
            headers: {
                Authorization: client.data.internet_plan_id
            }
        })

        setPrice(plan.data.price)
        setSpeed(plan.data.speed)
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
                <Text style={[styles.salesmanProperty, { marginTop: 0 }]}>Velocidade:</Text>
                <Text style={styles.salesmanValue}>{speed}</Text>

                <Text style={styles.salesmanProperty}>Preço:</Text>
                <Text style={styles.salesmanValue}>R$ {price}</Text>


            </View>

        </View>
    )
}