import { useState, useCallback } from 'react';
import { getSimuladoById } from './../../services/simuladosService';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  Title,
  calculatePercentage
} from '../../components';

import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

const Disciplina = ({ disciplina, dados }) => {
  return (
    <View key={disciplina}>
      <Text style={styles.conteudoTitulo}>
        {disciplina}
      </Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Progress.Bar 
            progress={dados.acertadas / dados.totais} 
            width={null}
            height={24}
            color={'rgba(88, 94, 255, 1)'}
            unfilledColor={'rgba(217, 217, 217, 1)'}
            borderWidth={0}
          />
        </View>

        <Text style={styles.progressPercentage}>
          {calculatePercentage(dados.totais, dados.acertadas)}%
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Info 
          title="Acertos"
          info={`${dados.acertadas} questões`}
        />

        <Info 
          title="Total"
          info={`${dados.totais} questões`}
        />  
      </View>
    </View>
  );
};

// Função para renderizar os conteúdos do simulado.
const RenderConteudos = (simulado) => {
  const elementos = [];
  if (simulado.conteudos) {
    for (let disciplina in simulado.conteudos) {
      if (simulado.conteudos.hasOwnProperty(disciplina)) {
        let dados = simulado.conteudos[disciplina];
        elementos.push(
          <Disciplina 
            key={disciplina} 
            disciplina={disciplina} 
            dados={dados}
          />
        );
      }
    }
  }
  return elementos;
};

const SimuladoDetalhes = () => {  
  // Hook para navegação entre telas.
  const navigation = useNavigation(); 
  // Obtém o ID do simulado a partir dos parâmetros da rota.
  const { id } = useRoute().params;

  const [simulado, setSimulado] = useState({});

  // Função para buscar os dados do simulado usando o ID.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const simuladoData = await getSimuladoById(id);
      setSimulado(simuladoData);
    } catch (error) {
      console.error('Error fetching simulado: ', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Hook para buscar dados quando o componente estiver em foco.
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  // Função para calcular o total de acertos e questões.
  const calcularAcertos = (conteudos) => {
    let acertadas = 0;
    let totais = 0;

    if (conteudos) {
      for (let disciplina in conteudos) {
        if (conteudos.hasOwnProperty(disciplina)) {
          let dados = conteudos[disciplina];
          acertadas += Number(dados.acertadas);
          totais += Number(dados.totais);
        }
      }
    }

    return { acertadas, totais };
  };

  // Obtém o total de acertos e questões dos conteúdos do simulado.
  const { acertadas, totais } = calcularAcertos(simulado.conteudos);

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
          Erro ao carregar o simulado
        </Text>
        <Text style={{ fontSize: 18 }}>
          Por favor, tente novamente
        </Text>
      </View>
    );
  }


  return (
    <Container>
      {/* Container para header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Title>{simulado?.nome}</Title>
          <Text style={styles.subTitle}>
            {simulado?.fase}ª fase / dia
          </Text>
        </View>

        <Pressable 
          style={styles.editButton}
          onPress={() => navigation.navigate(
            'SimuladoAlterar',
            { id: simulado.id }
          )}
        >
          <MaterialIcons name="edit" size={26} color="#505050" />
        </Pressable>
      </View>
      
      {/* Condicional para exibir a seção de desempenho 
      somente se houver questões totais */}
      { totais > 0 && (
        /* Container para a seção de desempenho */
        <View style={styles.notaContainer}>
          <Text style={styles.desempenhoTitle}>
            Desempenho
          </Text>
          <Progress.Bar 
            progress={acertadas / totais} 
            width={null}
            height={24}
            color={'rgba(88, 94, 255, 1)'}
            unfilledColor={'rgba(217, 217, 217, 1)'}
            borderWidth={0}
          />

          <View style={styles.desempenhoInfoContainer}>
            <Text style={styles.desempenhoText}>
              Você acertou
            </Text>

            <View style={styles.desempenhoPercentageContainer}>
              <Text style={styles.desempenhoPercentage}>
                {calculatePercentage(totais, acertadas)}%
              </Text>
            </View>

            <Text style={styles.desempenhoText}>
              do simulado.
            </Text>
          </View>
        </View>
      )} 

      {/* Container para exibir informações */}
      <View style={styles.infoContainer}>
        {/* Exibe o número de acertos */}
        <Info 
          title="Acertos"
          info={`${acertadas} questões`}
        />

        {/* Exibe o número total de questões */}
        <Info 
          title="Total"
          info={`${totais} questões`}
        />

        {/* Exibe a data em que o simulado foi realizado */}
        <Info 
          title="Data realizada"
          info={simulado?.data}
        />
      </View>

      {/* Seção de acertos por conteúdo */}
      <View>
        <Text style={styles.acertosTitulo}>
          Acertos por conteúdo
        </Text>
      </View>
      
      {/* Renderiza os conteúdos do simulado com base na função RenderConteudos */}
      {RenderConteudos(simulado)}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContent: {
    gap: 4,
  },
  subTitle: {
    fontSize: 20,
  },
  editButton: {
    padding: 6,
  },
  info: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  notaContainer: {
    backgroundColor: 'white', 
    padding: 20, 
    marginHorizontal: -20,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    marginBottom: -20,
  },
  desempenhoTitle: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  conteudoTitulo: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
  },
  progressPercentage: {
    fontWeight: '700',
    fontSize: 20,
  },
  infoContainer: {
    marginHorizontal: -20,
  },
  desempenhoInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    flexDirection: 'row',
  },
  desempenhoText: {
    fontSize: 18,
  },
  desempenhoPercentageContainer: {
    paddingHorizontal: 8,
  },
  desempenhoPercentage: {
    fontWeight: '700',
    fontSize: 24,
  },
  acertosTitulo: {
    fontSize: 22,
    fontWeight: '600',
  },
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default SimuladoDetalhes;
