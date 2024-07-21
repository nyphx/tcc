import { useState, useEffect } from 'react'

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import {
  db,
  onSnapshot,
  doc,
} from "../../firebase/firebaseConfig";

import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

import Container from '../../components/Container'
import Title from '../../components/Title'
import Estado from './components/Estado'
import Info from './components/Info'
import ProcessoPaginas from './components/ProcessoPaginas'
import ProcessoCapitulos from './components/ProcessoCapitulos'

export default LeituraDetalhes = ({ route, navigation }) => {
  const { id } = route.params
  const [leitura, setLeitura] = useState({});
  
  useEffect(() => {
    const docRef = doc(db, 'leituras', id);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      setLeitura({ id: docSnap.id, ...docSnap.data() });
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribe();
  }, [id]);

  console.log("reload")

  function calcularPorcentagem(paginasLidas, paginasTotais) {
    if (paginasTotais === 0) {
        return 0;
    }
    return (paginasLidas / paginasTotais) * 100;
}

  return (
    <ScrollView>
      <Container>
        <View style={styles.header}>
          <Title>{leitura.livro}</Title>

          <TouchableOpacity 
              style={styles.editButton}
              onPress={() => navigation.navigate(
                'LeituraAlterar',
                { data: leitura }
              )}
              >
              <MaterialIcons name="edit" size={26} color="#505050" />
          </TouchableOpacity>
        </View>

        <Estado estado={leitura.estado} />
      </Container>
      
      <Info 
        title="Autor"
        info={leitura.autor}
      />

      <Info 
        title="Vestibular"
        info={leitura.vestibular}
      />
      
      <Info 
        title="Início"
        info={leitura.dataInicio}
      />

      <Info 
        title="Termínio"
        info={leitura.dataTerminio}
      />

      { leitura.id && ( // verifica se o id da leitura está definido
        <Container>
            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 18 }}>
              Processo de leitura
            </Text>

            <View>
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                <FontAwesome name="book" size={24} color="black" />
                <Text style={{ fontSize: 18, fontWeight: '600', textTransform: 'uppercase' }}>
                  Páginas
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Progress.Bar 
                    progress={Number(leitura.atualPaginas) / Number(leitura.totalPaginas)} 
                    width={null}
                    height={24}
                    color={'rgba(88, 94, 255, 1)'}
                    unfilledColor={'rgba(217, 217, 217, 1)'}
                    borderWidth={0}
                  />
                </View>

                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 20 }}>
                  {calcularPorcentagem(leitura.atualPaginas, leitura.totalPaginas).toFixed(0)}%
                </Text>
              </View>

              <ProcessoPaginas 
                leitura={leitura}
                atual={leitura.atualPaginas}
                total={leitura.totalPaginas}
              />
            </View>

            <View>
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                <FontAwesome name="book" size={24} color="black" />
                <Text style={{ fontSize: 18, fontWeight: '600', textTransform: 'uppercase' }}>
                  Capítulos
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Progress.Bar 
                    progress={Number(leitura.atualCapitulos) / Number(leitura.totalCapitulos)} 
                    width={null}
                    height={24}
                    color={'rgba(88, 94, 255, 1)'}
                    unfilledColor={'rgba(217, 217, 217, 1)'}
                    borderWidth={0}
                  />
                </View>

                <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 20 }}>
                  {calcularPorcentagem(leitura.atualCapitulos, leitura.totalCapitulos).toFixed(0)}%
                </Text>
              </View>

              <ProcessoCapitulos
                leitura={leitura}
                atual={leitura.atualCapitulos}
                total={leitura.totalCapitulos}
              />
          </View>
        </Container>
      )}
    </ScrollView> 
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  editButton: {
    padding: 6,
  },
});