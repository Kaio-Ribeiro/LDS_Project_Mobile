import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

export default function Salesman_Listing() {
  const [salesman, setSalesman] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  function navigateToDetail(salesman) {
    navigation.navigate('Detail', { salesman })
  }

  function navigateToCreateSalesman() {
    navigation.navigate('Create_Salesman')
  }

  async function loadSalesman() {
    if(loading) {
      return
    }

    if(total > 0 && salesman.length == total) {
      return
    } 

    setLoading(true)

    const response = await api.get('/salesman', {
      params: { page }
    })

    setSalesman([...salesman, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadSalesman()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{total} vendedores</Text>
        </Text>
      </View>

      <Text style={styles.title}>Lista de vendedores!</Text>
      <Text style={styles.description}>Veja todos os vendedores cadastrados.</Text>

      <View style={styles.rightButton}>
        <View></View>
        <TouchableOpacity 
          style={styles.newSalesman}
          onPress={navigateToCreateSalesman}
        >
          <Text style={styles.actionText}>Criar Novo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={salesman}
        style={styles.salesmanList}
        keyExtractor={salesman => String(salesman.id)}
        onEndReached={loadSalesman}
        onEndReachedThreshold={0.2}
        renderItem={({ item: salesman }) => (
          <View style={styles.salesman}>
            <Text style={styles.salesmanProperty}>E-mail:</Text>
            <Text style={styles.salesmanValue}>{salesman.email}</Text>

            <Text style={styles.salesmanProperty}>Nome:</Text>
            <Text style={styles.salesmanValue}>{salesman.name}</Text>

            <Text style={styles.salesmanProperty}>Quantidade de Planos Vendidos:</Text>
            <Text style={styles.salesmanValue}>{salesman.sales_amount}</Text>

            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigateToDetail(salesman)}
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