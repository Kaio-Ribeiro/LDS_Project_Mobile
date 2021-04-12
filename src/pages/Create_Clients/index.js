import React, {useState, useEffect} from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, View, ScrollView, KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import AsyncStorage from  '@react-native-community/async-storage';
import {Picker} from '@react-native-picker/picker'
import logoImg from '../../assets/logo.png'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';
import api from '../../services/api'
import styles from './styles'

const { height } = Dimensions.get('window')

export default function Create_Clients() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [CPF, setCPF] = useState('');
    const [RG, setRG] = useState('');
    const [street, setStreet] = useState('');
    const [district, setDistrict] = useState('');
    const [number, setNumber] = useState('');
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const [box_number, setBox_number] = useState('');
    const [internet_plan_id,setInternetPlanId] = useState(null)
    const [internetPlans,setInternetPlans] = useState([])
    const [images, setImages] = useState([])

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

    async function handleSelectImages() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
         console.log(status) 

        if (status !== 'granted') {
            alert("Precisamos de acesso ás suas fotos...")
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        }) 

        if (result.cancelled) {
            return
        }

        const {uri} = result

        setImages([...images, uri])
    }

    async function handleCreateClients() {
        const data = new FormData()
        data.append('name', name)
        data.append('email', email)
        data.append('RG', RG)
        data.append('CPF', CPF)
        data.append('city', city)
        data.append('uf', uf)
        data.append('district', district)
        data.append('street', street)
        data.append('number', number)
        data.append('box_number', box_number)
        data.append('internet_plan_id', internet_plan_id)

        images.forEach((image, index) => {
            data.append('images', {
                name: `image_${index}.jpg`,
                type: 'image/jpg',
                uri: image,
            })

        });


        try {
            const salesmanID = await AsyncStorage.getItem('userID');

            const response = await api.post('/client', data, {
                headers: {
                    Authorization: salesmanID,
                }
            })

            const dataEmail = {password: response.data.password, email}
            await api.post('/send-email', dataEmail)

            alert("Cliente cadastrado com sucesso.")
            
            navigation.navigate('Contract_Client')

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

                    <Text style={styles.title}>Cadastro de Cliente</Text>
                    <Text style={styles.description}>
                        Faça o cadastro de um usuário cliente.
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
                            placeholder="N° da Caixa"
                            keyboardType="numeric"
                            onChangeText={box_number => setBox_number(box_number)}
                            defaultValue={box_number}
                        />

                        <View style={styles.inputPicker}>
                            <Picker
                                onValueChange={internet_plan_id => setInternetPlanId(internet_plan_id)}
                                defaultValue={internet_plan_id}
                                style={styles.picker}
                            >
                                <Picker.Item label="Escolha um plano" value={null} />
                                {internetPlans.map(internetPlan => (
                                    <Picker.Item key={internetPlan.id} label={internetPlan.speed} value={internetPlan.id} />
                                ))}
                            </Picker> 
                        </View>

                        <Text style={styles.formProperty}>FOTOS DOCUMENTOS:</Text>

                        <View style={styles.uploadedImagesContainer}>
                            {images.map(image => {
                                return (
                                    <Image
                                        key={image}
                                        source={{ uri: image }}
                                        style={styles.uploadedImage}

                                    />
                                )
                            })}
                        </View>

                        <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
                            <Feather name="plus" size={24} />
                        </TouchableOpacity>

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
                        onPress={handleCreateClients}
                    >
                        <Text style={styles.actionText}>Continuar</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    )
}