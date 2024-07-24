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

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary
} from '../../components';

const RedacoesForm = ({ navigation }) => {
  const [redacao, setRedacao] = useState({
    tema: '',
    notaFinal: '',
    notaMaxima: '',
    data: '',
  });

  const handleInputRedacao = (name, value) => {
    setRedacao(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const redacoesRef = collection(db, "redacoes")

      await addDoc(
        redacoesRef, 
        { ...redacao }
      );

      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Adicionar redação</Title>

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

      <ButtonPrimary handlePress={handleSubmit}>
        Adicionar redação
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

export default RedacoesForm;
