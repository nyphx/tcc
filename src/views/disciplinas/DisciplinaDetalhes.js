import { useEffect, useState } from 'react'

import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  Pressable
} from 'react-native';

import { 
  db, 
  collection, 
  getDoc,
  addDoc,
  doc,
  getDocs,
  query
} from "../../firebase/firebaseConfig";

import { 
  Typography, 
  Buttons, 
  Count,
  General
} from '../../styles/index.js';

const Assunto = ({ navigation, assunto, disciplinaId }) => {
  return (
    <Pressable 
      style={styles.assuntosItem}
      onPress={() => navigation.navigate(
        'AssuntoAlterar', 
        { 
          assuntoId: assunto.id,
          disciplinaId: disciplinaId,
        }
      )}
    >
      <Text>{assunto.nome}</Text>
    </Pressable>
  )
}

export default function App({ navigation, route }) {
  console.log('reload')

  const { id } = route.params
  const [detalhes, setDetalhes] = useState({})
  const [assuntos, setAssuntos] = useState([])

  useEffect(() => {
    const home = navigation.addListener('focus', () => {
      const getDisciplina = async () => {
        // obtem disciplina do banco de dados
        const disciplinaRef = doc(db, "disciplinas", id);
        const disciplinaSnap = await getDoc(disciplinaRef);
        
        setDetalhes(disciplinaSnap.data())
        
        // obtem os assuntos da disciplina do banco de dados
        const assuntosRef = collection(disciplinaRef, "assunto");
        const assuntosSnap = await getDocs(assuntosRef)
        
        setAssuntos(assuntosSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
  
      getDisciplina(); 
    });

    return home;
  }, [navigation]);

  // adiciona uma novo assunto
  useEffect(() => {
    const adicionarAssunto = async () => {
      if (route.params?.assunto) {
        const assunto = route.params?.assunto
        const docRef = doc(db, "disciplinas", id);

        await addDoc(collection(docRef, 'assunto'), {
          nome: assunto.nome,
          dificuldade: assunto.dificuldade,
          estado: assunto.estado
        });

        navigation.navigate('DisciplinaDetalhes', { assuntos: undefined })
      }
    }

    adicionarAssunto()
  }, [route.params?.assunto]);

  return (
    <View style={styles.container}>
      <Pressable 
        style={[styles.buttonPrimary, { alignSelf: "flex-end" } ]}
        onPress={() => navigation.navigate('DisciplinaAlterar', { id: id })}
      >
        <Text style={styles.buttonText}>
          Alterar
        </Text>
      </Pressable>

      <View style={styles.infoContainer}>
        <Text style={styles.titulo}>
          {detalhes.nome}
        </Text>

        <Text style={styles.estado}>
          {detalhes.estado}
        </Text>
      </View>

      <View style={styles.assuntosTitulo}>
        <Text style={styles.subtitulo}>
          Assuntos
        </Text>

        <Pressable 
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('AssuntoForm', { id: id })}
          >
          <Text style={styles.buttonText}>
            Adicionar
          </Text>
        </Pressable>
      </View>

      { 
        assuntos.map(item => 
          <Assunto 
            key={item.id} 
            navigation={navigation}
            disciplinaId={id}
            assunto={item}
          />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 70
  },
  assuntosItem: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
  },
  assuntosTitulo: {
    flexDirection: 'row', 
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: 10,
  },
  infoContainer: {
    gap: 10,
    marginTop: 8,
    marginBottom: 26,
  },
  estado: {
    textAlign: 'center',
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
    fontWeight: "500"
  },
  countContainer: { ...Count.container},
  countText: { ...Count.text},
  titulo: { ...Typography.titulo },
  subtitulo: { ...Typography.subtitulo },
  buttonPrimary: { ...Buttons.primary },
  buttonText: { ...Buttons.text }
});