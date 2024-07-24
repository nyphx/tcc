import { useState } from 'react'
import { View } from 'react-native';
import { db, collection, addDoc } from "../../firebase/firebaseConfig";

import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import ButtonPrimary from '../../components/ButtonPrimary'
import RadioForm from '../../components/RadioForm'

export default function App({ navigation }) {
  const [nome, setNome] = useState("")
  const [estado, setEstado] = useState("")

  const radioButtonsEstados = [
    { id: 0, value: 'Estudando' },
    { id: 1, value: 'Parado' },
    { id: 2, value: 'Finalizado' },
    { id: 3, value: 'Futuro' },
  ]

  const handleSubmit = async () => {
    try {
      const disciplinasRef = collection(db, "disciplinas")

      await addDoc(
        disciplinasRef, 
        { nome: nome, estado: estado }
      );

      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>
        Adicionar disciplina
      </Title>

      <View>
        <TextInputWithLabel
          label="Nome da disciplinas"
          placeholder="Ex: Biologia"
          value={nome}
          onChangeText={(text) => setNome(text)}
          keyboardType="default"
        />

        <RadioForm 
          options={radioButtonsEstados}
          selectedValue={estado}
          onValueChange={setEstado}
        />
      </View>
      
      <ButtonPrimary handlePress={handleSubmit}>
        Adicionar disciplina
      </ButtonPrimary>
    </Container>
  );
}