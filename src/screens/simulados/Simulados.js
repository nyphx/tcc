import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getSimulados } from './../../services/simuladosService';

import {
  Container,
  Header,
  Title,
  RedirectButton
} from '../../components';

import Card from './components/Card';

const Simulados = () => {
  // Estado para armazenar a lista de simulados
  const [simulados, setSimulados] = useState([]);

  // Função assíncrona para buscar simulados do serviço
  const fetchData = useCallback(async () => {
    try {
      const simuladosData = await getSimulados();
      setSimulados(simuladosData);
    } catch (error) {
      // Log do erro para depuração
      console.error('Error fetching simulados: ', error);
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
        <Title>Simulados</Title>
        {/* Botão para navegar para o formulário de adição de simulados */}
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

export default Simulados;
