import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from  '@react-native-community/async-storage';
import { CheckBox, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

export default function Detail_Plans() {
    const [isSelected, setSelection] = useState(false);
    const navigation = useNavigation()

    function navigateBack() {
        navigation.goBack()
    }

    function navigateHomeSalesman() {
        navigation.navigate('Home_Salesman')
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
                <Text style={[styles.salesmanProperty, { marginTop: 0 }]}>IDENTIFICAÇÃO DAS PARTES CONTRATANTES</Text>
                <Text style={styles.salesmanValue}>
                    CONTRATANTE: (Nome do Contratante), (Nacionalidade), (Estado Civil), (Profissão), Carteira de Identidade nº (xxx), C.P.F. nº (xxx), residente e domiciliado na Rua (xxx), nº (xxx), bairro (xxx), Cep (xxx), Cidade (xxx), no Estado (xxx).
                </Text>

                <Text style={styles.salesmanProperty}></Text>
                <Text style={styles.salesmanValue}>
                    CONTRATADA: (Nome da Contratada), com sede em (xxx), na Rua (xxx), nº (xxx), bairro (xxx), Cep (xxx), no Estado (xxx), inscrita no C.N.P.J. sob o nº (xxx), e no Cadastro Estadual sob o nº (xxx), neste ato representada pelo seu diretor (xxx), (Nacionalidade), (Estado Civil), (Profissão), Carteira de Identidade nº (xxx), C.P.F. nº (xxx), residente e domiciliado na Rua (xxx), nº (xxx), bairro (xxx), Cep (xxx), Cidade (xxx), no Estado (xxx).
                </Text>

                <Text style={styles.salesmanValue}>As partes acima identificadas têm, entre si, justo e acertado o presente Contrato de Prestação de Serviços de Conexão à Rede Internet, que se regerá pelas cláusulas seguintes e pelas condições descritas no presente.</Text>

                <Text style={styles.salesmanProperty}>DO OBJETO DO CONTRATO</Text>
                <Text style={[styles.salesmanValue, { marginBottom: 24 }]}>Cláusula 1ª. O objeto do presente contrato é a prestação de serviços de acesso à rede de computadores, através de protocolo TCP/IP, via fax modem por ligação telefônica, ou cabo, incluindo aqui o acesso aos mais variados bancos de dados, com possibilidade de envio, cópia e gravação de arquivos de distintas naturezas.</Text>
            </ScrollView>

            <View style={styles.actionsBox}>
                <View style={styles.checkbox}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                    />
                    <Text style={styles.description}>Li e aceito os termos.</Text>
                </View>                

                <View style={styles.actions}>

                    <TouchableOpacity style={styles.action} onPress={navigateHomeSalesman}>
                        <Text style={styles.actionText}>Finalizar</Text>
                    </TouchableOpacity>
                </View>    
            </View>

        </View>
    )
}