// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import InsertDataScreen from '../screens/InsertDataScreen';
import ViewRisksScreen from '../screens/ViewRisksScreen';
import HistoryScreen from '../screens/HistoryScreen';
import MitigationScreen from '../screens/MitigationScreen';




export type RootStackParamList = {
  Welcome: undefined;
  InsertData: undefined;
  ViewRisks: undefined;
  History: undefined;
  Mitigation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="InsertData" component={InsertDataScreen} options={{ title: 'Dados Ambientais' }} />
      <Stack.Screen name="ViewRisks" component={ViewRisksScreen} options={{ title: 'Visualizar Riscos' }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
      <Stack.Screen name="Mitigation" component={MitigationScreen} options={{ title: 'Ações de Mitigação' }} />
    </Stack.Navigator>
  );
}
