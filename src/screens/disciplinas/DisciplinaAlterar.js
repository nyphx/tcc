import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateDisciplina, deleteDisciplina } from './../../services/disciplinasService';

import { 
  RadioForm, 
  Container, 
  Title, 
  TextInputWithLabel,
  ButtonPrimary,
  ButtonDelete,
  ConfirmDeleteModal
} from './../../components';

const DisciplinaAlterar = () => {
  const navigation = useNavigation(); 
  const { data } = useRoute().params; 

  const [nome, setNome] = useState(data.nome);
  const [estado, setEstado] = useState(data.estado);
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleUpdateDisciplina = async () => {
    if (!validate()) {
      return;
    }

    try {
      const newDisciplina = {
        nome: nome,
        estado: estado 
      };

      await updateDisciplina(data.id, newDisciplina);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating disciplina: ', error);
    }
  };

  const handleDeleteDisciplina = async () => {
    try {
      await deleteDisciplina(data.id);
      navigation.navigate('Disciplinas');
    } catch (error) {
      console.error('Error deleting disciplina: ', error);
    }
  };

  return (
    <Container>
      <Title>Alterar disciplina</Title>

      <View>
        <TextInputWithLabel
          label="Nome da disciplina"
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
      </View>

      <View style={{ gap: 10 }}>
        <ButtonPrimary handlePress={handleUpdateDisciplina}>
          Alterar disciplina
        </ButtonPrimary>

        <ButtonDelete handlePress={() => setModalVisible(true)}>
          Excluir disciplina
        </ButtonDelete>
      </View>

      <ConfirmDeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeleteDisciplina}
        title="disciplina"
        message="esta disciplina"
      />
    </Container>
  );
}

export default DisciplinaAlterar;
