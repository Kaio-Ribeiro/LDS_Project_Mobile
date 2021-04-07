import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from  '@react-native-community/async-storage';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

export default function Detail_Clients() {
    const route = useRoute()
    const client = route.params.client

    //const [salesmanID, setSalesmanID] = useState('')

    const navigation = useNavigation()

    function navigateBack() {
        navigation.goBack()
    }

    async function navigateToUpdate(client) {
        navigation.navigate('Update_Client', {client})
    }

    async function handleDeleteClient() {
        const salesmanID = await AsyncStorage.getItem('userID');

        try {
            await api.delete(`client/${client.id}`, {
                headers: {
                    Authorization: salesmannID,
                }
            })

            alert("Cliente excluído com sucesso.")
            
            navigation.navigate('Clients_Listing')

        } catch (err) {
            alert(err)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.salesman}>
                <Text style={[styles.salesmanProperty, { marginTop: 0 }]}>E-mail:</Text>
                <Text style={styles.salesmanValue}>{client.email}</Text>

                <Text style={styles.salesmanProperty}>Nome:</Text>
                <Text style={styles.salesmanValue}>{client.name}</Text>

                <Text style={styles.salesmanProperty}>CPF:</Text>
                <Text style={styles.salesmanValue}>{client.CPF}</Text>

                <Text style={styles.salesmanProperty}>RG:</Text>
                <Text style={styles.salesmanValue}>{client.RG}</Text>

                <Text style={styles.salesmanProperty}>Cidade e Estado:</Text>
                <Text style={styles.salesmanValue}>{client.city} - {client.uf}</Text>

                <Text style={styles.salesmanProperty}>Bairro:</Text>
                <Text style={styles.salesmanValue}>{client.district}</Text>

                <Text style={styles.salesmanProperty}>Endereço:</Text>
                <Text style={styles.salesmanValue}>{client.street}, n° {client.number}</Text>

                <Text style={styles.salesmanProperty}>Número da Caixa:</Text>
                <Text style={styles.salesmanValue}>{client.box_number}</Text>


            </ScrollView>

            <View style={styles.actionsBox}>
                <Text style={styles.title}>Ações disponíveis!</Text>

                <Text style={styles.description}>Atualize os dados do cliente ou exclua seu cadastro.</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={() => navigateToUpdate(client)}>
                        <Text style={styles.actionText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={handleDeleteClient}>
                        <Text style={styles.actionText}>Excluir</Text>
                    </TouchableOpacity>
                </View>    
            </View>
        </View>
    )
}