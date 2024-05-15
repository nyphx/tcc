import React, { useState, useEffect } from 'react';
import { collection, getDocs, db } from '../../firebase/firebaseConfig';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Title from '../../components/Title';
import CountTitle from '../../components/CountTitle';
import RedirectButton from '../../components/RedirectButton';

import Card from './Card';

export default Leituras = ({ navigation }) => {
  const [leituras, setLeituras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = collection(db, 'leituras');
        const docSnap = await getDocs(docRef);
        setLeituras(docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
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
        <CountTitle 
          title="Leituras Obrigatórias"
          count="34"
        />

        <RedirectButton screen="LeiturasForm">
          Adicionar leitura
        </RedirectButton>
      </Header>

      {
        leituras.map(data => (
          <Card 
            leitura={data} 
            key={data.id} 
            onPress={{ navigation }} 
          />
        ))
      }
    </Container>
  );
};