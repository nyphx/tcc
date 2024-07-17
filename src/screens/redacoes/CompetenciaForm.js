import { useState } from 'react'
import { db, collection, addDoc } from "../../firebase/firebaseConfig";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; 

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import ButtonPrimary from '../../components/ButtonPrimary'

const CompetenciaForm = ({ navigation, route }) => {
  const { id } = route.params

  const [novaCompetencia, setNovaCompetencia] = useState({
    numeroCompetencia: '',
    notaFinal: '',
    notaMaxima: '',
    descricao: ''
  });

  const handleInputNovaCompetencia = (name, value) => {
    setNovaCompetencia(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const docRef = collection(db, "redacoes", id, "competencias")

      await addDoc(
        docRef, 
        { ...novaCompetencia }
      );
      
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
  };

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
        />

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Nota final"
            placeholder="Ex: 2"
            value={novaCompetencia.notaFinal}
            onChangeText={text => handleInputNovaCompetencia('notaFinal', text)}
            keyboardType="numeric"
            twoColumn={true}
          />

          <TextInputWithLabel
            label="Nota máxima"
            placeholder="Ex: 10"
            value={novaCompetencia.notaMaxima}
            onChangeText={text => handleInputNovaCompetencia('notaMaxima', text)}
            keyboardType="numeric"
            twoColumn={true}
          />
        </View>

        <TextInputWithLabel
          label="Descrição"
          placeholder="Ex: Estrutura sintática excelente e, no máximo, dois desvios"
          value={novaCompetencia.descricao}
          onChangeText={text => handleInputNovaCompetencia('descricao', text)}
          keyboardType="default"
          numberOfLines={3}
        />
      </View>

      <ButtonPrimary handlePress={handleSubmit}>
        Adicionar competência
      </ButtonPrimary>
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
  },
  separator: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 20,
    marginTop: 10,
  }
});

export default CompetenciaForm;
