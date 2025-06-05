import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

interface DadoAmbiental {
  id: string;
  chuva: string;
  umidade: string;
  inclinacao: string;
  tipoSolo: string;
  data: string;
}

export default function HistoricScreen() {
  const [historico, setHistorico] = useState<DadoAmbiental[]>([]);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const dadosRaw = await AsyncStorage.getItem('historicoDadosAmbientais');
      const dados = dadosRaw ? JSON.parse(dadosRaw) : [];
      setHistorico(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o histórico.');
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: DadoAmbiental }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Data: {item.data}</Text>
      <Text style={styles.cardText}>Chuva: {item.chuva} mm</Text>
      <Text style={styles.cardText}>Umidade: {item.umidade} %</Text>
      <Text style={styles.cardText}>Inclinação: {item.inclinacao}°</Text>
      <Text style={styles.cardText}>Tipo de Solo: {item.tipoSolo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Monitoramento</Text>

      {historico.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum dado registrado ainda.</Text>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
