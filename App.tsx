// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackNavigator from './src/navigation/StackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWelcomeSeen = async () => {
      const seen = await AsyncStorage.getItem('hasSeenWelcome');
      setShowWelcome(seen !== 'true'); 
    };
    checkWelcomeSeen();
  }, []);

  if (showWelcome === null) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showWelcome ? (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        ) : (
          <Stack.Screen name="MainApp" component={StackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
