import * as Progress from 'react-native-progress';
import React, { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { getRedacaoWithCompetencias } from '../../services/redacoesService'; 
import { Pressable, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, ButtonPrimary } from '../../components';
import { MaterialIcons } from '@expo/vector-icons';
import Info from './components/Info';
import ItemCompetencia from './components/ItemCompetencia'; 

const RedacaoDetalhes = () => {
  // Hook de navegação
  const navigation = useNavigation();
  // Obtém o ID da redação dos parâmetros da rota
  const { id } = useRoute().params;

  const [redacao, setRedacao] = useState(null); 
  const [competencias, setCompetencias] = useState([]);

  // Função para buscar dados da redação e suas competências
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { redacao, competencias } = await getRedacaoWithCompetencias(id);
      setRedacao(redacao); 
      setCompetencias(competencias); 
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Usa efeito para buscar dados sempre que o componente ganhar foco
  useFocusEffect(
    useCallback(() => {
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
          Erro ao carregar a redação
        </Text>
        <Text style={{ fontSize: 18 }}>
          Por favor, tente novamente
        </Text>
      </View>
    );
  }

  return (
    <Container>
      <View style={styles.header}> 
        <Text style={styles.headerTitle}>{redacao?.tema}</Text>
        <Pressable
          style={styles.editButton}
          onPress={() => navigation.navigate(
            'RedacaoAlterar',
            { data: redacao } 
          )}
        >
          <MaterialIcons name="edit" size={26} color="#505050" /> 
        </Pressable>
      </View>

      <View style={styles.infoWrapper}> 
        <View style={styles.notasContainer}>
          <Text style={styles.notaTitle}>Nota da redação</Text>
          {redacao &&
            <Progress.Bar
              progress={Number(redacao.notaFinal) / Number(redacao.notaMaxima)}
              width={null}
              height={24}
              color='rgba(88, 94, 255, 1)'
              unfilledColor='rgba(217, 217, 217, 1)'
              borderWidth={0}
            />
          }
        </View>

        <Info title="Nota final" info={redacao?.notaFinal} /> 
        <Info title="Nota máxima" info={redacao?.notaMaxima} /> 
        <Info title="Data realizada" info={redacao?.data} /> 
      </View>

      <View> 
        <View style={[styles.competenciaHeader, styles.flex]}> 
          <Text style={styles.competenciaTitle}>Competências</Text> 
          <ButtonPrimary handlePress={() => navigation.navigate('CompetenciaForm', { id: id })}>
            Adicionar
          </ButtonPrimary>
        </View>
        
        {/* Mensagem se não houver competências */}
        {competencias.length === 0 &&
          <Text style={styles.noCompetenciaText}>
            Você ainda não adicionou nenhuma competência.
          </Text>
        }

        {/* Mapeia competências para renderizar componentes */}
        {competencias.map((data, index) => ( 
          <View key={data.id}>
            {/* Separador entre competências */}
            {index !== 0 && <View style={styles.separator} />}
            {/* Componente de competência */}
            <ItemCompetencia competencia={data} idRedacao={redacao.id} />
          </View>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    flex: 1,
  },
  editButton: {
    padding: 6,
    marginLeft: 4,
  },
  competenciaHeader: {
    marginTop: 6,
    marginBottom: 14,
  },
  separator: {
    width: '100%',
    height: 1.25,
    backgroundColor: '#ccc',
    marginTop: 30,
    marginBottom: 18,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notaTitle: {
    fontSize: 18,
    color: 'rgb(107 114 128)',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 10,
  },
  notasContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  competenciaTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  noCompetenciaText: {
    fontSize: 16,
    marginTop: 16,
  },
  infoWrapper: {
    marginHorizontal: -20,
  },
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default RedacaoDetalhes;
