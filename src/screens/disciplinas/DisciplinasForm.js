import { useState } from 'react'
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDisciplina } from './../../services/disciplinasService';

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary,
  RadioForm
} from '../../components';

const DisciplinasForm = () => {
  // Hook de navegação
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [estado, setEstado] = useState("");
  const [errors, setErrors] = useState({ nome: '', estado: '' });

  const radioButtonsEstados = [
    { id: 0, value: 'Estudando' },
    { id: 1, value: 'Parado' },
    { id: 2, value: 'Finalizado' },
    { id: 3, value: 'Futuro' },
  ];

  const validate = () => {
    let valid = true;
    let errors = { nome: '', estado: '' };

    if (!nome) {
      errors.nome = 'Nome é obrigatório';
      valid = false;
    }

    if (!estado) {
      errors.estado = 'Estado é obrigatório';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      const newDisciplina = { 
        nome: nome, 
        estado: estado 
      };

      await addDisciplina(newDisciplina);
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
          errorMessage={errors.nome}
        />

        <RadioForm 
          label="Estado"
          options={radioButtonsEstados}
          selectedValue={estado}
          onValueChange={setEstado}
          errorMessage={errors.estado}
        />
      
        <ButtonPrimary handlePress={handleSubmit}>
          Adicionar disciplina
        </ButtonPrimary>
      </View>
    </Container>
  );
}

export default DisciplinasForm;
