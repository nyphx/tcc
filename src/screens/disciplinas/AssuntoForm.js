import { useState } from 'react'
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addAssunto } from './../../services/disciplinasService';

import { 
  RadioForm, 
  Container, 
  Title, 
  TextInputWithLabel,
  ButtonPrimary,
} from './../../components'

const AssuntoForm = () => {
  // Hook de navegação para manipular a navegação
  const navigation = useNavigation(); 
  // Obtém o ID da redação dos parâmetros da rota
  const { id } = useRoute().params; 

  const [nome, setNome] = useState('')
  const [dificuldade, setDificuldade] = useState('');
  const [estado, setEstado] = useState('')

  const radioButtonsDificuldades = [
      { id: 0, value: 'Fácil' },
      { id: 1, value: 'Médio' },
      { id: 2, value: 'Difícil' },
  ]

  const radioButtonsEstados = [
      { id: 0, value: 'Estudando' },
      { id: 1, value: 'Finalizado' },
      { id: 2, value: 'Futuro' },
  ]

  const handleSubmit = async () => {
    try {
      const newAssunto = { 
        nome: nome,
        dificuldade: dificuldade,
        estado: estado
      }
      
      await addAssunto(id, newAssunto)
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Adicionar assunto</Title>

      <View>
        <TextInputWithLabel
          label="Nome do assunto"
          placeholder="Ex: Brasil colonial"
          value={nome}
          onChangeText={(text) => setNome(text)}
          keyboardType="default"
        />

        <RadioForm 
          label="Dificuldade"
          options={radioButtonsDificuldades}
          selectedValue={dificuldade}
          onValueChange={setDificuldade}
        />

        <RadioForm 
          label="Estado"
          options={radioButtonsEstados}
          selectedValue={estado}
          onValueChange={setEstado}
        />
      </View>

      <ButtonPrimary handlePress={handleSubmit}>
        Adicionar assunto
      </ButtonPrimary>
    </Container>
  );
}

export default AssuntoForm;