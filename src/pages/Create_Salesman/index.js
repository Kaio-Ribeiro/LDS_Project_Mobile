import React, {useState} from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, View, ScrollView, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import AsyncStorage from  '@react-native-community/async-storage';
import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

const { height } = Dimensions.get('window')

export default function Create_Salesman() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [CPF, setCPF] = useState('');
    const [RG, setRG] = useState('');
    const [street, setStreet] = useState('');
    const [district, setDistrict] = useState('');
    const [number, setNumber] = useState('');
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [sales_goal, setSales_goal] = useState('');

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

    async function handleCreateSalesman() {
        const data = {name, email, RG, CPF, sales_goal, city, uf, district, street, number}


        try {
            const adminID = await AsyncStorage.getItem('userID');

            const response = await api.post('/salesman', data, {
                headers: {
                    Authorization: adminID,
                }
            })

            const dataEmail = {password: response.data.password, email}
            await api.post('/send-email', dataEmail)

            alert("Vendedor cadastrado com sucesso.")
            
            navigation.navigate('Salesman_Listing')

        } catch (err) {
            alert("Falha no cadastro, tente novamente.")
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

                    <Text style={styles.title}>Cadastro de Vendedor</Text>
                    <Text style={styles.description}>
                        Faça o cadastro de um usuário vendedor.
                    </Text>

                    <View style={styles.form}>

                        <Text style={styles.formProperty}>INFO:</Text>

                        <TextInput 
                            style={styles.input}
                            placeholder="Nome"
                            onChangeText={name => setName(name)}
                            defaultValue={name}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="E-mail"
                            onChangeText={email => setEmail(email)}
                            defaultValue={email}
                        />
                                                
                        <TextInput 
                            style={styles.input}
                            placeholder="CPF"
                            keyboardType="numeric"
                            onChangeText={CPF => setCPF(CPF)}
                            defaultValue={CPF}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="RG"
                            keyboardType="numeric"
                            onChangeText={RG => setRG(RG)}
                            defaultValue={RG}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="Meta de Vendas"
                            keyboardType="numeric"
                            onChangeText={sales_goal => setSales_goal(sales_goal)}
                            defaultValue={sales_goal}
                        />

                        <Text style={styles.formProperty}>LOCALIZAÇÃO:</Text>

                        <TextInput 
                            style={styles.input}
                            placeholder="Rua"
                            onChangeText={street => setStreet(street)}
                            defaultValue={street}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="N° da casa"
                            keyboardType="numeric"
                            onChangeText={number => setNumber(number)}
                            defaultValue={number}
                        />

                        <TextInput 
                            style={styles.input}
                            placeholder="Bairro"
                            onChangeText={district => setDistrict(district)}
                            defaultValue={district}
                        />

                        <View style={styles.inputGroup}>
                            <TextInput 
                                style={styles.inputCity}
                                placeholder="Cidade"
                                onChangeText={city => setCity(city)}
                                defaultValue={city}
                            />

                            <TextInput 
                                style={styles.inputUF}
                                placeholder="UF"
                                onChangeText={uf => setUf(uf)}
                                defaultValue={uf}
                            />
                            
                        </View>

                    </View>

                    <TouchableOpacity 
                        style={styles.action}
                        onPress={handleCreateSalesman}
                    >
                        <Text style={styles.actionText}>Cadastrar</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}