import { useState, useEffect } from 'react'
import { db, doc, getDoc, updateDoc, deleteDoc } from "../../firebase/firebaseConfig";
import { v4 as uuidv4 } from 'uuid';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import ButtonPrimary from '../../components/ButtonPrimary'

import { AntDesign } from '@expo/vector-icons';

const SimuladoForm = ({ navigation, route }) => {
  const { id } = route.params;

  const [simulado, setSimulado] = useState({});

  const [conteudoFields, setConteudoFields] = useState([
    { id: uuidv4(), nome: '', acertadas: '', totais: '' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const simuladoRef = doc(db, 'simulados', id);
        const simuladoSnap = await getDoc(simuladoRef);

        setSimulado({...simuladoSnap.data()});

        const conteudosArray = Object
          .keys(simuladoSnap.data().conteudos || {})
          .map(key => ({
            id: uuidv4(),
            nome: key,
            acertadas: simuladoSnap.data().conteudos[key].acertadas,
            totais: simuladoSnap.data().conteudos[key].totais
          }));

        setConteudoFields(conteudosArray);

      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, []);

  console.log(simulado)

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

  const updateSimulado = async () => {
    try {
      const simuladoRef = doc(db, 'simulados', id);

      const conteudos = conteudoFields.reduce((acc, field) => {
        acc[field.nome] = {
          acertadas: field.acertadas,
          totais: field.totais
        };
        return acc;
      }, {});

      const simuladoData = {
        ...simulado,
        conteudos
      };

      await updateDoc(simuladoRef, simuladoData);

      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSimulado = async () => {
    try {
      const simuladoRef = doc(db, 'simulado', id);
      await deleteDoc(simuladoRef);
      navigation.navigate('Simulados');
    } catch (error) {
      console.error(error);
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

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Nota Final"
            placeholder="Ex: 70"
            value={simulado.notaFinal}
            onChangeText={text => handleSimuladoChange('notaFinal', text)}
            keyboardType="numeric"
            twoColumn={true}
          />

          <TextInputWithLabel
            label="Nota Máxima"
            placeholder="Ex: 90"
            value={simulado.notaMaxima}
            onChangeText={text => handleSimuladoChange('notaMaxima', text)}
            keyboardType="numeric"
            twoColumn={true}
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

          <View style={{ marginTop: 26 }}>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeConteudoField(field.id)}
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>

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

      <ButtonPrimary handlePress={updateSimulado}>Alterar</ButtonPrimary>

      <ButtonDelete handlePress={deleteSimulado}>Excluir</ButtonDelete>
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
  removeButton: {
    position: 'absolute',
    right: 0,
    top: -6
  }
});

export default SimuladoForm;
