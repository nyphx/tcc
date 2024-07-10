import { useState } from 'react'
import { db, collection, addDoc } from "../../firebase/firebaseConfig";

import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import ButtonPrimary from '../../components/ButtonPrimary'

import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid'; 

const RedacoesForm = ({ navigation }) => {
  const [redacao, setRedacao] = useState({
    tema: '',
    notaFinal: '',
    notaMaxima: '',
    data: '',
    competencias: [],
  });

  const handleInputRedacao = (name, value) => {
    setRedacao(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addCompetencia = () => {
    const newCompetencia = {
      id: uuidv4(),
      notaFinalCompetencia: '',
      notaMaximaCompetencia: '',
      descricao: ''
    };
    setRedacao(prevState => ({
      ...prevState,
      competencias: [...prevState.competencias, newCompetencia]
    }));
  };

  const removeCompetencia = (id) => {
    const updatedCompetencias = redacao.competencias.filter(comp => comp.id !== id);
    setRedacao(prevState => ({
      ...prevState,
      competencias: updatedCompetencias
    }));
  };

  const handleCompetenciaChange = (text, id, field) => {
    const updatedCompetencias = redacao.competencias.map(comp =>
      comp.id === id ? { ...comp, [field]: text } : comp
    );
    setRedacao(prevState => ({
      ...prevState,
      competencias: updatedCompetencias
    }));
  };

  return (
    <Container>
      <Title>Adicionar redação</Title>

      <View>
        <Text style={[styles.competenciaTitle, { marginBottom: 20 }]}>
          Informações
        </Text>

        <TextInputWithLabel
          label="Tema da redação"
          placeholder="Ex: (FUVEST) Educação básica e formação profissional"
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
          />

          <TextInputWithLabel
            label="Nota máxima"
            placeholder="Ex: 50"
            value={redacao.notaMaxima}
            onChangeText={text => handleInputRedacao('notaMaxima', text)}
            keyboardType="numeric"
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

      <View>
        <View style={[styles.competenciaHeader, { marginBottom: 12 }]}>
          <Text style={styles.competenciaTitle}>
            Competências
          </Text>

          <ButtonPrimary handlePress={addCompetencia}>
            Adicionar
          </ButtonPrimary>
        </View>

        {redacao.competencias.map((comp, index) => (
          <View key={comp.id}>
            {index !== 0 &&
              <View style={styles.separator}/>            
            }

            <View style={[styles.competenciaHeader, { marginBottom: 4 }]}>
              <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10 }}>
                Competência {index + 1}
              </Text>

              <TouchableOpacity onPress={() => removeCompetencia(comp.id)}>
                <Feather name="trash-2" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TextInputWithLabel
                label={`Nota final`}
                placeholder="Ex: 8.5"
                value={comp.notaFinalCompetencia}
                onChangeText={text => handleCompetenciaChange(text, comp.id, 'notaFinalCompetencia')}
                keyboardType="numeric"
              />

              <TextInputWithLabel
                label={`Nota máxima`}
                placeholder="Ex: 10"
                value={comp.notaMaximaCompetencia}
                onChangeText={text => handleCompetenciaChange(text, comp.id, 'notaMaximaCompetencia')}
                keyboardType="numeric"
              />
            </View>

            <TextInputWithLabel
              label={`Descrição`}
              placeholder="Ex: Avaliação do uso correto da língua portuguesa"
              value={comp.descricao}
              onChangeText={text => handleCompetenciaChange(text, comp.id, 'descricao')}
              keyboardType="default"
            />
          </View>
        ))}
      </View>

      <RedirectButton>
        Adicionar redação
      </RedirectButton>
    </Container>
  );
};

const styles = StyleSheet.create({
  competenciaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  competenciaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 20,
    marginTop: 10,
  }
});

export default RedacoesForm;
