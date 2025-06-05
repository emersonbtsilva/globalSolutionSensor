import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

type DadosAmbientais = {
  id: string;
  chuva: string;
  umidade: string;
  inclinacao: string;
  tipoSolo: string;
  data: string;
};

export default function RiskScreen() {
  const [historico, setHistorico] = useState<DadosAmbientais[]>([]);
  const [avaliacao, setAvaliacao] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [msgSucesso, setMsgSucesso] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const dadosRaw = await AsyncStorage.getItem('historicoDadosAmbientais');
      const dados: DadosAmbientais[] = dadosRaw ? JSON.parse(dadosRaw) : [];
      setHistorico(dados);
      avaliarRisco(dados);
    } catch (error) {
      console.error('Erro ao carregar dados', error);
    } finally {
      setLoading(false);
    }
  };

  function avaliarRisco(dados: DadosAmbientais[]) {
    if (dados.length === 0) {
      setAvaliacao('Nenhum dado disponível para avaliação de risco.');
      return;
    }

    const ultimo = dados[0];
    const chuvaNum = parseFloat(ultimo.chuva);
    const umidadeNum = parseFloat(ultimo.umidade);
    const inclinacaoNum = parseFloat(ultimo.inclinacao);

    if (chuvaNum > 100 && umidadeNum > 80 && inclinacaoNum > 30) {
      setAvaliacao('Alto risco de deslizamento!');
    } else if (chuvaNum > 50 && umidadeNum > 60 || inclinacaoNum > 20) {
      setAvaliacao('Risco moderado de deslizamento.');
    } else {
      setAvaliacao('Risco baixo de deslizamento.');
    }
  }

  const adicionarDadoSimulado = async () => {
    const novoDado: DadosAmbientais = {
      id: String(Date.now()),
      chuva: (Math.random() * 150).toFixed(1),
      umidade: (Math.random() * 100).toFixed(1),
      inclinacao: (Math.random() * 40).toFixed(1),
      tipoSolo: 'Argiloso',
      data: new Date().toLocaleString(),
    };

    try {
      const dadosRaw = await AsyncStorage.getItem('historicoDadosAmbientais');
      const dados: DadosAmbientais[] = dadosRaw ? JSON.parse(dadosRaw) : [];

      const novosDados = [novoDado, ...dados];

      await AsyncStorage.setItem('historicoDadosAmbientais', JSON.stringify(novosDados));

      setMsgSucesso('Dados inseridos com sucesso!');
      setHistorico(novosDados);
      avaliarRisco(novosDados);
      setTimeout(() => setMsgSucesso(null), 3000);
    } catch (error) {
      console.error('Erro ao salvar dados', error);
    }
  };

  const apagarHistorico = async () => {
    try {
      await AsyncStorage.removeItem('historicoDadosAmbientais');
      setHistorico([]);
      setAvaliacao('Nenhum dado disponível para avaliação de risco.');
      setMsgSucesso('Histórico apagado com sucesso!');
      setTimeout(() => setMsgSucesso(null), 3000);
    } catch (error) {
      console.error('Erro ao apagar histórico', error);
    }
  };

  const getAvaliacaoStyle = () => {
    if (!avaliacao) return styles.avaliacao;
    if (avaliacao.includes('Alto')) return [styles.avaliacao, styles.riscoAlto];
    if (avaliacao.includes('moderado')) return [styles.avaliacao, styles.riscoModerado];
    return [styles.avaliacao, styles.riscoBaixo];
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00796b" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📊 Visualização de Riscos</Text>
      <Text style={styles.info}>
        Este sistema monitora automaticamente indicadores ambientais e avalia riscos de deslizamento.
      </Text>

      {msgSucesso && <Text style={styles.msgSucesso}>{msgSucesso}</Text>}

      <View style={getAvaliacaoStyle()}>
        <Text style={styles.avaliacaoTexto}>{avaliacao}</Text>
      </View>

      <Text style={styles.subtitle}>Últimos dados registrados:</Text>

      {historico.length === 0 ? (
        <Text>Nenhum dado registrado.</Text>
      ) : (
        historico.slice(0, 5).map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.data}</Text>
            <Text>🌧️ Chuva: {item.chuva} mm</Text>
            <Text>💧 Umidade: {item.umidade} %</Text>
            <Text>📐 Inclinação: {item.inclinacao} °</Text>
            <Text>🌱 Tipo de Solo: {item.tipoSolo}</Text>
          </View>
        ))
      )}

      <TouchableOpacity style={styles.button} onPress={adicionarDadoSimulado}>
        <Text style={styles.buttonText}>Inserir dado simulado</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonDanger]} onPress={apagarHistorico}>
        <Text style={styles.buttonText}>Apagar histórico</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
