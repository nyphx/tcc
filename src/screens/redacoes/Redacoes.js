import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Header, Title, RedirectButton, CountTitle } from '../../components';
import Card from './components/Card'
import { getRedacoes } from './../../services/redacoesService';

const Redacao = () => {
  const [redacoes, setRedacoes] = useState([])

  // Função assíncrona para buscar redações do serviço
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const redacoesData = await getRedacoes();
      setRedacoes(redacoesData);
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
          Erro ao carregar as redações
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
      <CountTitle 
          count={redacoes.length}
          title="Redações"
          bgColor="rgb(191 219 254)"
          textColor="rgb(29 78 216)"
        />

        <RedirectButton screen="RedacoesForm">
          Adicionar redação
        </RedirectButton>
      </Header>

      { redacoes.length === 0 &&
        <Text style={{ fontSize: 16, marginTop: 16 }}>
          Você ainda adicionou nenhuma redação.
        </Text>
      }

      {
        redacoes.map(data => (
          <Card 
            redacao={data} 
            key={data.id}
          />
        ))
      }
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

export default Redacao;
