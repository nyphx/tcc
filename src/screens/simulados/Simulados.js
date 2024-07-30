import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getSimulados } from './../../services/simuladosService';

import {
  Container,
  Header,
  Title,
  RedirectButton
} from '../../components';

import Card from './components/Card';

const Simulados = ({ navigation }) => {
  const [simulados, setSimulados] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const simuladosData = await getSimulados();
      setSimulados(simuladosData);
    } catch (error) {
      console.error('Error fetching simulados: ', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  console.log("reload")

  return (
    <Container>
      <Header>
        <Title>Simulados</Title>

        <RedirectButton screen="SimuladosForm">
          Adicionar simulado
        </RedirectButton>
      </Header>

      {
        simulados.map(data => (
          <Card 
          simulado={data} 
          key={data.id} 
          onPress={{ navigation }} 
          />
        ))
      }
    </Container>
  );
};

export default Simulados;
