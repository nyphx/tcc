import { useState, useEffect } from 'react'
import { db, doc, getDoc, updateDoc, deleteDoc } from "../../firebase/firebaseConfig";
import { View } from 'react-native';

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary,
  ButtonDelete
} from '../../components';

const RedacaoAlterar = ({ navigation, route }) => {
  const { id } = route.params
  const [redacao, setRedacao] = useState({});

  const handleInputRedacao = (name, value) => {
    setRedacao(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const redacaoRef = doc(db, 'redacoes', id);
        const redacaoSnap = await getDoc(redacaoRef);

        setRedacao({...redacaoSnap.data()});
      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, []);

  const updateRedacao = async () => {
    try {
      const redacaoRef = doc(db, 'redacoes', id);
      
      await updateDoc(redacaoRef, {
        "tema": redacao.tema,
        "notaFinal": redacao.notaFinal,
        "notaMaxima": redacao.notaMaxima,
        "data": redacao.data
      });
      
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRedacao = async () => {
    try {
      const redacaoRef = doc(db, 'redacoes', id);
      await deleteDoc(redacaoRef)
      navigation.navigate('Redacoes')
    } catch (error) {
      console.error(error);
    }
  }

  console.log('reload')

  return (
    <Container>
      <Title>Alterar competência</Title>

      <View>
        <TextInputWithLabel
          label="Tema da redação"
          placeholder="Ex: (FUVEST) Educação básica e formação profissional"
          numberOfLines={3}
          value={redacao.tema}
          onChangeText={text => handleInputRedacao('tema', text)}
          keyboardType="default"
        />

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Nota final"
            placeholder="Ex: 42"
            value={redacao.notaFinal}
            onChangeText={text => handleInputRedacao('notaFinal', text)}
            keyboardType="numeric"
            twoColumn={true}
          />

          <TextInputWithLabel
            label="Nota máxima"
            placeholder="Ex: 50"
            value={redacao.notaMaxima}
            onChangeText={text => handleInputRedacao('notaMaxima', text)}
            keyboardType="numeric"
            twoColumn={true}
          />
        </View>

        <TextInputWithLabel
          label="Data realizada"
          placeholder="Ex: 23/03/2024"
          value={redacao.data}
          onChangeText={text => handleInputRedacao('data', text)}
          keyboardType="default"
        />
      </View>

      <ButtonPrimary handlePress={updateRedacao}>
        Alterar
      </ButtonPrimary>

      <ButtonDelete handlePress={deleteRedacao}>
        Excluir
      </ButtonDelete>
    </Container>
  );
};

export default RedacaoAlterar;
