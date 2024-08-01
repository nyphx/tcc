import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addRedacao } from '../../services/redacoesService';

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary
} from '../../components'; 

const RedacoesForm = () => {
  // Hook de navegação para manipular a navegação
  const navigation = useNavigation();

  // Estado inicial para armazenar os dados da redação
  const [redacao, setRedacao] = useState({
    tema: '',
    notaFinal: '',
    notaMaxima: '',
    data: '',
  });

  // Função para atualizar o estado da redação conforme o usuário edita os campos
  const handleInputRedacao = (name, value) => {
    setRedacao(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função para submeter a nova redação
  const handleSubmit = async () => {
    try {
      await addRedacao(redacao); 
      navigation.goBack(); 
    } catch (error) {
      console.error('Error adding redacao: ', error); 
    }
  };

  return (
    <Container>
      <Title>Adicionar redação</Title>

      <View style={styles.form}>
        <TextInputWithLabel
          label="Tema da redação"
          placeholder="Ex: (FUVEST) Educação básica e formação profissional"
          numberOfLines={3}
          value={redacao.tema}
          onChangeText={text => handleInputRedacao('tema', text)}
          keyboardType="default"
        />

        <View style={styles.row}>
          <TextInputWithLabel
            label="Nota final"
            placeholder="Ex: 42"
            value={redacao.notaFinal}
            onChangeText={text => handleInputRedacao('notaFinal', text)}
            keyboardType="numeric"
            twoColumn={true}
          />

          <TextInputWithLabel
            label="Nota máxima"
            placeholder="Ex: 50"
            value={redacao.notaMaxima}
            onChangeText={text => handleInputRedacao('notaMaxima', text)}
            keyboardType="numeric"
            twoColumn={true}
          />
        </View>

        <TextInputWithLabel
          label="Data realizada"
          placeholder="Ex: 23/03/2024"
          value={redacao.data}
          onChangeText={text => handleInputRedacao('data', text)}
          keyboardType="default"
        />
      </View>

      <ButtonPrimary handlePress={handleSubmit}>
        Adicionar redação
      </ButtonPrimary>
    </Container>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
});

export default RedacoesForm;
