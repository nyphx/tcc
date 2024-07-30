import React, { useState, useCallback } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import { 
  deleteDisciplina,
  updateDisciplina,
  getDisciplinaDetalhes 
} from './../../services/disciplinasService';

const DisciplinaAlterar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  
  console.log(id)
  const [nome, setNome] = useState('')
  const [estado, setEstado] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const radioButtonsEstados = [
    { id: 0, value: 'Estudando' },
    { id: 1, value: 'Parado' },
    { id: 2, value: 'Finalizado' },
    { id: 3, value: 'Futuro' },
  ]

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching data...');
      const disciplinaDetalhes = await getDisciplinaDetalhes(id);
      setNome(disciplinaDetalhes.nome);
      setEstado(disciplinaDetalhes.estado);
    } catch (err) {
      console.error('Error fetching disciplina details:', err.message);
      setError('Erro ao carregar detalhes da disciplina. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData().catch(err => {
        // Tratar erro se necessário
        console.error('Error in fetchData:', err.message);
      });
    }, [fetchData])
  );


  // Exclui a disciplina do banco de dados
  const handleDeleteDisciplina = async () => {
    try {
      await deleteDisciplina(id);
      navigation.navigate('Disciplinas');
    } catch (error) {
      console.error('Error deleting disciplina: ', error);
    }
  };

  // Atualiza a disciplina
  const handleUpdateDisciplina = async () => {
    try {
      await updateDisciplina(id, { nome, estado });
      navigation.goBack();
    } catch (error) {
      console.error('Error updating disciplina: ', error);
    }
  };


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Alterar disciplina
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Nome da disciplina
          </Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
            placeholder="Ex: Biologia"
            onChangeText={(text) => setNome(text)}
            value={nome}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Estado
          </Text>
          {radioButtonsEstados.map((item) => {
            return (
              <Pressable 
                onPress={() => setEstado(item.value)}
                key={item.id}
                style={{
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                  backgroundColor: item.value === estado ? '#ddd' : '#fff',
                  borderWidth: 1,
                  borderColor: '#ccc'
                }}
              >
                <Text 
                  style={{
                    color: item.value === estado ? '#000' : '#888',
                    fontSize: 16
                  }}
                >
                  {item.value}
                </Text>
              </Pressable>
            )
          })}

          <Text>User option: {estado}</Text>
        </View>
      </View>
      
      <View style={{ gap: 10 }}>
        <Pressable 
          style={{
            backgroundColor: '#007BFF',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center'
          }}
          onPress={() => handleUpdateDisciplina()}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>
            Alterar disciplina
          </Text>
        </Pressable>

        <Pressable 
          style={{
            backgroundColor: '#dc3545',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center'
          }}
          onPress={() => handleDeleteDisciplina()}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>
            Excluir disciplina
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default DisciplinaAlterar