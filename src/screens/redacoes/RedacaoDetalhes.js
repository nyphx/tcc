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
import Info from './components/Info'

export default RedacaoDetalhes = ({ route, navigation }) => {
  const { id } = route.params
  const [redacao, setRedacao] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "redacoes", id);
        const docSnap = await getDoc(docRef);
        setRedacao({ ...docSnap.data(), id: docSnap.id });
      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, [navigation, id]);

  console.log("reload")
  console.log(redacao)

  return (
    <Container>
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

      <View style={{ marginHorizontal: -20 }}>
        <Info redacao={redacao} />
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
});