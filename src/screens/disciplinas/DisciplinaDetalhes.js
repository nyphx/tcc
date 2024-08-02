import React, { useState, useCallback } from 'react';
import { useFocusEffect,useNavigation, useRoute } from '@react-navigation/native';
import { getAssuntosByDisciplinaId, getDisciplinaById } from './../../services/disciplinasService';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Container, Title, CountTitle, ButtonPrimary } from "./../../components";
import { MaterialIcons } from '@expo/vector-icons';

const Assunto = ({ assunto, disciplinaId }) => {
  // Hook de navegação
  const navigation = useNavigation();
  
  return (
    <Pressable 
      style={styles.assuntosItem}
      onPress={() => navigation.navigate(
        'AssuntoAlterar', 
        { assuntoId: assunto.id, disciplinaId: disciplinaId, }
      )}
    >
      <Text style={styles.assuntosItemText}>
        {assunto.nome}
      </Text>
    </Pressable>
  )
}

const Estado = ({ children, estado }) => {
  const getColor = (estado) => {
    switch (estado) {
      case "Estudando":
        return { background: "#B5E08A", text: "rgb(2 44 34)" };
      case "Parado":
        return { background: "#E09A8A", text: "rgb(69 10 10)" };
      case "Finalizado":
        return { background: "#A2B5E6", text: "rgb(8 47 73)" };
      default:
        return { background: "#ccc", text: "rgb(30 41 59)" };
    }
  };

  const { background, text } = getColor(estado);

  return (
    <Text style={[styles.estado, { backgroundColor: background, color: text }]}>
      {children}
    </Text>
  );
};

const DisciplinaDetalhes = () => {
  // Hook de navegação
  const navigation = useNavigation();
  // Obtém o ID da redação dos parâmetros da rota
  const { id } = useRoute().params;

  const [disciplina, setDisciplina] = useState({})

  const [assuntos, setAssuntos] = useState({
    estudando: [],
    finalizado: [],
    futuro: []
  });

  const { estudando, finalizado, futuro } = assuntos;

  // Função para buscar dados da redação e seus assuntos
  const fetchData = useCallback(async () => {
    try {
      const disciplinaData = await getDisciplinaById(id);
      setDisciplina(disciplinaData)
      
      const assuntosData = await getAssuntosByDisciplinaId(id);
      setAssuntos({
        estudando: assuntosData.filter(assunto => assunto.estado === "Estudando"),
        finalizado: assuntosData.filter(assunto => assunto.estado === "Finalizado"),
        futuro: assuntosData.filter(assunto => assunto.estado === "Futuro")
      });
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const renderAssuntos = (assuntos, title, bgColor, textColor) => (
    <View>
      <CountTitle 
        count={assuntos.length} 
        title={title} 
        bgColor={bgColor} 
        textColor={textColor} 
      />

      { 
        assuntos.length !== 0 ?
        assuntos.map(item => (
          <Assunto 
            key={item.id} 
            disciplinaId={id}
            assunto={item}
          />
        )) :
        <Text style={styles.estadoText}>
          Não há assuntos {title.toLowerCase()}.
        </Text>
      }
    </View>
  );

  return (
    <Container>
      <View style={styles.flex}>
        <Title>{disciplina.nome}</Title>
        
        <Pressable 
          style={styles.editButton}
          onPress={() => navigation.navigate(
            'DisciplinaAlterar',
            { data: disciplina }
          )}
        >
          <MaterialIcons name="edit" size={26} color="#505050" />
        </Pressable>
      </View>

      <Estado estado={disciplina.estado}>
        {disciplina.estado}
      </Estado>

      <View style={styles.flex}>
        <Text style={{ fontSize: 22, fontWeight: '600' }}>
          Assuntos
        </Text>
        <ButtonPrimary handlePress={() => navigation.navigate('AssuntoForm', { id: id })}>
          Adicionar
        </ButtonPrimary>
      </View>

      <View style={{ gap: 20 }}>
        {renderAssuntos(estudando, "Estudando", "#B5E08A", "rgb(2 44 34)")}
        {renderAssuntos(futuro, "Futuro", "#ccc", "rgb(8 47 73)")}
        {renderAssuntos(finalizado, "Finalizado", "#A2B5E6", "rgb(30 41 59)")}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  assuntosItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f1f1'
  },
  assuntosItemText: {
    fontSize: 18,
  },
  estado: {
    textAlign: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    fontSize: 18,
    fontWeight: "500"
  },
  estadoText: {
    fontSize: 16,
    color: '#505050',
    textAlign: 'center',
    marginTop: 10
  }
});

export default DisciplinaDetalhes;
