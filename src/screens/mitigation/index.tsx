import React, { useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { styles, getRiskColor } from './styles';

type RootStackParamList = {
  Mitigation: { risco: 'Alto' | 'Moderado' | 'Baixo' };
};

export default function MitigationScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Mitigation'>>();
  const riscoInicial = route.params?.risco ?? 'Baixo';
  const [risco, setRisco] = useState<'Alto' | 'Moderado' | 'Baixo' | null>(riscoInicial);

  const getAcoesMitigacao = () => {
    switch (risco) {
      case 'Alto':
        return [
          'Evacuar áreas de risco imediatamente.',
          'Instalar sistemas de drenagem de emergência.',
          'Comunicar autoridades locais.',
          'Evitar escavações ou movimentações no terreno.',
        ];
      case 'Moderado':
        return [
          'Monitorar constantemente o local.',
          'Evitar sobrecarga de água no solo.',
          'Instalar calhas e canaletas para desviar a água da chuva.',
          'Realizar inspeções frequentes com técnicos.',
        ];
      case 'Baixo':
        return [
          'Manter drenagem adequada.',
          'Evitar descarte de lixo ou entulho nas encostas.',
          'Fazer manutenção periódica no terreno.',
          'Promover educação ambiental com a comunidade.',
        ];
      default:
        return ['Selecione um nível de risco para ver as ações.'];
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ações de Mitigação</Text>

      <Text style={styles.riskLevel}>
        Risco Atual:{' '}
        <Text style={{ color: getRiskColor(risco), fontWeight: 'bold' }}>
          {risco}
        </Text>
      </Text>

      <View style={styles.actionsBox}>
        {getAcoesMitigacao().map((acao, index) => (
          <Text key={index} style={styles.actionItem}>
            • {acao}
          </Text>
        ))}
      </View>

      <Text style={styles.subTitle}>Simular outro risco:</Text>
      <View style={styles.buttons}>
        <Button title="Baixo" onPress={() => setRisco('Baixo')} color="green" />
        <Button title="Moderado" onPress={() => setRisco('Moderado')} color="orange" />
        <Button title="Alto" onPress={() => setRisco('Alto')} color="red" />
      </View>
    </ScrollView>
  );
}
