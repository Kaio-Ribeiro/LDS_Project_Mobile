import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from  '@react-native-community/async-storage';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

export default function Detail() {
    const route = useRoute()
    const salesman = route.params.salesman

    //const [salesmanID, setSalesmanID] = useState('')

    const navigation = useNavigation()

    function navigateBack() {
        navigation.goBack()
    }

    async function navigateToUpdate(salesman) {
        navigation.navigate('Update_Salesman', {salesman})
    }

    async function handleDeleteSalesman() {
        const adminID = await AsyncStorage.getItem('adminID');

        try {
            await api.delete(`salesman/${salesman.id}`, {
                headers: {
                    Authorization: adminID,
                }
            })

            alert("Vendedor excluído com sucesso.")
            
            navigation.navigate('Salesman_Listing')

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
                <Text style={styles.salesmanValue}>{salesman.email}</Text>

                <Text style={styles.salesmanProperty}>Nome:</Text>
                <Text style={styles.salesmanValue}>{salesman.name}</Text>

                <Text style={styles.salesmanProperty}>CPF:</Text>
                <Text style={styles.salesmanValue}>{salesman.CPF}</Text>

                <Text style={styles.salesmanProperty}>RG:</Text>
                <Text style={styles.salesmanValue}>{salesman.RG}</Text>

                <Text style={styles.salesmanProperty}>Cidade e Estado:</Text>
                <Text style={styles.salesmanValue}>{salesman.city} - {salesman.uf}</Text>

                <Text style={styles.salesmanProperty}>Bairro:</Text>
                <Text style={styles.salesmanValue}>{salesman.district}</Text>

                <Text style={styles.salesmanProperty}>Endereço:</Text>
                <Text style={styles.salesmanValue}>{salesman.street}, n° {salesman.number}</Text>

                <Text style={styles.salesmanProperty}>Meta de Vendas:</Text>
                <Text style={styles.salesmanValue}>{salesman.sales_goal}</Text>

                <Text style={styles.salesmanProperty}>Quantidade de Planos Vendidos:</Text>
                <Text style={styles.salesmanValue}>{salesman.sales_amount}</Text>

            </ScrollView>

            <View style={styles.actionsBox}>
                <Text style={styles.title}>Ações disponíveis!</Text>

                <Text style={styles.description}>Atualize os dados do vendedor ou exclua seu cadastro.</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={() => navigateToUpdate(salesman)}>
                        <Text style={styles.actionText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={handleDeleteSalesman}>
                        <Text style={styles.actionText}>Excluir</Text>
                    </TouchableOpacity>
                </View>    
            </View>
        </View>
    )
}