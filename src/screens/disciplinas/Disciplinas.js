import React, { useState, useCallback } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container, RedirectButton, CountTitle } from '../../components';
import DisciplinaCard from './components/DisciplinaCard';
import { getDisciplinas } from './../../services/disciplinasService';

const DisciplinaSection = ({ 
  title, 
  count, 
  bgColor, 
  textColor, 
  disciplinas
 }) => {
  
  return (
    <View>
      <CountTitle 
        count={count} 
        title={title} 
        bgColor={bgColor} 
        textColor={textColor} 
      />

      {count > 0 ? (
        disciplinas.map(disciplina => (
          <DisciplinaCard 
            key={disciplina.id} 
            disciplina={disciplina} 
          />
        ))
      ) : (
        <Text>Não há disciplinas {title.toLowerCase()}.</Text>
      )}
  </View>
  )
}
  
const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState({
    estudando: [],
    finalizado: [],
    parado: [],
    futuro: []
  });

  const { estudando, finalizado, parado, futuro } = disciplinas;
  
  // Função para buscar dados da redação e seus assuntos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const disciplinasData = await getDisciplinas();
      
      setDisciplinas({
        estudando: disciplinasData.filter(disciplina => disciplina.estado === "Estudando"),
        finalizado: disciplinasData.filter(disciplina => disciplina.estado === "Finalizado"),
        parado: disciplinasData.filter(disciplina => disciplina.estado === "Parado"),
        futuro: disciplinasData.filter(disciplina => disciplina.estado === "Futuro")
      });
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Hook para buscar dados quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { gap: 8 }]}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Erro ao carregar as disciplinas
        </Text>
        <Text style={{ fontSize: 18 }}>
          Por favor, tente novamente
        </Text>
      </View>
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
        
        <RedirectButton screen="DisciplinasForm">
          Adicionar disciplina
        </RedirectButton>
      </View>

      <DisciplinaSection 
        title="Estudando" 
        count={estudando.length} 
        bgColor="#B5E08A" 
        textColor="rgb(2 44 34)" 
        disciplinas={estudando} 
      />

      <DisciplinaSection 
        title="Parado" 
        count={parado.length} 
        bgColor="#E09A8A" 
        textColor="rgb(69 10 10)" 
        disciplinas={parado} 
      />

      <DisciplinaSection 
        title="Futuro" 
        count={futuro.length} 
        bgColor="#ccc" 
        textColor="rgb(8 47 73)" 
        disciplinas={futuro} 
      />

      <DisciplinaSection 
        title="Finalizado" 
        count={finalizado.length} 
        bgColor="#A2B5E6" 
        textColor="rgb(30 41 59)" 
        disciplinas={finalizado} 
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default Disciplinas;
