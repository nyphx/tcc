import { useState } from 'react';
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

  const handleUpdateAssunto = async () => {
    try {
      const newAssunto = {
        nome: nome,
        dificuldade: dificuldade,
        estado: estado 
      };

      await updateAssunto(disciplinaId, data.id, newAssunto);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating disciplina: ', error);
    }
  };

  const handleDeleteAssunto = async () => {
    try {
      await deleteAssunto(disciplinaId, data.id);
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting disciplina: ', error);
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
