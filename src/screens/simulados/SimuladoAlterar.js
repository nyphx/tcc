import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { AntDesign } from '@expo/vector-icons';

import { 
  getSimuladoWithConteudos, 
  updateSimuladoById, 
  deleteSimuladoById 
} from './../../services/simuladosService';

import {
  Container,
  TextInputWithLabel,
  Title,
  ButtonPrimary,
  ConfirmDeleteModal
} from '../../components';

const SimuladoForm = () => {
  // Hook de navegação para manipular a navegação
  const navigation = useNavigation(); 
  // Obtém o ID da redação dos parâmetros da rota
  const { id } = useRoute().params; 
  
  // states
  const [simulado, setSimulado] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  // Estado para armazenar os campos de conteúdo do simulado
  const [conteudoFields, setConteudoFields] = useState([
    { id: uuidv4(), nome: '', acertadas: '', totais: '' }
  ]);

  // Função para buscar os dados do simulado e seus conteúdos
  const fetchData = useCallback(async () => {
    try {
      const { simulado, conteudos } = await getSimuladoWithConteudos(id);
      setSimulado(simulado);
      setConteudoFields(conteudos);
    } catch (error) {
      console.error('Error fetching simulado: ', error);
    }
  }, [id]);

  // Hook que chama a função fetchData quando a tela ganha o foco
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  // Função para adicionar um novo campo de conteúdo
  const addConteudoField = () => {
    setConteudoFields([...conteudoFields, { id: uuidv4(), nome: '', acertadas: '', totais: '' }]);
  };

  // Função para remover um campo de conteúdo com base no seu ID
  const removeConteudoField = id => {
    setConteudoFields(conteudoFields.filter(field => field.id !== id));
  };

  // Função para atualizar o estado do simulado
  // com base no campo e valor fornecidos
  const handleSimuladoChange = (name, value) => {
    setSimulado({ ...simulado, [name]: value });
  };

  // Função para atualizar o estado dos camposde
  // conteúdo com base no ID do campo, nome e valor
  const handleConteudoChange = (id, name, value) => {
    const newFields = conteudoFields.map(field => {
      if (field.id === id) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setConteudoFields(newFields);
  };

  // Função para atualizar o simulado no backend
  const handleUpdateSimulado = async () => {
    try {
      await updateSimuladoById(id, simulado, conteudoFields);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating simulado: ', error);
    }
  };

  // Função para excluir o simulado do backend
  const handleDeleteSimulado = async () => {
    try {
      await deleteSimuladoById(id);
      navigation.navigate('Simulados');
    } catch (error) {
      console.error('Error deleting simulado: ', error);
    }
  };
  
  return (
    <Container>
      <Title>Alterar simulado</Title>

      {/* Container para os campos de informações do simulado*/}
      <View>
        <TextInputWithLabel
          label="Nome"
          placeholder="Ex: UNESP 2018"
          value={simulado.nome}
          onChangeText={text => handleSimuladoChange('nome', text)}
          keyboardType="default"
        />

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Fase"
            placeholder="Ex: 1"
            value={simulado.fase}
            onChangeText={text => handleSimuladoChange('fase', text)}
            keyboardType="default"
            twoColumn={true}
          />

          <TextInputWithLabel
            label="Data Realizada"
            placeholder="Ex: 23/03/2023"
            value={simulado.data}
            onChangeText={text => handleSimuladoChange('data', text)}
            keyboardType="default"
            twoColumn={true}
          />
        </View>
      </View>

      {/* Header para adicionar um novo campo de conteúdo */}
      <View style={[styles.flexSpaceBetween, { marginBottom: -20 }]}>
        <Text style={{ fontSize: 22, fontWeight: '600' }}>
          Conteúdos
        </Text>

        {/* Botão para adicionar um novo campo de conteúdo */}
        <ButtonPrimary handlePress={addConteudoField}>
          Adicionar
        </ButtonPrimary>
      </View>

      {/* Renderiza os campos de conteúdo */}
      {conteudoFields.map((field, index) => (
        <View key={field.id}>
          {/* Borda para separar os campos de cada conteúdo*/}
          {index !== 0 && <View style={styles.separator} />}

          <View style={styles.removeButtonContainer}>
            <Pressable 
              style={styles.removeButton}
              onPress={() => removeConteudoField(field.id)}
            >
              <AntDesign name="delete" size={24} color="black" />
            </Pressable>
          </View>

          <View style={{ marginTop: -20, zIndex: 0 }}>
            <TextInputWithLabel
              label="Nome"
              placeholder="Ex: Biologia"
              value={field.nome}
              onChangeText={text => handleConteudoChange(field.id, 'nome', text)}
              keyboardType="default"
            />

            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TextInputWithLabel
                label="Questões acertadas"
                placeholder="Ex: 10"
                value={field.acertadas}
                onChangeText={text => handleConteudoChange(field.id, 'acertadas', text)}
                keyboardType="numeric"
                twoColumn={true}
              />

              <TextInputWithLabel
                label="Questões totais"
                placeholder="Ex: 15"
                value={field.totais}
                onChangeText={text => handleConteudoChange(field.id, 'totais', text)}
                keyboardType="numeric"
                twoColumn={true}
              />
            </View>
          </View>
        </View>
      ))}

      <View style={{ marginTop: 16, gap: 16 }}>
        <ButtonPrimary handlePress={handleUpdateSimulado}>
          Alterar
        </ButtonPrimary>

        <ButtonDelete handlePress={() => setModalVisible(true)}>
          Excluir
        </ButtonDelete>
      </View>

      <ConfirmDeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDeleteSimulado}
        title="simulado"
        message="este simulado"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  flexSpaceBetween:{
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  separator: {
    backgroundColor: '#ccc', 
    height: 1, 
    width: '100%',
  },
  removeButtonContainer: {
    alignItems: 'flex-end',
    zIndex: 9999,
    marginTop: 22,
  },
});

export default SimuladoForm;
