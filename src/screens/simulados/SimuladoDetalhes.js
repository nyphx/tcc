import { useState, useEffect } from 'react'
import * as Progress from 'react-native-progress';
import { MaterialIcons } from '@expo/vector-icons';
import Container from '../../components/Container'

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
  return (
    <View key={disciplina}>
      <Text style={{ fontSize: 20, textTransform: 'uppercase', marginBottom: 8 }}>
        {disciplina}
      </Text>

      <Progress.Bar 
        progress={dados.acertadas / dados.totais} 
        width={null}
        height={24}
        color={'rgba(88, 94, 255, 1)'}
        unfilledColor={'rgba(217, 217, 217, 1)'}
        borderWidth={0}
      />

      <Text>Acertadas: {dados.acertadas}</Text>
      <Text>Totais: {dados.totais}</Text>
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
    <ScrollView>
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
          <Progress.Bar 
            progress={acertadas / totais} 
            width={null}
            height={24}
            color={'rgba(88, 94, 255, 1)'}
            unfilledColor={'rgba(217, 217, 217, 1)'}
            borderWidth={0}
          />
        )}
      </Container>

      <Info 
        title="Data realizada"
        info={simulado?.data}
      />

      
      <Container>
        <View style={{ marginTop: -34 }}>
          <Text style={{ fontSize: 22, fontWeight: '600' }}>
            Acertos por conteúdo
          </Text>
        </View>
        
        {RenderConteudos(simulado)}
      </Container>
    </ScrollView> 
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
});