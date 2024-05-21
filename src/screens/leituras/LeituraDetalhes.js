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
  getDoc,
  doc,
} from "../../firebase/firebaseConfig";

import { MaterialIcons } from '@expo/vector-icons';

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
    const fetchData = async () => {
      try {
        const docRef = doc(db, "leituras", id);
        const docSnap = await getDoc(docRef);
        setLeitura({ id: docSnap.id, ...docSnap.data() });
      } catch (error) {
        console.error(error);
      }
    };
    
    return navigation.addListener('focus', fetchData);
  }, [navigation, id]);

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
      
      <Info livro={leitura} />

      <Container>
        <View style={{ marginTop: -30 }}>
          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 18 }}>
            Processo de leitura
          </Text>

          <View style={{ flexDirection: 'row', gap: 18 }}>
            <ProcessoPaginas
              id={leitura.id}
              atualPaginas={leitura.atualPaginas}
              totalPaginas={leitura.totalPaginas}
              />

            <ProcessoCapitulos
              id={leitura.id}
              atualCapitulos={leitura.atualCapitulos}
              totalCapitulos={leitura.totalCapitulos}
              />
          </View>
        </View>
      </Container>
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