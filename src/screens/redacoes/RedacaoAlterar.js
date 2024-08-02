import { View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateRedacao, deleteRedacao } from '../../services/redacoesService'; 

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary,
  ButtonDelete
} from '../../components'; 

const RedacaoAlterar = () => {
  // Hook de navegação para manipular a navegação
  const navigation = useNavigation(); 
  // Obtém o ID da redação dos parâmetros da rota
  const { data } = useRoute().params; 

  // state
  const [redacao, setRedacao] = useState(data); 

  // Manipula as mudanças de input e atualiza o estado da redação
  const handleInputRedacao = (name, value) => {
    setRedacao(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função para atualizar a redação
  const handleUpdateRedacao = async () => {
    try {
      await updateRedacao(data.id, redacao); 
      navigation.goBack(); 
    } catch (error) {
      console.error(error); 
    }
  };

  // Função para deletar a redação
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
      <Title>Alterar competência</Title>

      <View>
        <TextInputWithLabel
          label="Tema da redação"
          placeholder="Ex: (FUVEST) Educação básica e formação profissional"
          numberOfLines={3}
          value={redacao.tema}
          onChangeText={text => handleInputRedacao('tema', text)}
          keyboardType="default"
        />

        <View style={{ flexDirection: 'row', gap: 20 }}>
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

      <ButtonPrimary handlePress={handleUpdateRedacao}>
        Alterar
      </ButtonPrimary>

      <ButtonDelete handlePress={handleDeleteRedacao}>
        Excluir
      </ButtonDelete>
    </Container>
  );
};

export default RedacaoAlterar;
