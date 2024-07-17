import { useState, useEffect } from 'react'

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  db,
  getDoc,
  getDocs,
  doc,
  collection,
} from "../../firebase/firebaseConfig";

import { MaterialIcons } from '@expo/vector-icons';

import Container from '../../components/Container'
import ButtonPrimary from '../../components/ButtonPrimary'
import Info from './components/Info'

const Header = ({ redacao }) => {
  return (
    <View style={styles.header}>
      <Text style={{ fontSize: 20, fontWeight: '600', flex: 1 }}>
        {redacao?.tema}
      </Text>

      <TouchableOpacity 
        style={styles.editButton}
        // onPress={() => navigation.navigate(
          //   'SimuladoAlterar',
          //   { data: simulado }
          // )}
          >
        <MaterialIcons name="edit" size={26} color="#505050" />
      </TouchableOpacity>
    </View>
  )
}

const ItemCompetencia = ({ navigation, competencia, redacaoId }) => {
  return(
    <View>
      <View style={styles.flex}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          Competências {competencia.numeroCompetencia}
        </Text>


        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate(
            'CompetenciaAlterar',
            { data: competencia, redacaoId: redacaoId  }
          )}
        >
          <MaterialIcons name="edit" size={22} color="#505050" />
        </TouchableOpacity>
      </View>

      <Text>Nota: {competencia.notaFinal} / {competencia.notaMaxima}</Text>
      <Text>Descrição da correção: {competencia.descricao}</Text>
    </View>
  )
}

export default RedacaoDetalhes = ({ route, navigation }) => {
  const { id } = route.params

  const [redacao, setRedacao] = useState({});
  const [competencias, setCompetencias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const redacaoRef = doc(db, 'redacoes', id);
        const competenciasRef = collection(db, 'redacoes', id, 'competencias');

        const redacaoSnap = await getDoc(redacaoRef);
        const competenciasSnap = await getDocs(competenciasRef);

        setRedacao({ ...redacaoSnap.data(), id: redacaoSnap.id });
        setCompetencias(competenciasSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, [navigation, id]);

  console.log("reload")

  return (
    <Container>
      <Header redacao={redacao} />

      <View style={{ marginHorizontal: -20 }}>
        <Info redacao={redacao} />
      </View>

      <View>
        <View style={[styles.competenciaHeader, styles.flex]}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            Competências
          </Text>

          <ButtonPrimary 
            handlePress={() => navigation.navigate('CompetenciaForm', { id: id })}
          >
            Adicionar
          </ButtonPrimary>
        </View>

        { competencias.length === 0 &&
          <Text style={{ fontSize: 16, marginTop: 16 }}>
            Você ainda adicionou nenhuma competência.
          </Text>
        }

        { competencias.map((data, index) => (
            <View>
              { index !== 0 &&
                <View style={styles.separator} />
              }

              <ItemCompetencia
                competencia={data} 
                navigation={navigation}
                key={data.id} 
                onPress={{ navigation }} 
                redacaoId={redacao.id}
              />
            </View>
          ))
        }
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  headerContent: {
    gap: 4,
  },
  subTitle: {
    fontSize: 20,
  },
  editButton: {
    padding: 6,
    marginLeft: 4
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
  competenciaHeader: {
    marginTop: 6,
    marginBottom: 20
  },
  separator: {
    width: '100%',
    height: 1.25,
    backgroundColor: '#ccc',
    marginTop: 20,
    marginBottom: 20,
  },
  flex: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  }
});