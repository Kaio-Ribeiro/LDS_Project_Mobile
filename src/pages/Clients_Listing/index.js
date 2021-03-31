import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

export default function Clients_Listing() {
  const [clients, setClients] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  function navigateToDetail(client) {
    navigation.navigate('Detail_Clients', { client })
  }

  async function loadClients() {
    if(loading) {
      return
    }

    if(total > 0 && clients.length == total) {
      return
    } 

    setLoading(true)

    const response = await api.get('/client', {
      params: { page }
    })

    setClients([...clients, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadClients()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{total} clientes</Text>
        </Text>
      </View>

      <Text style={styles.title}>Lista de clientes!</Text>
      <Text style={styles.description}>Veja todos os clientes cadastrados.</Text>


      <FlatList
        data={clients}
        style={styles.clientList}
        keyExtractor={client => String(client.id)}
        onEndReached={loadClients}
        onEndReachedThreshold={0.2}
        renderItem={({ item: client }) => (
          <View style={styles.client}>
            <Text style={styles.clientProperty}>E-mail:</Text>
            <Text style={styles.clientValue}>{client.email}</Text>

            <Text style={styles.clientProperty}>Nome:</Text>
            <Text style={styles.clientValue}>{client.name}</Text>

            <Text style={styles.clientProperty}>N° da Caixa:</Text>
            <Text style={styles.clientValue}>{client.box_number}</Text>

            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigateToDetail(client)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}