import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addAssunto } from './../../services/disciplinasService';

import { 
  RadioForm, 
  Container, 
  Title, 
  TextInputWithLabel,
  ButtonPrimary
} from './../../components';

const AssuntoForm = () => {
  const navigation = useNavigation(); 
  const { id } = useRoute().params; 

  const [nome, setNome] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [estado, setEstado] = useState('');
  const [errors, setErrors] = useState({ nome: '', dificuldade: '', estado: '' });

  const radioButtonsDificuldades = [
    { id: 0, value: 'Fácil' },
    { id: 1, value: 'Médio' },
    { id: 2, value: 'Difícil' },
  ];

  const radioButtonsEstados = [
    { id: 0, value: 'Estudando' },
    { id: 1, value: 'Finalizado' },
    { id: 2, value: 'Futuro' },
  ];

  const validate = () => {
    let valid = true;
    let errors = { nome: '', dificuldade: '', estado: '' };

    if (!nome) {
      errors.nome = 'Nome é obrigatório';
      valid = false;
    }

    if (!dificuldade) {
      errors.dificuldade = 'Dificuldade é obrigatória';
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
      const newAssunto = { 
        nome: nome,
        dificuldade: dificuldade,
        estado: estado
      };
      
      await addAssunto(id, newAssunto);
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
          errorMessage={errors.nome}
        />

        <RadioForm 
          label="Dificuldade"
          options={radioButtonsDificuldades}
          selectedValue={dificuldade}
          onValueChange={setDificuldade}
          errorMessage={errors.dificuldade}
        />

        <RadioForm 
          label="Estado"
          options={radioButtonsEstados}
          selectedValue={estado}
          onValueChange={setEstado}
          errorMessage={errors.estado}
        />

        <ButtonPrimary handlePress={handleSubmit}>
          Adicionar assunto
        </ButtonPrimary>
      </View>
    </Container>
  );
}

export default AssuntoForm;
