import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateRedacao, deleteRedacao } from '../../services/redacoesService'; 

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary,
  ButtonDelete,
  ConfirmDeleteModal
} from '../../components'; 

const RedacaoAlterar = () => {
  const navigation = useNavigation(); 
  const { data } = useRoute().params; 

  const [redacao, setRedacao] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputRedacao = (name, value) => {
    setRedacao(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!redacao.tema) {
      errors.tema = 'Tema da redação é obrigatório';
      valid = false;
    }

    if (!redacao.notaFinal) {
      errors.notaFinal = 'Nota final é obrigatória';
      valid = false;
    } else if (isNaN(redacao.notaFinal)) {
      errors.notaFinal = 'Nota final deve ser um número';
      valid = false;
    }

    if (!redacao.notaMaxima) {
      errors.notaMaxima = 'Nota máxima é obrigatória';
      valid = false;
    } else if (isNaN(redacao.notaMaxima)) {
      errors.notaMaxima = 'Nota máxima deve ser um número';
      valid = false;
    }

    if (!redacao.data) {
      errors.data = 'Data realizada é obrigatória';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleUpdateRedacao = async () => {
    if (!validate()) {
      return;
    }

    try {
      await updateRedacao(data.id, redacao); 
      navigation.goBack(); 
    } catch (error) {
      console.error(error); 
    }
  };

  const handleDeleteRedacao = async () => {
    try {
      await deleteRedacao(data.id);
      navigation.navigate('Redacoes');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Alterar redação</Title>

      <View>
        <TextInputWithLabel
          label="Tema da redação"
          placeholder="Ex: (FUVEST) Educação básica e formação profissional"
          numberOfLines={3}
          value={redacao.tema}
          onChangeText={text => handleInputRedacao('tema', text)}
          keyboardType="default"
          errorMessage={errors.tema}
        />

        <View style={styles.row}>
          <TextInputWithLabel
            label="Nota final"
            placeholder="Ex: 42"
            value={redacao.notaFinal}
            onChangeText={text => handleInputRedacao('notaFinal', text)}
            keyboardType="numeric"
            twoColumn={true}
            errorMessage={errors.notaFinal}
          />

          <TextInputWithLabel
            label="Nota máxima"
            placeholder="Ex: 50"
            value={redacao.notaMaxima}
            onChangeText={text => handleInputRedacao('notaMaxima', text)}
            keyboardType="numeric"
            twoColumn={true}
            errorMessage={errors.notaMaxima}
          />
        </View>

        <TextInputWithLabel
          label="Data realizada"
          placeholder="Ex: 23/03/2024"
          value={redacao.data}
          onChangeText={text => handleInputRedacao('data', text)}
          keyboardType="default"
          errorMessage={errors.data}
        />
      </View>

      <ButtonPrimary handlePress={handleUpdateRedacao}>
        Alterar
      </ButtonPrimary>

      <ButtonDelete handlePress={() => setModalVisible(true)}>
        Excluir
      </ButtonDelete>

      <ConfirmDeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeleteRedacao}
        title="redação"
        message="esta redação"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default RedacaoAlterar;
