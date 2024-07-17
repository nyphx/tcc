import { useState, useEffect } from 'react'
import { db, collection, addDoc } from "../../firebase/firebaseConfig";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; 

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import ButtonPrimary from '../../components/ButtonPrimary'
import ButtonDelete from '../../components/ButtonDelete'

const CompetenciaAlterar = ({ navigation, route }) => {
  const { redacaoId, data } = route.params
  const [competencia, setCompetencia] = useState({});

  console.log(redacaoId)
  console.log(data)

  const handleInputCompetencia = (name, value) => {
    setCompetencia(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const competenciaRef = collection(db, 'redacoes', redacaoId, 'competencias', data.id);
        const competenciaSnap = await getDoc(competenciaRef);
        setCompetencia(competenciaSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, []);

  const handleSubmit = async () => {
    try {
      console.log("ok")
      
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
  };

  console.log('reload')

  return (
    <Container>
      <Title>Alterar competência</Title>

      <View>
        <TextInputWithLabel
          label="Número da competência"
          placeholder="Ex: 1"
          value={competencia.numeroCompetencia}
          onChangeText={text => handleInputCompetencia('numeroCompetencia', text)}
          keyboardType="numeric"
        />

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Nota final"
            placeholder="Ex: 2"
            value={competencia.notaFinal}
            onChangeText={text => handleInputCompetencia('notaFinal', text)}
            keyboardType="numeric"
            twoColumn={true}
          />

          <TextInputWithLabel
            label="Nota máxima"
            placeholder="Ex: 10"
            value={competencia.notaMaxima}
            onChangeText={text => handleInputCompetencia('notaMaxima', text)}
            keyboardType="numeric"
            twoColumn={true}
          />
        </View>

        <TextInputWithLabel
          label="Descrição"
          placeholder="Ex: Estrutura sintática excelente e, no máximo, dois desvios"
          value={competencia.descricao}
          onChangeText={text => handleInputCompetencia('descricao', text)}
          keyboardType="default"
          numberOfLines={3}
        />
      </View>

      <ButtonPrimary handlePress={handleSubmit}>
        Alterar
      </ButtonPrimary>

      <ButtonDelete>
        Excluir
      </ButtonDelete>
    </Container>
  );
};

const styles = StyleSheet.create({
  competenciaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  competenciaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  separator: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginBottom: 20,
    marginTop: 10,
  }
});

export default CompetenciaAlterar;
