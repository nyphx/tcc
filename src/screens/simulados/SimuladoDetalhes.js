import { useState, useCallback } from 'react';
import { getSimuladoById } from './../../services/simuladosService';
import { useFocusEffect } from '@react-navigation/native';
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

const SimuladoDetalhes = ({ route, navigation }) => {
  const { id } = route.params;
  const [simulado, setSimulado] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const simuladoData = await getSimuladoById(id);
      setSimulado(simuladoData);
    } catch (error) {
      console.error('Error fetching simulado: ', error);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

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

  const { acertadas, totais } = calcularAcertos(simulado.conteudos);

  return (
    <Container>
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

      { totais > 0 && (
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
    
      <View style={styles.infoContainer}>
        <Info 
          title="Acertos"
          info={`${acertadas} questões`}
        />

        <Info 
          title="Total"
          info={`${totais} questões`}
        />

        <Info 
          title="Data realizada"
          info={simulado?.data}
        />
      </View>

      <View>
        <Text style={styles.acertosTitulo}>
          Acertos por conteúdo
        </Text>
      </View>
      
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
});

export default SimuladoDetalhes;
