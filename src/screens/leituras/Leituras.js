import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getLeituras } from './../../services/leiturasService';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

import {
  Container,
  RedirectButton,
  CountTitle,
  TextPrimary
} from '../../components';

import Card from './components/Card';

const Leituras = () => {
  const [leituras, setLeituras] = useState({
    lendo: [],
    finalizado: [],
    parado: [],
    futuro: []
  });
  
  const { lendo, finalizado, parado, futuro } = leituras;

  // Função assíncrona para buscar leituras do serviço
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const leiturasData = await getLeituras();
      
      // Atualiza o estado das leituras baseado no estado atual de cada leitura
      setLeituras({
        lendo: leiturasData.filter(leitura => leitura.estado === "Lendo"),
        finalizado: leiturasData.filter(leitura => leitura.estado === "Finalizado"),
        parado: leiturasData.filter(leitura => leitura.estado === "Parado"),
        futuro: leiturasData.filter(leitura => leitura.estado === "Futuro")
      });
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

  // Função para renderizar um título e os cards de leitura correspondente
  const renderLeiturasSection = (title, leituras, bgColor, textColor, emptyMessage) => (
    <View>
      <CountTitle 
        title={title}
        count={leituras.length}
        bgColor={bgColor}
        textColor={textColor}
      />

      {leituras.length !== 0 ? 
        leituras.map(data => (
          <Card 
            leitura={data} 
            key={data.id} 
          />
        )) : 
        <View style={{ marginTop: 8 }}>
          <TextPrimary>{emptyMessage}</TextPrimary>
        </View>
      }
    </View>
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
          Erro ao carregar as leituras
        </Text>
        <Text style={{ fontSize: 18 }}>
          Por favor, tente novamente
        </Text>
      </View>
    );
  }

  return (
    <Container>
      <View style={{ marginBottom: 8 }}>
        <CountTitle 
          title="Leituras Obrigatórias"
          count={lendo.length + finalizado.length + parado.length + futuro.length}
          bgColor="rgb(191 219 254)"
          textColor="rgb(29 78 216)"
        />
        <RedirectButton screen="LeiturasForm">
          Adicionar leitura
        </RedirectButton>
      </View>

      {renderLeiturasSection("Lendo", lendo, "#B5E08A", "rgb(2 44 34)", "Não há livro sendo lido.")}
      {renderLeiturasSection("Parado", parado, "#E09A8A", "rgb(69 10 10)", "Não há livro parado.")}
      {renderLeiturasSection("Futuro", futuro, "#ccc", "rgb(8 47 73)", "Não há livro futuro.")}
      {renderLeiturasSection("Finalizado", finalizado, "#A2B5E6", "rgb(30 41 59)", "Não há livro finalizado.")}
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

export default Leituras;
