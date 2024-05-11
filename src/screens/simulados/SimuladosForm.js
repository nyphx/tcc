import { useState } from 'react'

import { 
  Text, 
  View,
  TextInput,
  StyleSheet
} from 'react-native';

import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'

export default SimuladosForm = () => {
  const [simulado, setSimulado] = useState({
    nome: '',
    fase: '',
    data: '',
    notaFinal: '',
    notaMaxima: ''
  });

  const handleChange = (name, value) => {
    setSimulado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Container>
      <Title>Adicionar simulado</Title>

      <View>
        <TextInputWithLabel
          label="Nome"
          placeholder="Ex: UNESP 2018"
          value={simulado.nome}
          onChangeText={text => handleChange('nome', text)}
          keyboardType="default"
        />

        <TextInputWithLabel
          label="Fase"
          placeholder="Ex: 1ª fase"
          value={simulado.fase}
          onChangeText={text => handleChange('fase', text)}
          keyboardType="default"
        />

        <TextInputWithLabel
          label="Data Realizada"
          placeholder="Ex: 23/03/2023"
          value={simulado.data}
          onChangeText={text => handleChange('data', text)}
          keyboardType="numeric"
        />

        <TextInputWithLabel
          label="Nota Final"
          placeholder="Ex: 70"
          value={simulado.notaFinal}
          onChangeText={text => handleChange('notaFinal', text)}
          keyboardType="numeric"
        />

        <TextInputWithLabel
          label="Nota Máxima"
          placeholder="Ex: 90"
          value={simulado.notaMaxima}
          onChangeText={text => handleChange('notaMaxima', text)}
          keyboardType="numeric"
        />
      </View>
    </Container>
  );
};
