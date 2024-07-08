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

export default SimuladoDetalhes = ({ route, navigation }) => {
  const { id } = route.params
  const [simulado, setSimulado] = useState(null);
  console.log(simulado)

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
              { data: simulado }
            )}
          >
            <MaterialIcons name="edit" size={26} color="#505050" />
          </TouchableOpacity>
        </View>
      </Container>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Data realizada</Text>
        <TextPrimary>{simulado?.data}</TextPrimary>
      </View>
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