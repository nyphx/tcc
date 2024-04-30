import { 
  useEffect, 
  useState 
} from 'react'

import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  Pressable,
} from 'react-native';

import { 
  db, 
  collection, 
  query,
  getDocs,
  addDoc
} from "../../firebase/firebaseConfig";

import { 
  Typography, 
  Buttons, 
  Count,
  General
} from '../../styles/index.js';

const Disciplina = ({ navigation, disciplina }) => {
  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate(
            'DisciplinaDetalhes', 
            { id: disciplina.id }
          )
        }
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          {disciplina.nome}
        </Text>
      </Pressable>
    </View>
  )
}

export default function App({ navigation, route }) {
  // mostra disciplinas 
  const [disciplinas, setDisciplinas] = useState([])

  useEffect(() => {
    const home = navigation.addListener('focus', () => {
      const q = query(collection(db, "disciplinas"));
      
      const getDisciplinas = async () => {
        const querySnapshot = await getDocs(q);
        setDisciplinas(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      
      getDisciplinas(); 
    });

    return home;
  }, [navigation]);

  // adiciona uma nova diciplina
  useEffect(() => {
    const adicionarDisciplina = async () => {
      if (route.params?.nome) {
        await addDoc(collection(db, "disciplinas"), {
          nome: route.params?.nome,
          estado: route.params?.estado,
        });
        
        navigation.navigate('Disciplinas')
      }
    }

    adicionarDisciplina()
  }, [route.params?.nome]);

  console.log("reload")

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 14 }}>
            <View style={styles.countContainer}>
              <Text style={styles.countText}>
                {disciplinas.length}
              </Text>
            </View>
            
            <Text style={styles.titulo}>
              Disciplinas
            </Text>
          </View>

          <Pressable 
            style={styles.buttonPrimary}
            onPress={() => navigation.navigate('DisciplinasForm')}
          >
            <Text style={styles.buttonText}>
              Adicionar disciplina
            </Text>
          </Pressable>
        </View>

        <View>
          <Text style={[styles.subtitulo, { marginBottom: 10 }]}>
            Disciplinas adicionadas
          </Text>

          {
            disciplinas.map((disciplina) => (
              <Disciplina 
                key={disciplina.id}
                navigation={navigation}
                disciplina={disciplina}
              />
            ))
          }
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { ...General.container },
  countContainer: { ...Count.container},
  countText: { ...Count.text},
  titulo: { ...Typography.titulo },
  subtitulo: { ...Typography.subtitulo },
  buttonPrimary: { ...Buttons.primary },
  buttonText: { ...Buttons.text }
});