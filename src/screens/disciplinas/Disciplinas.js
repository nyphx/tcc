import React, { useState, useCallback } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container, RedirectButton, CountTitle } from '../../components';
import DisciplinaCard from './components/DisciplinaCard';
import { getDisciplinas } from './../../services/disciplinasService';

const DisciplinaSection = ({ title, count, bgColor, textColor, disciplinas, navigation }) => (
  <View>
    <CountTitle count={count} title={title} bgColor={bgColor} textColor={textColor} />
    {count > 0 ? (
      disciplinas.map(disciplina => (
        <DisciplinaCard key={disciplina.id} navigation={navigation} disciplina={disciplina} />
      ))
    ) : (
      <Text>Não há disciplinas {title.toLowerCase()}.</Text>
    )}
  </View>
);

const Disciplinas = ({ navigation }) => {
  const [disciplinas, setDisciplinas] = useState({
    estudando: [],
    finalizado: [],
    parado: [],
    futuro: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching data...');
      const disciplinasData = await getDisciplinas();
      
      setDisciplinas({
        estudando: disciplinasData.filter(disciplina => disciplina.estado === "Estudando"),
        finalizado: disciplinasData.filter(disciplina => disciplina.estado === "Finalizado"),
        parado: disciplinasData.filter(disciplina => disciplina.estado === "Parado"),
        futuro: disciplinasData.filter(disciplina => disciplina.estado === "Futuro")
      });
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError('Erro ao carregar disciplinas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const { estudando, finalizado, parado, futuro } = disciplinas;

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text>{error}</Text>
      </Container>
    );
  }

  return (
    <Container>
      <View style={{ marginBottom: 8 }}>
        <CountTitle 
          count={estudando.length + finalizado.length + parado.length + futuro.length}
          title="Disciplinas"
          bgColor="rgb(191 219 254)"
          textColor="rgb(29 78 216)"
        />
        
        <RedirectButton screen="DisciplinasForm">Adicionar disciplina</RedirectButton>
      </View>

      <DisciplinaSection 
        title="Estudando" 
        count={estudando.length} 
        bgColor="#B5E08A" 
        textColor="rgb(2 44 34)" 
        disciplinas={estudando} 
        navigation={navigation} 
      />

      <DisciplinaSection 
        title="Parado" 
        count={parado.length} 
        bgColor="#E09A8A" 
        textColor="rgb(69 10 10)" 
        disciplinas={parado} 
        navigation={navigation} 
      />

      <DisciplinaSection 
        title="Futuro" 
        count={futuro.length} 
        bgColor="#ccc" 
        textColor="rgb(8 47 73)" 
        disciplinas={futuro} 
        navigation={navigation} 
      />

      <DisciplinaSection 
        title="Finalizado" 
        count={finalizado.length} 
        bgColor="#A2B5E6" 
        textColor="rgb(30 41 59)" 
        disciplinas={finalizado} 
        navigation={navigation} 
      />
    </Container>
  );
}

export default Disciplinas;
