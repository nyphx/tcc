import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateAssunto, deleteAssunto } from './../../services/disciplinasService';

import { 
  RadioForm, 
  Container, 
  Title, 
  TextInputWithLabel,
  ButtonPrimary,
  ButtonDelete,
  ConfirmDeleteModal
} from './../../components';

const AssuntoAlterar = () => {
  const navigation = useNavigation(); 
  const { data, disciplinaId } = useRoute().params; 
  const [modalVisible, setModalVisible] = useState(false);

  const [nome, setNome] = useState(data.nome);
  const [dificuldade, setDificuldade] = useState(data.dificuldade);
  const [estado, setEstado] = useState(data.estado);
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

  const handleUpdateAssunto = async () => {
    if (!validate()) {
      return;
    }

    try {
      const newAssunto = {
        nome: nome,
        dificuldade: dificuldade,
        estado: estado 
      };

      await updateAssunto(disciplinaId, data.id, newAssunto);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating assunto: ', error);
    }
  };

  const handleDeleteAssunto = async () => {
    try {
      await deleteAssunto(disciplinaId, data.id);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting assunto: ', error);
    }
  };

  return (
    <Container>
      <Title>Alterar assunto</Title>

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
      </View>

      <View style={{ gap: 10 }}>
        <ButtonPrimary handlePress={handleUpdateAssunto}>
          Alterar assunto
        </ButtonPrimary>

        <ButtonDelete handlePress={() => setModalVisible(true)}>
          Excluir assunto
        </ButtonDelete>
      </View>

      <ConfirmDeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeleteAssunto}
        title="assunto"
        message="este assunto"
      />
    </Container>
  );
}

export default AssuntoAlterar;
