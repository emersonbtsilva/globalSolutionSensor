import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

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

  const salvarDados = async () => {
    if (!chuva || !umidade || !inclinacao || !tipoSolo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const novoDado = {
        id: Date.now().toString(),
        chuva,
        umidade,
        inclinacao,
        tipoSolo,
        data: new Date().toLocaleString(),
      };

      const dadosRaw = await AsyncStorage.getItem('historicoDadosAmbientais');
      const dados = dadosRaw ? JSON.parse(dadosRaw) : [];
      const novosDados = [novoDado, ...dados];

      await AsyncStorage.setItem('historicoDadosAmbientais', JSON.stringify(novosDados));

      Alert.alert('Sucesso', 'Dados inseridos com sucesso!');

      navigation.navigate('ViewRisks');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados.');
      console.error(error);
    }
  };

  const limparHistorico = async () => {
    try {
      await AsyncStorage.removeItem('historicoDadosAmbientais');
      Alert.alert('Sucesso', 'Histórico apagado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao apagar o histórico.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chuva (mm)</Text>
      <TextInput
        style={styles.input}
        value={chuva}
        onChangeText={setChuva}
        placeholder="Chuva"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Umidade (%)</Text>
      <TextInput
        style={styles.input}
        value={umidade}
        onChangeText={setUmidade}
        placeholder="Umidade"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Inclinação (°)</Text>
      <TextInput
        style={styles.input}
        value={inclinacao}
        onChangeText={setInclinacao}
        placeholder="Inclinação"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tipo de Solo</Text>
      <TextInput
        style={styles.input}
        value={tipoSolo}
        onChangeText={setTipoSolo}
        placeholder="Tipo de Solo"
      />

      <Button title="Salvar Dados" onPress={salvarDados} />
      <View style={{ marginTop: 20 }}>
        <Button
          title="Limpar Histórico"
          onPress={() =>
            Alert.alert(
              'Confirmar',
              'Tem certeza que deseja apagar todo o histórico?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sim', onPress: limparHistorico },
              ],
            )
          }
          color="red"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { marginTop: 10, marginBottom: 4, fontWeight: 'bold' },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
});
