import React, { useState } from 'react'
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateDisciplina, deleteDisciplina } from './../../services/disciplinasService';

import { 
  RadioForm, 
  Container, 
  Title, 
  TextInputWithLabel,
  ButtonPrimary,
  ButtonDelete
} from './../../components'

const DisciplinaAlterar = () => {
  // Hook de navegação para manipular a navegação
  const navigation = useNavigation(); 
  // Obtém o ID da redação dos parâmetros da rota
  const { data } = useRoute().params; 

  const [nome, setNome] = useState(data.nome)
  const [estado, setEstado] = useState(data.estado)

  const radioButtonsEstados = [
    { id: 0, value: 'Estudando' },
    { id: 1, value: 'Parado' },
    { id: 2, value: 'Finalizado' },
    { id: 3, value: 'Futuro' },
  ]

  // Atualiza a disciplina
  const handleUpdateDisciplina = async () => {
    try {
      const newDisciplina = {
        nome: nome,
        estado: estado 
      }

      await updateDisciplina(data.id, newDisciplina);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating disciplina: ', error);
    }
  };

  // Exclui a disciplina do banco de dados
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
        />

        <RadioForm 
          label="Estado"
          options={radioButtonsEstados}
          selectedValue={estado}
          onValueChange={setEstado}
        />
      </View>

      <View style={{ gap: 10 }}>
        <ButtonPrimary handlePress={handleUpdateDisciplina}>
          Alterar disciplina
        </ButtonPrimary>

        <ButtonDelete handlePress={handleDeleteDisciplina}>
          Excluir disciplina
        </ButtonDelete>
      </View>
    </Container>
  );
}

export default DisciplinaAlterar