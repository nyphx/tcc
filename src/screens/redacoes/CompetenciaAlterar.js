import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteCompetencia, updateCompetencia } from './../../services/redacoesService';

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary,
  ButtonDelete,
  ConfirmDeleteModal
} from '../../components';

const CompetenciaAlterar = () => {
  const navigation = useNavigation();
  const { data, idRedacao } = useRoute().params;

  const [competencia, setCompetencia] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputCompetencia = (name, value) => {
    setCompetencia(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!competencia.numeroCompetencia) {
      errors.numeroCompetencia = 'Número da competência é obrigatório';
      valid = false;
    } else if (isNaN(competencia.numeroCompetencia)) {
      errors.numeroCompetencia = 'Número da competência deve ser um número';
      valid = false;
    }

    if (!competencia.notaFinal) {
      errors.notaFinal = 'Nota final é obrigatória';
      valid = false;
    } else if (isNaN(competencia.notaFinal)) {
      errors.notaFinal = 'Nota final deve ser um número';
      valid = false;
    }

    if (!competencia.notaMaxima) {
      errors.notaMaxima = 'Nota máxima é obrigatória';
      valid = false;
    } else if (isNaN(competencia.notaMaxima)) {
      errors.notaMaxima = 'Nota máxima deve ser um número';
      valid = false;
    }

    if (!competencia.descricao) {
      errors.descricao = 'Descrição é obrigatória';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleUpdateCompetencia = useCallback(async () => {
    if (!validate()) {
      return;
    }

    try {
      await updateCompetencia(idRedacao, data.id, competencia);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating competencia: ', error);
    }
  }, [idRedacao, data.id, competencia, navigation]);

  const handleDeleteCompetencia = useCallback(async () => {
    try {
      await deleteCompetencia(idRedacao, data.id);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting competencia: ', error);
    }
  }, [idRedacao, data.id, navigation]);

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
          errorMessage={errors.numeroCompetencia}
        />

        <View style={styles.row}>
          <TextInputWithLabel
            label="Nota final"
            placeholder="Ex: 2"
            value={competencia.notaFinal}
            onChangeText={text => handleInputCompetencia('notaFinal', text)}
            keyboardType="numeric"
            twoColumn
            errorMessage={errors.notaFinal}
          />

          <TextInputWithLabel
            label="Nota máxima"
            placeholder="Ex: 10"
            value={competencia.notaMaxima}
            onChangeText={text => handleInputCompetencia('notaMaxima', text)}
            keyboardType="numeric"
            twoColumn
            errorMessage={errors.notaMaxima}
          />
        </View>

        <TextInputWithLabel
          label="Descrição"
          placeholder="Ex: Estrutura sintática excelente e, no máximo, dois desvios"
          value={competencia.descricao}
          onChangeText={text => handleInputCompetencia('descricao', text)}
          keyboardType="default"
          numberOfLines={3}
          errorMessage={errors.descricao}
        />
      </View>

      <View style={{ gap: 10 }}>
        <ButtonPrimary handlePress={handleUpdateCompetencia}>
          Alterar
        </ButtonPrimary>

        <ButtonDelete handlePress={() => setModalVisible(true)}>
          Excluir
        </ButtonDelete>
      </View>

      <ConfirmDeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeleteCompetencia}
        title="competência"
        message="esta competência"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default CompetenciaAlterar;
