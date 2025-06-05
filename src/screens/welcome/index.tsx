// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 Monitor Ambiental</Text>
      <Text style={styles.subtitle}>
        Monitore riscos de deslizamento com sensores inteligentes.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('InsertData')}
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}
