import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const opcoes: { label: string; screen: keyof RootStackParamList }[] = [
  { label: 'Visualizar Riscos', screen: 'ViewRisks' },
  { label: 'Inserir Dados', screen: 'InsertData' },
  { label: 'Histórico', screen: 'History' },
  { label: 'Mitigação', screen: 'Mitigation' },
];

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 Monitor Ambiental</Text>
      <Text style={styles.subtitle}>
        Monitore riscos de deslizamento com sensores inteligentes.
      </Text>

      {opcoes.map((opcao, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(opcao.screen)}
        >
          <Text style={styles.buttonText}>{opcao.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
