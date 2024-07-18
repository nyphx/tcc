import React, { useState, useEffect } from 'react';
import { collection, getDocs, db } from '../../firebase/firebaseConfig';

import { Text } from 'react-native';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Title from '../../components/Title';
import RedirectButton from '../../components/RedirectButton';
import Card from './components/Card'

const Redacao = ({ navigation }) => {
  console.log("reload")
 
  const [redacoes, setRedacoes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = collection(db, 'redacoes');
        const docSnap = await getDocs(docRef);

        setRedacoes(docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, [navigation]);

  return (
    <Container>
      <Header>
        <Title>Redações</Title>

        <RedirectButton screen="RedacoesForm">
          Adicionar redação
        </RedirectButton>
      </Header>

      { redacoes.length === 0 &&
        <Text style={{ fontSize: 16, marginTop: 16 }}>
          Você ainda adicionou nenhuma redação.
        </Text>
      }

      {
        redacoes.map(data => (
          <Card 
            redacao={data} 
            key={data.id} 
            onPress={{ navigation }} 
          />
        ))
      }
    </Container>
  );
};

export default Redacao;
