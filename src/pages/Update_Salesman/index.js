import React, {useState} from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from  '@react-native-community/async-storage';
import { Dimensions, View, ScrollView, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, Platform } from 'react-native'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

const { height } = Dimensions.get('window')

export default function Update_Salesman() {
    const route = useRoute()
    const salesmanObject = route.params.salesman
    const salesmanID = route.params.salesman.id

    const [email, setEmail] = useState(salesmanObject.email);
    const [name, setName] = useState(salesmanObject.name);
    const [CPF, setCPF] = useState(salesmanObject.CPF);
    const [RG, setRG] = useState(salesmanObject.RG);
    const [street, setStreet] = useState(salesmanObject.street);
    const [district, setDistrict] = useState(salesmanObject.district);
    const [number, setNumber] = useState(salesmanObject.number);
    const [uf, setUf] = useState(salesmanObject.uf);
    const [city, setCity] = useState(salesmanObject.city);
    const [sales_goal, setSales_goal] = useState(salesmanObject.sales_goal);

    const navigation = useNavigation()

    function navigateBack() {
        navigation.goBack()
    }

    state = {
        screenHeight: 0
    }

    onContentSizeChange = (contentWidth, contentHeigt) => {
        this.setChange({ screenHeight: contentHeigt })
    }

    const scrollEnabled = this.state.screenHeight > height

    async function handleUpdateSalesman() {
        const data = {name, email, RG, CPF, sales_goal, city, uf, district, street, number}
        const adminID = await AsyncStorage.getItem('userID');

        try {
            await api.put(`salesman/${salesmanID}`, data, {
                headers: {
                    Authorization: adminID,
                }
            })

            alert("Dados atualizados com sucesso.")
            
            navigation.navigate('Salesman_Listing')

        } catch (err) {
            alert("Falha na atualização, tente novamente.")
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "android" ? "height" : null}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.container}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={styles.header}>
                        <Image source={logoImg}/>

                        <TouchableOpacity onPress={navigateBack}>
                            <Feather name="arrow-left" size={28} color="#E82041"/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Editar Vendedor</Text>
                    <Text style={styles.description}>
                        Atualize os dados de um usuário vendedor.
                    </Text>

                    <View style={styles.form}>

                        <Text style={styles.formProperty}>INFO:</Text>

                        <TextInput 
                            style={styles.input}
                            placeholder="Nome"
                            onChangeText={name => setName(name)}
                            defaultValue={salesmanObject.name}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="E-mail"
                            onChangeText={email => setEmail(email)}
                            defaultValue={salesmanObject.email}
                        />
                                                
                        <TextInput 
                            style={styles.input}
                            placeholder="CPF"
                            keyboardType="numeric"
                            onChangeText={CPF => setCPF(CPF)}
                            defaultValue={salesmanObject.CPF}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="RG"
                            keyboardType="numeric"
                            onChangeText={RG => setRG(RG)}
                            defaultValue={salesmanObject.RG}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="Meta de Vendas"
                            keyboardType="numeric"
                            onChangeText={sales_goal => setSales_goal(sales_goal)}
                            defaultValue={String(salesmanObject.sales_goal)}
                        />

                        <Text style={styles.formProperty}>LOCALIZAÇÃO:</Text>

                        <TextInput 
                            style={styles.input}
                            placeholder="Rua"
                            onChangeText={street => setStreet(street)}
                            defaultValue={salesmanObject.street}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="N° da casa"
                            keyboardType="numeric"
                            onChangeText={number => setNumber(number)}
                            defaultValue={String(salesmanObject.number)}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="Bairro"
                            onChangeText={district => setDistrict(district)}
                            defaultValue={salesmanObject.district}
                        />

                        <View style={styles.inputGroup}>
                            <TextInput 
                                style={styles.inputCity}
                                placeholder="Cidade"
                                onChangeText={city => setCity(city)}
                                defaultValue={salesmanObject.city}
                            />

                            <TextInput 
                                style={styles.inputUF}
                                placeholder="UF"
                                onChangeText={uf => setUf(uf)}
                                defaultValue={salesmanObject.uf}
                            />
                            
                        </View>

                    </View>

                    <TouchableOpacity 
                        style={styles.action}
                        onPress={handleUpdateSalesman}
                    >
                        <Text style={styles.actionText}>Atualizar</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}