import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigation/StackNavigator';
import { styles } from './styles';
import { Picker } from '@react-native-picker/picker';


const tiposSolo = ['Argiloso', 'Arenoso', 'Humoso', 'Calcário', 'Siltoso'];
type InsertDataScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'InsertData'
>;

export default function InsertDataScreen() {
  const navigation = useNavigation<InsertDataScreenNavigationProp>();

  const [chuva, setChuva] = useState('');
  const [umidade, setUmidade] = useState('');
  const [inclinacao, setInclinacao] = useState('');
  const [tipoSolo, setTipoSolo] = useState('');

  const [erroChuva, setErroChuva] = useState(false);
  const [erroUmidade, setErroUmidade] = useState(false);
  const [erroInclinacao, setErroInclinacao] = useState(false);
  const [erroTipoSolo, setErroTipoSolo] = useState(false);
  

  const validarCampos = (): boolean => {
    const chuvaValida = !isNaN(Number(chuva)) && Number(chuva) >= 0;
    const umidadeValida = !isNaN(Number(umidade)) && Number(umidade) >= 0;
    const inclinacaoValida = !isNaN(Number(inclinacao)) && Number(inclinacao) >= 0;
    const tipoSoloValido = /^[a-zA-ZçÇáéíóúâêôãõ\s]+$/.test(tipoSolo.trim());

    setErroChuva(!chuvaValida);
    setErroUmidade(!umidadeValida);
    setErroInclinacao(!inclinacaoValida);
    setErroTipoSolo(!tipoSoloValido);

    return chuvaValida && umidadeValida && inclinacaoValida && tipoSoloValido;
  };

  const salvarDados = async () => {
    if (!validarCampos()) {
      Alert.alert('Erro', 'Preencha corretamente todos os campos.');
      return;
    }

    try {
      const novoDado = {
        id: Date.now().toString(),
        chuva: parseFloat(chuva).toFixed(1),
        umidade: parseFloat(umidade).toFixed(1),
        inclinacao: parseFloat(inclinacao).toFixed(1),
        tipoSolo: tipoSolo.trim(),
        data: new Date().toLocaleString(),
      };

      const dadosRaw = await AsyncStorage.getItem('historicoDadosAmbientais');
      const dados = dadosRaw ? JSON.parse(dadosRaw) : [];
      const novosDados = [novoDado, ...dados];

      await AsyncStorage.setItem('historicoDadosAmbientais', JSON.stringify(novosDados));

      Alert.alert('Sucesso', 'Dados inseridos com sucesso!');
      setChuva('');
      setUmidade('');
      setInclinacao('');
      setTipoSolo('');
      navigation.navigate('ViewRisks');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar dados');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inserir Dados Ambientais</Text>

      {/* CHUVA */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Chuva (mm)</Text>
        <TextInput
          style={styles.input}
          value={chuva}
          onChangeText={(text) => {
            setChuva(text);
            setErroChuva(false);
          }}
          placeholder="Ex: 75.5"
          keyboardType="numeric"
        />
        {erroChuva && <Text style={styles.errorText}>Valor inválido</Text>}
      </View>

      {/* UMIDADE */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Umidade do Solo (%)</Text>
        <TextInput
          style={styles.input}
          value={umidade}
          onChangeText={(text) => {
            setUmidade(text);
            setErroUmidade(false);
          }}
          placeholder="Ex: 68.2"
          keyboardType="numeric"
        />
        {erroUmidade && <Text style={styles.errorText}>Valor inválido</Text>}
      </View>

      {/* INCLINAÇÃO */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Inclinação do Terreno (°)</Text>
        <TextInput
          style={styles.input}
          value={inclinacao}
          onChangeText={(text) => {
            setInclinacao(text);
            setErroInclinacao(false);
          }}
          placeholder="Ex: 15.0"
          keyboardType="numeric"
        />
        {erroInclinacao && <Text style={styles.errorText}>Valor inválido</Text>}
      </View>

      {/* TIPO DE SOLO */}
        <View style={[styles.formGroup, { minHeight: 70 }]}>
          <Text style={styles.label}>Tipo de Solo</Text>
          <Picker
            selectedValue={tipoSolo}
            onValueChange={(itemValue) => {
              setTipoSolo(itemValue);
              setErroTipoSolo(false);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Selecione o tipo de solo..." value="" />
            {tiposSolo.map((tipo, index) => (
              <Picker.Item key={index} label={tipo} value={tipo} />
            ))}
          </Picker>
          {erroTipoSolo && (
            <Text style={styles.errorText}>Selecione um tipo de solo válido</Text>
          )}
        </View>
      {/* BOTÃO */}
      <TouchableOpacity style={styles.button} onPress={salvarDados}>
        <Text style={styles.buttonText}>Salvar Dados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
