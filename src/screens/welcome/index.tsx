import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { LineChart } from 'react-native-chart-kit';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { styles } from './styles';
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig?.extra?.openWeatherApiKey;

type Props = DrawerScreenProps<RootStackParamList, 'Welcome'>;
const screenWidth = Dimensions.get('window').width;

const opcoes: { label: string; screen: keyof RootStackParamList }[] = [
  { label: 'Visualizar Riscos', screen: 'ViewRisks' },
  { label: 'Inserir Dados', screen: 'InsertData' },
  { label: 'Histórico', screen: 'History' },
  { label: 'Mitigação', screen: 'Mitigation' },
];

export default function WelcomeScreen({ navigation }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [dadosRecentes, setDadosRecentes] = useState<any[]>([]);

  useEffect(() => {
    buscarClima();
    carregarDados();
  }, []);

  const buscarClima = async () => {
    try {
      const cidade = 'São Paulo';
      const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    );
      setWeather(response.data);
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
    } finally {
      setLoadingWeather(false);
    }
  };

  const carregarDados = async () => {
    try {
      const raw = await AsyncStorage.getItem('historicoDadosAmbientais');
      const dados = raw ? JSON.parse(raw) : [];
      setDadosRecentes(dados.slice(0, 3)); // últimos 3 registros
    } catch (e) {
      console.error('Erro ao carregar dados recentes:', e);
    }
  };

  useFocusEffect(
  useCallback(() => {
      buscarClima();
      carregarDados();
    }, [])
  );

  const handleNavigate = (screen: keyof RootStackParamList) => {
    setMenuVisible(false);
    navigation.navigate(screen);
  };

  const formatarHora = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEmoji = (desc: string) => {
    desc = desc.toLowerCase();
    if (desc.includes('nuvem')) return '☁️';
    if (desc.includes('chuva')) return '🌧️';
    if (desc.includes('sol')) return '☀️';
    if (desc.includes('neve')) return '❄️';
    if (desc.includes('trovoada')) return '⛈️';
    return '🌈';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🌿 Monitor Ambiental</Text>
      </View>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>
        Monitore riscos de deslizamento com sensores inteligentes.
      </Text>

      {/* Clima Atual */}
      <View style={styles.weatherBox}>
        {weather && (
          <Text style={styles.weatherTitle}>
            {getEmoji(weather.weather[0].description)} Clima Atual
          </Text>
        )}
        {loadingWeather ? (
          <ActivityIndicator size="small" />
        ) : weather ? (
          <View>
            <Text style={styles.weatherInfo}>
              📍 {weather.name} - {weather.weather[0].description}
            </Text>
            <Text style={styles.weatherInfo}>
              🌡 Temp.: {weather.main.temp}°C | 🤒 Sensação: {weather.main.feels_like}°C
            </Text>
            <Text style={styles.weatherInfo}>
              💧 Umidade: {weather.main.humidity}% | 🧭 Vento: {weather.wind.speed} m/s
            </Text>
            <Text style={styles.weatherInfo}>
              🧱 Pressão: {weather.main.pressure} hPa
            </Text>
            <Text style={styles.weatherInfo}>
              🌅 Nascer do sol: {formatarHora(weather.sys.sunrise)}
            </Text>
            <Text style={styles.weatherInfo}>
              🌇 Pôr do sol: {formatarHora(weather.sys.sunset)}
            </Text>
          </View>
        ) : (
          <Text style={styles.weatherInfo}>Erro ao carregar clima.</Text>
        )}
      </View>

      {/* Últimos Registros */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>📋 Últimos Registros</Text>
        {dadosRecentes.map((dado, i) => (
          <View key={i} style={styles.recordItem}>
            <Text>📅 {dado.data}</Text>
            <Text>🌧 Chuva: {dado.chuva} mm</Text>
            <Text>💧 Umidade: {dado.umidade}%</Text>
            <Text>⛰ Inclinação: {dado.inclinacao}°</Text>
            <Text>🧱 Solo: {dado.tipoSolo}</Text>
          </View>
        ))}
      </View>

      {/* Gráfico */}
      {dadosRecentes.length > 0 && (
        <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
          <Text style={styles.sectionTitle}>📊 Gráfico de Umidade</Text>
          <LineChart
            data={{
              labels: dadosRecentes.map((d) => d.data.split(',')[0]),
              datasets: [
                {
                  data: dadosRecentes.map((d) => parseFloat(d.umidade)),
                },
              ],
            }}
            width={screenWidth * 0.8}
            height={150}
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: '#f0f0f0',
              backgroundGradientFrom: '#e0f7fa',
              backgroundGradientTo: '#b2ebf2',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 150, 136, ${opacity})`,
              labelColor: () => '#333',
              style: { borderRadius: 16 },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#00796B',
              },
            }}
            style={{
              marginVertical: 10,
              borderRadius: 12,
            }}
          />
        </View>
      )}

      {/* Modal do Menu */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.menu}>
            {opcoes.map((opcao, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleNavigate(opcao.screen)}
              >
                <Text style={styles.menuText}>{opcao.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}
