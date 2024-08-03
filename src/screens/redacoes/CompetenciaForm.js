import React, { useState, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addCompetencia } from './../../services/redacoesService';
import { View, Text, StyleSheet } from 'react-native';

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary
} from '../../components';

const CompetenciaForm = () => {
  const navigation = useNavigation();
  const { id } = useRoute().params;

  const [novaCompetencia, setNovaCompetencia] = useState({
    numeroCompetencia: '',
    notaFinal: '',
    notaMaxima: '',
    descricao: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputNovaCompetencia = (name, value) => {
    setNovaCompetencia(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!novaCompetencia.numeroCompetencia) {
      errors.numeroCompetencia = 'Número da competência é obrigatório';
      valid = false;
    } else if (isNaN(novaCompetencia.numeroCompetencia)) {
      errors.numeroCompetencia = 'Número da competência deve ser um número';
      valid = false;
    }

    if (!novaCompetencia.notaFinal) {
      errors.notaFinal = 'Nota final é obrigatória';
      valid = false;
    } else if (isNaN(novaCompetencia.notaFinal)) {
      errors.notaFinal = 'Nota final deve ser um número';
      valid = false;
    }

    if (!novaCompetencia.notaMaxima) {
      errors.notaMaxima = 'Nota máxima é obrigatória';
      valid = false;
    } else if (isNaN(novaCompetencia.notaMaxima)) {
      errors.notaMaxima = 'Nota máxima deve ser um número';
      valid = false;
    }

    if (!novaCompetencia.descricao) {
      errors.descricao = 'Descrição é obrigatória';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = useCallback(async () => {
    if (!validate()) {
      return;
    }

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
          errorMessage={errors.numeroCompetencia}
        />

        <View style={styles.row}>
          <TextInputWithLabel
            label="Nota final"
            placeholder="Ex: 2"
            value={novaCompetencia.notaFinal}
            onChangeText={text => handleInputNovaCompetencia('notaFinal', text)}
            keyboardType="numeric"
            twoColumn
            errorMessage={errors.notaFinal}
          />

          <TextInputWithLabel
            label="Nota máxima"
            placeholder="Ex: 10"
            value={novaCompetencia.notaMaxima}
            onChangeText={text => handleInputNovaCompetencia('notaMaxima', text)}
            keyboardType="numeric"
            twoColumn
            errorMessage={errors.notaMaxima}
          />
        </View>

        <TextInputWithLabel
          label="Descrição"
          placeholder="Ex: Estrutura sintática excelente e, no máximo, dois desvios"
          value={novaCompetencia.descricao}
          onChangeText={text => handleInputNovaCompetencia('descricao', text)}
          keyboardType="default"
          numberOfLines={3}
          errorMessage={errors.descricao}
        />
      </View>

      <ButtonPrimary handlePress={handleSubmit}>
        Adicionar competência
      </ButtonPrimary>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 20,
  },
});

export default CompetenciaForm;
