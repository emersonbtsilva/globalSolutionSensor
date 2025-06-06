// src/navigation/StackNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
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


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Welcome">
      <Drawer.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Início' }} />
      <Drawer.Screen name="InsertData" component={InsertDataScreen} options={{ title: 'Inserir Dados' }} />
      <Drawer.Screen name="ViewRisks" component={ViewRisksScreen} options={{ title: 'Visualizar Riscos' }} />
      <Drawer.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
      <Drawer.Screen name="Mitigation" component={MitigationScreen} options={{ title: 'Mitigação' }} />
    </Drawer.Navigator>
  );
}


