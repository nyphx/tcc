import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getSimulados } from './../../services/simuladosService';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'
import Card from './components/Card';

import {
  Container,
  Header,
  Title,
  RedirectButton
} from '../../components';

const Simulados = () => {
  // Estado para armazenar a lista de simulados
  const [simulados, setSimulados] = useState([]);

  // Função assíncrona para buscar simulados do serviço
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const simuladosData = await getSimulados();
      setSimulados(simuladosData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Hook para buscar dados quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { gap: 8 }]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Erro ao carregar os simulados
        </Text>
        <Text style={{ fontSize: 18 }}>
          Por favor, tente novamente
        </Text>
      </View>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Simulados</Title>
        
        <RedirectButton screen="SimuladosForm">
          Adicionar simulado
        </RedirectButton>
      </Header>

      {/* Renderiza a lista de simulados usando o componente Card */}
      {simulados.map(data => (
        <Card
          key={data.id}
          simulado={data}
        />
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default Simulados;
