import React, { useState, useEffect } from 'react';
import { collection, getDocs, db } from '../../firebase/firebaseConfig';

import {
  Container,
  Header,
  Title,
  RedirectButton
} from '../components';

import Card from './components/Card';

const Simulados = ({ navigation }) => {
  const [simulados, setSimulados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = collection(db, 'simulados');
        const docSnap = await getDocs(docRef);
        setSimulados(docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, [navigation]);

  console.log("reload")

  return (
    <Container>
      <Header>
        <Title>Simulados</Title>

        <RedirectButton screen="SimuladosForm">
          Adicionar simulado
        </RedirectButton>
      </Header>

      {
        simulados.map(data => (
          <Card 
          simulado={data} 
          key={data.id} 
          onPress={{ navigation }} 
          />
        ))
      }
    </Container>
  );
};

export default Simulados;
