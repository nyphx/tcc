import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import { 
  getCompetencia, 
  deleteCompetencia, 
  updateCompetencia 
} from './../../services/redacoesService';

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary,
  ButtonDelete
} from '../../components';

const CompetenciaAlterar = () => {
  // Hook para navegação
  const navigation = useNavigation();
  // Extrai os parâmetros da rota
  const { idCompetencia, idRedacao } = useRoute().params;

  // Estado inicial para armazenar os dados da competência
  const [competencia, setCompetencia] = useState({
    numeroCompetencia: '',
    notaFinal: '',
    notaMaxima: '',
    descricao: ''
  });

  // Função para atualizar o estado da competência com novos valores
  const handleInputCompetencia = (name, value) => {
    setCompetencia(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função assíncrona para buscar os dados da competência no Firestore
  const fetchData = useCallback(async () => {
    try {
      const competenciaData = await getCompetencia(idRedacao, idCompetencia);
      setCompetencia(competenciaData);
    } catch (error) {
      console.error('Error fetching competencia: ', error);
    }
  }, [idRedacao, idCompetencia]);

  // Hook que chama fetchData sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      fetchData(); // Busca os dados da competência
    }, [fetchData])
  );

  // Função para atualizar a competência no Firestore
  const handleUpdateCompetencia = async () => {
    try {
      await updateCompetencia(idRedacao, idCompetencia, competencia);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating competencia: ', error);
    }
  };

  // Função para deletar a competência no Firestore
  const handleDeleteCompetencia = async () => {
    try {
      await deleteCompetencia(idRedacao, idCompetencia);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting competencia: ', error);
    }
  };

  return (
    <Container>
      <Title>Alterar competência</Title>

      <View>
        <TextInputWithLabel
          label="Número da competência"
          placeholder="Ex: 1"
          value={competencia.numeroCompetencia}
          onChangeText={text => handleInputCompetencia('numeroCompetencia', text)}
          keyboardType="numeric"
        />

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Nota final"
            placeholder="Ex: 2"
            value={competencia.notaFinal}
            onChangeText={text => handleInputCompetencia('notaFinal', text)}
            keyboardType="numeric"
            twoColumn
          />

          <TextInputWithLabel
            label="Nota máxima"
            placeholder="Ex: 10"
            value={competencia.notaMaxima}
            onChangeText={text => handleInputCompetencia('notaMaxima', text)}
            keyboardType="numeric"
            twoColumn
          />
        </View>

        <TextInputWithLabel
          label="Descrição"
          placeholder="Ex: Estrutura sintática excelente e, no máximo, dois desvios"
          value={competencia.descricao}
          onChangeText={text => handleInputCompetencia('descricao', text)}
          keyboardType="default"
          numberOfLines={3}
        />
      </View>

      <ButtonPrimary handlePress={handleUpdateCompetencia}>
        Alterar
      </ButtonPrimary>

      <ButtonDelete handlePress={handleDeleteCompetencia}>
        Excluir
      </ButtonDelete>
    </Container>
  );
};

export default CompetenciaAlterar;
