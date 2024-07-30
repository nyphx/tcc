import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { AntDesign } from '@expo/vector-icons';

import { 
  getSimuladoWithConteudos, 
  updateSimuladoById, 
  deleteSimuladoById 
} from './../../services/simuladosService';

import {
  Container,
  TextInputWithLabel,
  Title,
  ButtonPrimary
} from '../../components';


const SimuladoForm = ({ navigation, route }) => {
  const { id } = route.params;
  const [simulado, setSimulado] = useState({});

  const [conteudoFields, setConteudoFields] = useState([
    { id: uuidv4(), nome: '', acertadas: '', totais: '' }
  ]);

  const fetchData = useCallback(async () => {
    try {
      const { simulado, conteudos } = await getSimuladoWithConteudos(id);
      setSimulado(simulado);
      setConteudoFields(conteudos);
    } catch (error) {
      console.error('Error fetching simulado: ', error);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const addConteudoField = () => {
    setConteudoFields([...conteudoFields, { id: uuidv4(), nome: '', acertadas: '', totais: '' }]);
  };

  const removeConteudoField = id => {
    setConteudoFields(conteudoFields.filter(field => field.id !== id));
  };

  const handleSimuladoChange = (name, value) => {
    setSimulado({ ...simulado, [name]: value });
  };

  const handleConteudoChange = (id, name, value) => {
    const newFields = conteudoFields.map(field => {
      if (field.id === id) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setConteudoFields(newFields);
  };

  const handleUpdateSimulado = async () => {
    try {
      await updateSimuladoById(id, simulado, conteudoFields);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating simulado: ', error);
    }
  };

  const handleDeleteSimulado = async () => {
    try {
      await deleteSimuladoById(id);
      navigation.navigate('Simulados');
    } catch (error) {
      console.error('Error deleting simulado: ', error);
    }
  };

  return (
    <Container>
      <Title>Alterar simulado</Title>
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
          {index !== 0 && <View style={styles.separator} />}

          <View style={{ marginTop: 26 }}>
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

      <ButtonPrimary handlePress={handleUpdateSimulado}>Alterar</ButtonPrimary>

      <ButtonDelete handlePress={handleDeleteSimulado}>Excluir</ButtonDelete>
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
