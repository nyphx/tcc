import { useState, useEffect } from 'react'
import * as Progress from 'react-native-progress';

import { MaterialIcons } from '@expo/vector-icons';

import {
  Container,
  Title,
  ButtonEdit
} from '../../components';

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import {
  db,
  getDoc,
  doc,
} from "../../firebase/firebaseConfig";

const Disciplina = ({ disciplina, dados }) => {
  function calcularPorcentagem(acertos, totais) {
    if (totais === 0) {
        return 0;
    }
    return (acertos / totais) * 100;
  } 

  return (
    <View key={disciplina}>
      <Text style={styles.conteudoTitulo}>
        {disciplina}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <Progress.Bar 
            progress={dados.acertadas / dados.totais} 
            width={null}
            height={24}
            color={'rgba(88, 94, 255, 1)'}
            unfilledColor={'rgba(217, 217, 217, 1)'}
            borderWidth={0}
          />
        </View>

        <Text style={{ fontWeight: '700', fontSize: 20 }}>
          {calcularPorcentagem(dados.acertadas, dados.totais).toFixed()}%
        </Text>
      </View>

      <View style={{ marginHorizontal: -20 }}>
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

export default SimuladoDetalhes = ({ route, navigation }) => {
  const { id } = route.params
  const [simulado, setSimulado] = useState({});

  const calcularAcertos = (conteudos) => {
    let acertadas = 0;
    let totais = 0;

    if (conteudos) {
      for (let disciplina in conteudos) {
        if (conteudos.hasOwnProperty(disciplina)) {
          let dados = conteudos[disciplina];
          acertadas += Number(dados["acertadas"]);
          totais += Number(dados["totais"]);
        }
      }
    }

    return { acertadas, totais };
  };

  const { acertadas, totais } = calcularAcertos(simulado.conteudos);

  function calcularPorcentagem(acertos, totais) {
    if (totais === 0) {
        return 0;
    }
    return (acertos / totais) * 100;
  } 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "simulados", id);
        const docSnap = await getDoc(docRef);
        setSimulado({ ...docSnap.data(), id: docSnap.id });
      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, [navigation, id]);

  console.log("reload")

  return (
    <Container>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Title>{simulado?.nome}</Title>
          <Text style={styles.subTitle}>
            {simulado?.fase}ª fase / dia
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate(
            'SimuladoAlterar',
            { id: simulado.id }
          )}
        >
          <MaterialIcons name="edit" size={26} color="#505050" />
        </TouchableOpacity>
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

          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 14 , flexDirection: 'row'}}>
            <Text style={{ fontSize: 18 }}>
              Você acertou
            </Text>

            <View style={{ paddingHorizontal: 8 }}>
              <Text style={{ fontWeight: '700', fontSize: 24 }}>
                {calcularPorcentagem(acertadas, totais).toFixed()}%
              </Text>
            </View>

            <Text style={{ fontSize: 18 }}>
              do simulado.
            </Text>
          </View>
        </View>
      )} 
    
      <View style={{ marginHorizontal: -20 }}>
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
        <Text style={{ fontSize: 22, fontWeight: '600' }}>
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
    backgroundColor: 'white', padding: 20, marginHorizontal: -20,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    marginBottom: -20
  },
  desempenhoTitle: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10
  }, 
  conteudoTitulo: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 8
  }
});