import React, { useState, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addCompetencia } from './../../services/redacoesService';
import { View } from 'react-native';

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary
} from '../../components';

const CompetenciaForm = () => {
  const navigation = useNavigation(); // Hook para navegação
  const { id } = useRoute().params; // Extrai os parâmetros da rota

  // Estado inicial para armazenar os dados da nova competência
  const [novaCompetencia, setNovaCompetencia] = useState({
    numeroCompetencia: '',
    notaFinal: '',
    notaMaxima: '',
    descricao: ''
  });

  // Função para atualizar o estado da nova competência com novos valores
  const handleInputNovaCompetencia = (name, value) => {
    setNovaCompetencia(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = useCallback(async () => {
    try {
      await addCompetencia(id, novaCompetencia);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding competencia: ', error);
    }
  }, [id, novaCompetencia, navigation]);

  return (
    <Container>
      <Title>Adicionar competência</Title>

      <View>
        <TextInputWithLabel
          label="Número da competência"
          placeholder="Ex: 1"
          value={novaCompetencia.numeroCompetencia}
          onChangeText={text => handleInputNovaCompetencia('numeroCompetencia', text)}
          keyboardType="numeric"
        />

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Nota final"
            placeholder="Ex: 2"
            value={novaCompetencia.notaFinal}
            onChangeText={text => handleInputNovaCompetencia('notaFinal', text)}
            keyboardType="numeric"
            twoColumn
          />

          <TextInputWithLabel
            label="Nota máxima"
            placeholder="Ex: 10"
            value={novaCompetencia.notaMaxima}
            onChangeText={text => handleInputNovaCompetencia('notaMaxima', text)}
            keyboardType="numeric"
            twoColumn
          />
        </View>

        <TextInputWithLabel
          label="Descrição"
          placeholder="Ex: Estrutura sintática excelente e, no máximo, dois desvios"
          value={novaCompetencia.descricao}
          onChangeText={text => handleInputNovaCompetencia('descricao', text)}
          keyboardType="default"
          numberOfLines={3}
        />
      </View>

      <ButtonPrimary handlePress={handleSubmit}>
        Adicionar competência
      </ButtonPrimary>
    </Container>
  );
};

export default CompetenciaForm;
