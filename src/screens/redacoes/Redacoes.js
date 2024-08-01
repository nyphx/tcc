import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native';
import { Container, Header, Title, RedirectButton } from '../../components';
import Card from './components/Card'
import { getRedacoes } from './../../services/redacoesService';

const Redacao = ({ navigation }) => {
  console.log("reload")
 
  const [redacoes, setRedacoes] = useState([])

  // Função assíncrona para buscar redações do serviço
  const fetchData = useCallback(async () => {
    try {
      const redacoesData = await getRedacoes();
      setRedacoes(redacoesData);
    } catch (error) {
      // Log do erro para depuração
      console.error('Error fetching redacoes: ', error);
    }
  }, []);

  // Hook para buscar dados quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  return (
    <Container>
      <Header>
        <Title>Redações</Title>

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
            onPress={{ navigation }} 
          />
        ))
      }
    </Container>
  );
};

export default Redacao;
