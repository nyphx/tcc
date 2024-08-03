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
  ButtonDelete,
  ConfirmDeleteModal
} from '../../components';

const SimuladoForm = () => {
  const navigation = useNavigation(); 
  const { id } = useRoute().params; 
  
  const [simulado, setSimulado] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [conteudoFields, setConteudoFields] = useState([
    { id: uuidv4(), nome: '', acertadas: '', totais: '' }
  ]);
  const [errors, setErrors] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const { simulado, conteudos } = await getSimuladoWithConteudos(id);
      setSimulado(simulado);
      setConteudoFields(conteudos);
    } catch (error) {
      console.error('Error fetching simulado: ', error);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const addConteudoField = () => {
    setConteudoFields([...conteudoFields, { id: uuidv4(), nome: '', acertadas: '', totais: '' }]);
  };

  const removeConteudoField = id => {
    setConteudoFields(conteudoFields.filter(field => field.id !== id));
  };

  const handleSimuladoChange = (name, value) => {
    setSimulado({ ...simulado, [name]: value });
  };

  const handleConteudoChange = (id, name, value) => {
    const newFields = conteudoFields.map(field => {
      if (field.id === id) {
        return { ...field, [name]: value };
      }
      return field;
    });
    setConteudoFields(newFields);
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!simulado.nome) {
      errors.nome = 'Nome é obrigatório';
      valid = false;
    }

    if (!simulado.fase) {
      errors.fase = 'Fase é obrigatória';
      valid = false;
    }

    if (!simulado.data) {
      errors.data = 'Data é obrigatória';
      valid = false;
    }

    conteudoFields.forEach(field => {
      if (!field.nome) {
        errors[`${field.id}-nome`] = 'Nome do conteúdo é obrigatório';
        valid = false;
      }

      if (!field.acertadas) {
        errors[`${field.id}-acertadas`] = 'Questões acertadas são obrigatórias';
        valid = false;
      } else if (isNaN(field.acertadas)) {
        errors[`${field.id}-acertadas`] = 'Questões acertadas devem ser um número';
        valid = false;
      }

      if (!field.totais) {
        errors[`${field.id}-totais`] = 'Questões totais são obrigatórias';
        valid = false;
      } else if (isNaN(field.totais)) {
        errors[`${field.id}-totais`] = 'Questões totais devem ser um número';
        valid = false;
      }
    });

    setErrors(errors);
    return valid;
  };

  const handleUpdateSimulado = async () => {
    if (!validate()) {
      return;
    }

    try {
      await updateSimuladoById(id, simulado, conteudoFields);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating simulado: ', error);
    }
  };

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

      <View>
        <TextInputWithLabel
          label="Nome"
          placeholder="Ex: UNESP 2018"
          value={simulado.nome}
          onChangeText={text => handleSimuladoChange('nome', text)}
          keyboardType="default"
          errorMessage={errors.nome}
        />

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Fase"
            placeholder="Ex: 1"
            value={simulado.fase}
            onChangeText={text => handleSimuladoChange('fase', text)}
            keyboardType="default"
            twoColumn={true}
            errorMessage={errors.fase}
          />

          <TextInputWithLabel
            label="Data Realizada"
            placeholder="Ex: 23/03/2023"
            value={simulado.data}
            onChangeText={text => handleSimuladoChange('data', text)}
            keyboardType="default"
            twoColumn={true}
            errorMessage={errors.data}
          />
        </View>
      </View>

      <View style={[styles.flexSpaceBetween, { marginBottom: -20 }]}>
        <Text style={{ fontSize: 22, fontWeight: '600' }}>
          Conteúdos
        </Text>

        <ButtonPrimary handlePress={addConteudoField}>
          Adicionar
        </ButtonPrimary>
      </View>

      {conteudoFields.map((field, index) => (
        <View key={field.id}>
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
              errorMessage={errors[`${field.id}-nome`]}
            />

            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TextInputWithLabel
                label="Questões acertadas"
                placeholder="Ex: 10"
                value={field.acertadas}
                onChangeText={text => handleConteudoChange(field.id, 'acertadas', text)}
                keyboardType="numeric"
                twoColumn={true}
                errorMessage={errors[`${field.id}-acertadas`]}
              />

              <TextInputWithLabel
                label="Questões totais"
                placeholder="Ex: 15"
                value={field.totais}
                onChangeText={text => handleConteudoChange(field.id, 'totais', text)}
                keyboardType="numeric"
                twoColumn={true}
                errorMessage={errors[`${field.id}-totais`]}
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
  flexSpaceBetween: {
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
  removeButton: {
    padding: 10,
  },
});

export default SimuladoForm;
