import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Home_Admin() {
    const navigation = useNavigation()

    function navigateToSalesmanListing() {    
      navigation.navigate('Salesman_Listing')
    }

    function navigateToClientsListing() {    
      navigation.navigate('Clients_Listing')
    }

    function navigateBack() {
      navigation.goBack()
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>

        <TouchableOpacity onPress={navigateBack}>
            <Feather name="arrow-left" size={28} color="#E82041"/>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Bem-Vindo!</Text>
      <Text style={styles.description}>Clique em um dos botões abaixo e veja uma lista dos usuários correspondentes.</Text>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.action}
          onPress={navigateToSalesmanListing}
        >
          <Text style={styles.actionText}>Vendedores</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.action}
          onPress={navigateToClientsListing}
        >
          <Text style={styles.actionText}>Clientes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}