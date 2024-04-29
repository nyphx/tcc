import { useEffect, useState } from 'react'

import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  Button,
  Pressable,
  RefreshControl
} from 'react-native';

import { 
  db, 
  collection, 
  query,
  getDocs,
  addDoc
} from "../../firebase/firebaseConfig";

import Typography from '../../styles/typography';

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

  console.log(disciplinas)

  // adiciona uma nova diciplina
  useEffect(() => {
    const adicionarDisciplina = async () => {
      if (route.params?.nome) {
        await addDoc(collection(db, "disciplinas"), {
          nome: route.params?.nome,
          estado: "nenhum",
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
          <Text style={[Typography.titulo, { marginBottom: 10 }]}>
            Disciplinas
          </Text>

          <Button 
            title="Adicionar disciplina"
            onPress={() => navigation.navigate('DisciplinasForm')}
          />
        </View>

        <View>
          <Text style={[Typography.subtitulo, { marginBottom: 10 }]}>
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
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 70,
    gap: 20
  }
});