import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';
import { addSimulado } from './../../services/simuladosService';

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary
} from '../../components';

const SimuladoForm = () => {
  // Hook de navegação para manipular a navegação
  const navigation = useNavigation();simulado

  // Estado para armazenar as informações do simulado
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
      <Title>Adicionar simulado</Title>
  
      <View>
        <TextInputWithLabel
          label="Nome"
          placeholder="Ex: UNESP 2018"
          value={simulado.nome}
          onChangeText={text => handleSimuladoChange('nome', text)}
          keyboardType="default"
        />
  
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Fase"
            placeholder="Ex: 1"
            value={simulado.fase}
            onChangeText={text => handleSimuladoChange('fase', text)}
            keyboardType="default"
            twoColumn={true}
          />
  
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
  
      <View style={[styles.flexSpaceBetween, { marginBottom: -20 }]}>
        <Text style={{ fontSize: 22, fontWeight: '600' }}>
          Conteúdos
        </Text>
  
        <ButtonPrimary handlePress={addConteudoField}>
          Adicionar
        </ButtonPrimary>
      </View>
  
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
              <AntDesign name="delete" size={24} color="black" />
            </Pressable>
          </View>
  
          <View style={{ marginTop: -20, zIndex: 0 }}>
            <TextInputWithLabel
              label="Nome"
              placeholder="Ex: Biologia"
              value={field.nome}
              onChangeText={text => handleConteudoChange(field.id, 'nome', text)}
              keyboardType="default"
            />
  
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TextInputWithLabel
                label="Questões acertadas"
                placeholder="Ex: 10"
                value={field.acertadas}
                onChangeText={text => handleConteudoChange(field.id, 'acertadas', text)}
                keyboardType="numeric"
                twoColumn={true}
              />
  
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
  
      <View style={{ marginTop: 20 }}>
        <ButtonPrimary handlePress={handleSubmit}>
          Salvar simulado
        </ButtonPrimary>
      </View>
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
