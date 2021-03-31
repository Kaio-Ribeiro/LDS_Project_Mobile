import React, {useState, useEffect} from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Dimensions, View, ScrollView, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import AsyncStorage from  '@react-native-community/async-storage';
import {Picker} from '@react-native-picker/picker'
import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

const { height } = Dimensions.get('window')

export default function Update_Clients() {
    const route = useRoute()
    const client = route.params.client


    const [email, setEmail] = useState(client.email);
    const [name, setName] = useState(client.name);
    const [CPF, setCPF] = useState(client.CPF);
    const [RG, setRG] = useState(client.RG);
    const [street, setStreet] = useState(client.street);
    const [district, setDistrict] = useState(client.district);
    const [number, setNumber] = useState(client.number);
    const [uf, setUf] = useState(client.uf);
    const [city, setCity] = useState(client.city);
    const [box_number, setBox_number] = useState(client.box_number);
    const [internet_plan_id,setInternetPlanId] = useState(client.internet_plan_id)
    const [internetPlans,setInternetPlans] = useState([])

    const navigation = useNavigation() 

    useEffect(() => {
        api.get('internet-plan',{
    
        }).then(response => {
          setInternetPlans(response.data)
        })
      }, [])

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

    async function handleCreateClients() {
        const data = {name, email, RG, CPF, city, uf, district, street, number, box_number, internet_plan_id}


        try {
            const response = await api.put(`/client/${client.id}`, data, {
                headers: {
                    Authorization: client.salesman_id,
                }
            })

            alert("Dados atualizados com sucesso.")
            
            navigation.navigate('Clients_Listing')

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

                    <Text style={styles.title}>Editar Cliente</Text>
                    <Text style={styles.description}>
                        Atualize os dados de um usuário cliente.
                    </Text>

                    <View style={styles.form}>

                        <Text style={styles.formProperty}>INFO:</Text>

                        <TextInput 
                            style={styles.input}
                            placeholder="Nome"
                            onChangeText={name => setName(name)}
                            defaultValue={client.name}
                            
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="E-mail"
                            onChangeText={email => setEmail(email)}
                            defaultValue={client.email}
                        />
                                                
                        <TextInput 
                            style={styles.input}
                            placeholder="CPF"
                            keyboardType="numeric"
                            onChangeText={CPF => setCPF(CPF)}
                            defaultValue={client.CPF}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="RG"
                            keyboardType="numeric"
                            onChangeText={RG => setRG(RG)}
                            defaultValue={client.RG}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="N° da Caixa"
                            keyboardType="numeric"
                            onChangeText={box_number => setBox_number(box_number)}
                            defaultValue={String(client.box_number)}
                        />

                        <View style={styles.inputPicker}>
                            <Picker
                                onValueChange={internet_plan_id => setInternetPlanId(internet_plan_id)}
                                defaultValue={internet_plan_id}
                                style={styles.picker}
                            >
                                <Picker.Item label="Escolha um plano" value="none" />
                                {internetPlans.map(internetPlan => (
                                    <Picker.Item key={internetPlan.id} label={internetPlan.speed} value={internetPlan.id} />
                                ))}
                            </Picker> 
                        </View>

                        <Text style={styles.formProperty}>LOCALIZAÇÃO:</Text>

                        <TextInput 
                            style={styles.input}
                            placeholder="Rua"
                            onChangeText={street => setStreet(street)}
                            defaultValue={client.street}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="N° da casa"
                            keyboardType="numeric"
                            onChangeText={number => setNumber(number)}
                            defaultValue={String(client.number)}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="Bairro"
                            onChangeText={district => setDistrict(district)}
                            defaultValue={client.district}
                        />

                        <View style={styles.inputGroup}>
                            <TextInput 
                                style={styles.inputCity}
                                placeholder="Cidade"
                                onChangeText={city => setCity(city)}
                                defaultValue={client.city}
                            />

                            <TextInput 
                                style={styles.inputUF}
                                placeholder="UF"
                                onChangeText={uf => setUf(uf)}
                                defaultValue={client.uf}
                            />
                            
                        </View>

                    </View>

                    <TouchableOpacity 
                        style={styles.action}
                        onPress={handleCreateClients}
                    >
                        <Text style={styles.actionText}>Atualizar</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}