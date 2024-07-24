import React, { useState, useEffect } from 'react';
import { collection, getDocs, db } from '../../firebase/firebaseConfig';

import {
  Container,
  Header,
  Title,
  RedirectButton,
  CountTitle
} from '../../components';

import Card from './components/Card';

export default Leituras = ({ navigation }) => {
  const [leituras, setLeituras] = useState({
    lendo: [],
    finalizado: [],
    parado: [],
    futuro: []
  });
  
  const { lendo, finalizado, parado, futuro } = leituras;
  const countTotal = lendo.length + finalizado.length + parado.length + futuro.length

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = collection(db, 'leituras');
        const docSnap = await getDocs(docRef);
        const data = docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        
        setLeituras({
          lendo: data.filter(leitura => leitura.estado === "Lendo"),
          finalizado: data.filter(leitura => leitura.estado === "Finalizado"),
          parado: data.filter(leitura => leitura.estado === "Parado"),
          futuro: data.filter(leitura => leitura.estado === "Futuro")
        });
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
          count={countTotal}
          bgColor="rgb(191 219 254)"
          textColor="rgb(29 78 216)"
          />

        <RedirectButton screen="LeiturasForm">
          Adicionar leitura
        </RedirectButton>
      </Header>

      <CountTitle 
        title="Lendo"
        count={lendo.length}
        bgColor="#B5E08A"
        textColor="rgb(2 44 34)"
      />

      {
        lendo.length !== 0 ?
        lendo.map(data => (
          <Card 
            leitura={data} 
            key={data.id} 
            onPress={{ navigation }} 
          />
        )) :
        <TextPrimary>Não há livro sendo lido.</TextPrimary>
      }

      <CountTitle 
        title="Parado"
        count={parado.length}
        bgColor="#E09A8A"
        textColor="rgb(69 10 10)"
      />

      {
        parado.length !== 0 ?
        parado.map(data => (
          <Card 
            leitura={data} 
            key={data.id} 
            onPress={{ navigation }} 
          />
        )) :
        <TextPrimary>Não há livro parado.</TextPrimary>
      }

      <CountTitle 
        title="Futuro"
        count={futuro.length}
        bgColor="#ccc"
        textColor="rgb(8 47 73)"
      />

      {
        futuro.length !== 0 ?
        futuro.map(data => (
          <Card 
            leitura={data} 
            key={data.id} 
            onPress={{ navigation }} 
          />
        )) :
        <TextPrimary>Não há livro parado.</TextPrimary>
      }

      <CountTitle 
        title="Finalizado"
        count={finalizado.length}
        bgColor="#A2B5E6"
        textColor="rgb(30 41 59)"
      />

      {
        finalizado.length !== 0 ?
        finalizado.map(data => (
          <Card 
            leitura={data} 
            key={data.id} 
            onPress={{ navigation }} 
          />
        )) :
        <TextPrimary>Não há livro finalizado.</TextPrimary>
      }
    </Container>
  );
};