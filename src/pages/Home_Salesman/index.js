import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Home_Salesman() {
    const navigation = useNavigation()

    function navigateToCreateClients() {    
      navigation.navigate('Create_Clients')
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
      <Text style={styles.description}>Clique no botão abaixo e faça o cadastro de um cliente.</Text>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.action}
          onPress={navigateToCreateClients}
        >
          <Text style={styles.actionText}>Cadastrar Clientes</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}