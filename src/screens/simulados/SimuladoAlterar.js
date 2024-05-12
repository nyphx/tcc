import { useState } from 'react'
import { View } from 'react-native';
import { db, doc, updateDoc } from "../../firebase/firebaseConfig";

import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import ButtonPrimary from '../../components/ButtonPrimary'
import ButtonExcluir from '../../components/ButtonDelete'

export default SimuladosForm = ({ route, navigation }) => {
  const { data } = route.params

  const [simulado, setSimulado] = useState({
    nome: data.nome,
    fase: data.fase,
    data: data.data,
    notaFinal: data.notaFinal,
    notaMaxima: data.notaMaxima
  });

  const handleInputChange = (name, value) => {
    setSimulado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "simulados", data.id);
      await updateDoc(docRef, simulado);
      
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    console.log("delete")
  }

  return (
    <Container>
      <Title>Alterar simulado</Title>

      <View>
        <TextInputWithLabel
          label="Nome"
          placeholder="Ex: UNESP 2018"
          value={simulado.nome}
          onChangeText={text => handleInputChange('nome', text)}
          keyboardType="default"
        />

        <TextInputWithLabel
          label="Fase"
          placeholder="Ex: 1ª fase"
          value={simulado.fase}
          onChangeText={text => handleInputChange('fase', text)}
          keyboardType="numeric"
        />

        <TextInputWithLabel
          label="Data Realizada"
          placeholder="Ex: 23/03/2023"
          value={simulado.data}
          onChangeText={text => handleInputChange('data', text)}
          keyboardType="default"
        />

        <TextInputWithLabel
          label="Nota Final"
          placeholder="Ex: 70"
          value={simulado.notaFinal}
          onChangeText={text => handleInputChange('notaFinal', text)}
          keyboardType="numeric"
        />

        <TextInputWithLabel
          label="Nota Máxima"
          placeholder="Ex: 90"
          value={simulado.notaMaxima}
          onChangeText={text => handleInputChange('notaMaxima', text)}
          keyboardType="numeric"
        />
      </View>

      <View style={{ gap: 10 }}>
        <ButtonPrimary handlePress={handleSubmit}>
          Alterar simulado
        </ButtonPrimary>

        <ButtonDelete handlePress={handleDelete}>
          Excluir
        </ButtonDelete>
      </View>
    </Container>
  );
};
