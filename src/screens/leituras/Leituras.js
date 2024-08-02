import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getLeituras } from './../../services/leiturasService';

import {
  Container,
  Header,
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
  const fetchData = useCallback(async () => {
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
      // Log do erro para depuração
      console.error('Error fetching leituras: ', error);
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
    <>
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
        <TextPrimary>{emptyMessage}</TextPrimary>
      }
    </>
  );

  return (
    <Container>
      <Header>
        <CountTitle 
          title="Leituras Obrigatórias"
          count={lendo.length + finalizado.length + parado.length + futuro.length}
          bgColor="rgb(191 219 254)"
          textColor="rgb(29 78 216)"
        />
        <RedirectButton screen="LeiturasForm">
          Adicionar leitura
        </RedirectButton>
      </Header>

      {renderLeiturasSection("Lendo", lendo, "#B5E08A", "rgb(2 44 34)", "Não há livro sendo lido.")}
      {renderLeiturasSection("Parado", parado, "#E09A8A", "rgb(69 10 10)", "Não há livro parado.")}
      {renderLeiturasSection("Futuro", futuro, "#ccc", "rgb(8 47 73)", "Não há livro futuro.")}
      {renderLeiturasSection("Finalizado", finalizado, "#A2B5E6", "rgb(30 41 59)", "Não há livro finalizado.")}
    </Container>
  );
};

export default Leituras;
