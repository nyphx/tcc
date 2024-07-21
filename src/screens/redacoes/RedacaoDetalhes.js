import { useState, useEffect } from 'react'
import * as Progress from 'react-native-progress';

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
import TextPrimary from '../../components/TextPrimary'
import Info from './components/Info'

const Header = ({ redacao, navigation }) => {
  return (
    <View style={styles.header}>
      <Text style={{ fontSize: 22, fontWeight: '600', flex: 1 }}>
        {redacao?.tema}
      </Text>

      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate(
          'RedacaoAlterar',
          { id: redacao?.id }
        )}
      >
        <MaterialIcons name="edit" size={26} color="#505050" />
      </TouchableOpacity>
    </View>
  )
}

const ItemCompetencia = ({ navigation, competencia, redacaoId }) => {
  return(
    <View>
      <View style={[styles.flex, { marginBottom: 8 }]}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>
          Competência {competencia.numeroCompetencia}
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

      <Progress.Bar 
        progress={Number(competencia.notaFinal) / Number(competencia.notaMaxima)} 
        width={null}
        height={24}
        color={'rgba(88, 94, 255, 1)'}
        unfilledColor={'rgba(217, 217, 217, 1)'}
        borderWidth={0}
      />
      
      <View style={{ marginHorizontal: -20, marginTop: 20 }}>
        <Info 
          title={"Nota tirada"}
          info={competencia.notaFinal}
        />

        <Info 
          title={"Nota máxima"}
          info={competencia.notaMaxima}
        />

        <Info 
          title={"Descrição"}
          info={competencia.descricao}
          twoColumn={false}
        />
      </View>
    </View>
  )
}

const RedacaoDetalhes = ({ route, navigation }) => {
  const { id } = route.params;

  const [redacao, setRedacao] = useState(null);
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
  }, []);

  console.log("reload");

  return (
    <Container>
      <Header 
        redacao={redacao}
        navigation={navigation}
      />

      <View style={{ marginHorizontal: -20 }}>
        <View style={styles.notasContainer}>
          <Text style={styles.notaTitle}>
            Nota da redação
          </Text>

          { redacao &&
            <Progress.Bar 
            progress={Number(redacao.notaFinal) / Number(redacao.notaMaxima)} 
            width={null}
            height={24}
            color={'rgba(88, 94, 255, 1)'}
            unfilledColor={'rgba(217, 217, 217, 1)'}
            borderWidth={0}
            />
          }
        </View>

        <Info 
          title={"Nota final"}
          info={redacao?.notaFinal}
        />

        <Info 
          title={"Nota máxima"}
          info={redacao?.notaMaxima}
        />
        
        <Info 
          title={"Data realizada"}
          info={redacao?.data}
        />
      </View>

      <View>
        <View style={[styles.competenciaHeader, styles.flex]}>
          <Text style={{ fontSize: 24, fontWeight: '600' }}>
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
            <View key={data.id}>
              { index !== 0 &&
                <View style={styles.separator} />
              }

              <ItemCompetencia
                competencia={data} 
                navigation={navigation}
                redacaoId={redacao?.id}
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
  editButton: {
    padding: 6,
    marginLeft: 4,
  },
  competenciaHeader: {
    marginTop: 6,
    marginBottom: 14
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
    marginBottom: 10
  },
  notasContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  }
});

export default RedacaoDetalhes;