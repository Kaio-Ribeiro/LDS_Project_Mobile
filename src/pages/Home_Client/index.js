import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Home_Client() {
  const navigation = useNavigation()

  function navigateBack() {
    navigation.goBack()
  }

  function navigateToDetailPlans() {    
    navigation.navigate('Detail_Plans')
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
      <Text style={styles.description}>Clique nos botões abaixo e para ter acesso aos dados e a fatura do seu plano.</Text>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.action}
          onPress={navigateToDetailPlans}
        >
          <Text style={styles.actionText}>Dados do Plano</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}