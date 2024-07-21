import { db, collection, addDoc } from "../../firebase/firebaseConfig";

import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import ButtonPrimary from '../../components/ButtonPrimary'

import { AntDesign } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native';

const SimuladoForm = ({ navigation }) => {
  // contém as informações principais do simulado
  const [simulado, setSimulado] = useState({
    nome: '',
    fase: '',
    data: '',
    conteudos: []
  });

  // gerencia os campos dinâmicos para adicionar conteúdos
  const [conteudoFields, setConteudoFields] = useState([
    { id: uuidv4(), nome: '', acertadas: '', totais: '' }
  ]);

  // função que adiciona um novo conjunto de campos de conteúdo
  const addConteudoField = () => {
    setConteudoFields([
      ...conteudoFields, 
      { id: uuidv4(), nome: '', acertadas: '', totais: '' }
    ]);
  };

  // função que recebe um id e remove o campo
  // de conteúdo correspondente do estado
  const removeConteudoField = id => {
    setConteudoFields(conteudoFields.filter(field => field.id !== id));
  };

  // atualiza os valores dos campos do simulado
  const handleSimuladoChange = (name, value) => {
    setSimulado({ ...simulado, [name]: value });
  };

  // atualiza os valores dos campos dos conteúdos
  const handleConteudoChange = (id, name, value) => {
    const newFields = conteudoFields.map(field => {
      if (field.id === id) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setConteudoFields(newFields);
  };

  // consolida os dados do simulado e dos conteúdos
  // e os envia para o banco de dados
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

      const simuladosRef = collection(db, "simulados")

      await addDoc(
        simuladosRef, 
        { ...simuladoData }
      );

      navigation.goBack();
    } catch (error) {
      console.error(error);
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
          { index !== 0 && <View style={styles.separator} /> }

          <View style={{ marginTop: 26 }}>
            {/* adicionado ao lado de cada campo de conteúdo para
            fornecer um botão de remoção. quando pressionado, 
            chama a função removeConteudoField com o id do campo. */}
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeConteudoField(field.id)}
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          
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
  removeButton: {
    position: 'absolute',
    right: 0,
    top: -6
  }
});

export default SimuladoForm;
