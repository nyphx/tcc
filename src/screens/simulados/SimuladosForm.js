import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary
} from '../../components';

import { AntDesign } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { addSimulado } from './../../services/simuladosService';

const SimuladoForm = ({ navigation }) => {
  // Estado para armazenar as informações principais do simulado
  const [simulado, setSimulado] = useState({
    nome: '',
    fase: '',
    data: '',
    conteudos: []
  });

  // Estado para gerenciar os campos dinâmicos de conteúdos
  const [conteudoFields, setConteudoFields] = useState([
    { id: uuidv4(), nome: '', acertadas: '', totais: '' }
  ]);

  // Função para adicionar um novo conjunto de campos de conteúdo
  const addConteudoField = () => {
    setConteudoFields([
      ...conteudoFields, 
      { id: uuidv4(), nome: '', acertadas: '', totais: '' }
    ]);
  };

  // Função para remover um campo de conteúdo pelo seu ID
  const removeConteudoField = id => {
    setConteudoFields(prevFields => prevFields.filter(field => field.id !== id));
  };

  // Função para atualizar os valores dos campos do simulado
  const handleSimuladoChange = (name, value) => {
    setSimulado({ ...simulado, [name]: value });
  };

  // Função para atualizar os valores dos campos dos conteúdos
  const handleConteudoChange = (id, name, value) => {
    const newFields = conteudoFields.map(field => {
      if (field.id === id) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setConteudoFields(newFields);
  };

  // Função para enviar os dados do simulado e dos conteúdos para o backend
  const handleSubmit = async () => {
    try {
      const conteudos = conteudoFields.reduce((acc, field) => {
        acc[field.nome] = {
          acertadas: field.acertadas,
          totais: field.totais
        };
        return acc;
      }, {});
  
      const simuladoData = {
        ...simulado,
        conteudos
      };
  
      await addSimulado(simuladoData);
  
      navigation.goBack();
    } catch (error) {
      console.error('Error adding simulado: ', error);
    }
  };

  return (
    <Container>
      {/* Título do formulário */}
      <Title>Adicionar simulado</Title>
  
      <View>
        {/* Campo para o nome do simulado */}
        <TextInputWithLabel
          label="Nome"
          placeholder="Ex: UNESP 2018"
          value={simulado.nome}
          onChangeText={text => handleSimuladoChange('nome', text)}
          keyboardType="default"
        />
  
        {/* Container para os campos "Fase" e "Data Realizada", exibidos em linha */}
        <View style={{ flexDirection: 'row', gap: 20 }}>
          {/* Campo para a fase do simulado */}
          <TextInputWithLabel
            label="Fase"
            placeholder="Ex: 1"
            value={simulado.fase}
            onChangeText={text => handleSimuladoChange('fase', text)}
            keyboardType="default"
            twoColumn={true}
          />
  
          {/* Campo para a data realizada do simulado */}
          <TextInputWithLabel
            label="Data Realizada"
            placeholder="Ex: 23/03/2023"
            value={simulado.data}
            onChangeText={text => handleSimuladoChange('data', text)}
            keyboardType="default"
            twoColumn={true}
          />
        </View>
      </View>
  
      {/* Container para o título "Conteúdos" e o botão de adicionar */}
      <View style={[styles.flexSpaceBetween, { marginBottom: -20 }]}>
        {/* Título para a seção de conteúdos */}
        <Text style={{ fontSize: 22, fontWeight: '600' }}>
          Conteúdos
        </Text>
  
        {/* Botão para adicionar novos campos de conteúdo */}
        <ButtonPrimary handlePress={addConteudoField}>
          Adicionar
        </ButtonPrimary>
      </View>
  
      {/* Mapeia os campos de conteúdo e renderiza cada um deles */}
      {conteudoFields.map((field, index) => (
        <View key={field.id}>
          {/* Adiciona uma linha separadora entre os campos, exceto no primeiro */}
          {index !== 0 && <View style={styles.separator} />}
  
          {/* Container para o botão de remover, que é posicionado à direita */}
          <View style={styles.removeButtonContainer}>
            <Pressable 
              style={styles.removeButton}
              onPress={() => removeConteudoField(field.id)}
            >
              {/* Ícone de remover */}
              <AntDesign name="delete" size={24} color="black" />
            </Pressable>
          </View>
  
          {/* Container para os campos de conteúdo */}
          <View style={{ marginTop: -20, zIndex: 0 }}>
            {/* Campo para o nome do conteúdo */}
            <TextInputWithLabel
              label="Nome"
              placeholder="Ex: Biologia"
              value={field.nome}
              onChangeText={text => handleConteudoChange(field.id, 'nome', text)}
              keyboardType="default"
            />
  
            {/* Container para os campos "Questões acertadas" e "Questões totais", exibidos em linha */}
            <View style={{ flexDirection: 'row', gap: 20 }}>
              {/* Campo para questões acertadas */}
              <TextInputWithLabel
                label="Questões acertadas"
                placeholder="Ex: 10"
                value={field.acertadas}
                onChangeText={text => handleConteudoChange(field.id, 'acertadas', text)}
                keyboardType="numeric"
                twoColumn={true}
              />
  
              {/* Campo para questões totais */}
              <TextInputWithLabel
                label="Questões totais"
                placeholder="Ex: 15"
                value={field.totais}
                onChangeText={text => handleConteudoChange(field.id, 'totais', text)}
                keyboardType="numeric"
                twoColumn={true}
              />
            </View>
          </View>
        </View>
      ))}
  
      {/* Botão para salvar o simulado */}
      <ButtonPrimary handlePress={handleSubmit}>
        Salvar simulado
      </ButtonPrimary>
    </Container>
  );  
};

const styles = StyleSheet.create({
  flexSpaceBetween:{
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  separator: {
    backgroundColor: '#ccc', 
    height: 1, 
    width: '100%',
  },
  removeButtonContainer: {
    alignItems: 'flex-end',
    zIndex: 9999,
    marginTop: 22,
  },
});

export default SimuladoForm;
