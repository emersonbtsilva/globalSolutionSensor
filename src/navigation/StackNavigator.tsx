// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/welcome/index';
import InsertDataScreen from '../screens/inputdata/index';
import ViewRisksScreen from '../screens/risks/index';
import HistoryScreen from '../screens/historyscreen/index';
import MitigationScreen from '../screens/mitigation/index';



export type RootStackParamList = {
  Welcome: undefined;
  InsertData: undefined;
  ViewRisks: undefined;
  History: undefined;
  Mitigation: undefined;
  Menu: undefined; 
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
