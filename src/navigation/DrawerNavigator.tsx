import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from '../screens/welcome/index';
import InsertDataScreen from '../screens/inputdata/index';
import ViewRisksScreen from '../screens/risks/index';
import HistoryScreen from '../screens/historyscreen/index';
import MitigationScreen from '../screens/mitigation/index';

export type RootDrawerParamList = {
  Welcome: undefined;
  InsertData: undefined;
  ViewRisks: undefined;
  History: undefined;
  Mitigation: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00796B',
        },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#00796B',
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Início' }} />
      <Drawer.Screen name="InsertData" component={InsertDataScreen} options={{ title: 'Inserir Dados' }} />
      <Drawer.Screen name="ViewRisks" component={ViewRisksScreen} options={{ title: 'Visualizar Riscos' }} />
      <Drawer.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
      <Drawer.Screen name="Mitigation" component={MitigationScreen} options={{ title: 'Mitigação' }} />
    </Drawer.Navigator>
  );
}
