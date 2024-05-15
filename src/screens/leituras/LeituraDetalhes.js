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
        <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate(
              'LeituraAlterar',
              { data: leitura }
            )}
          >
            <MaterialIcons name="edit" size={26} color="#505050" />
        </TouchableOpacity>
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