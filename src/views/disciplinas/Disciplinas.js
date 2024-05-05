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
  where,
  getDocs,
  addDoc
} from "../../firebase/firebaseConfig";

import { 
  Typography, 
  Buttons, 
  Count,
  General,
  Card
} from '../../styles/index.js';

const Disciplina = ({ navigation, disciplina }) => {
  return (
    <View style={styles.cardContainer}>
      <Pressable
        onPress={() => navigation.navigate(
            'DisciplinaDetalhes', 
            { id: disciplina.id }
          )
        }
      >
        <Text style={styles.cardText}>
          {disciplina.nome}
        </Text>
      </Pressable>
    </View>
  )
}

export default function App({ navigation, route }) {
  // mostra disciplinas 

  const [estudando, setEstudando] = useState([])
  const [finalizado, setFinalizado] = useState([])
  const [parado, setParado] = useState([])
  const [futuro, setFuturo] = useState([])

  const quantidadeEstudando = estudando.length
  const quantidadeFinalizado = finalizado.length
  const quantidadeParado = parado.length
  const quantidadeFuturo = futuro.length

  const quantidadeDisciplinas = quantidadeEstudando + quantidadeFinalizado + quantidadeParado + quantidadeFuturo
  
  useEffect(() => {
    const home = navigation.addListener('focus', () => {
      const disciplinasRef = collection(db, "disciplinas")

      const estudandoQuery = query(disciplinasRef, where("estado", "==", "Estudando"));
      const paradoQuery = query(disciplinasRef, where("estado", "==", "Parado"));
      const finalizadoQuery = query(disciplinasRef, where("estado", "==", "Finalizado"));
      const futuroQuery = query(disciplinasRef, where("estado", "==", "Futuro"));
      
      const getDisciplinas = async () => {
        const estudandoSnapshot = await getDocs(estudandoQuery);
        const paradoSnapshot = await getDocs(paradoQuery);
        const finalizadoSnapshot = await getDocs(finalizadoQuery);
        const futuroSnapshot = await getDocs(futuroQuery);

        setEstudando(estudandoSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setParado(paradoSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setFinalizado(finalizadoSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setFuturo(futuroSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
          <View style={styles.tituloFlex}>
            <View style={[styles.countContainer, { backgroundColor: "rgb(191 219 254)" }]}>
              <Text style={[styles.countText, { color: "rgb(29 78 216)" }]}>
                {quantidadeDisciplinas}
              </Text>
            </View>
            
            <Text style={styles.titulo}>
              Disciplinas
            </Text>
          </View>

          <Pressable 
            style={[styles.buttonPrimary, { marginTop: 6 }]}
            onPress={() => navigation.navigate('DisciplinasForm')}
          >
            <Text style={styles.buttonText}>
              Adicionar disciplina
            </Text>
          </Pressable>
        </View>

        <View>
          <View style={styles.tituloFlex}>
            <View style={[styles.countContainer, { backgroundColor: "#B5E08A" }]}>
              <Text style={[styles.countText, { color: "rgb(2 44 34)" }]}>
                {quantidadeEstudando}
              </Text>
            </View>
            
            <Text style={styles.subtitulo}>
              Estudando
            </Text>
          </View>

          {
            estudando.length !== 0 ?
            estudando.map((disciplina) => (
              <Disciplina 
                key={disciplina.id}
                navigation={navigation}
                disciplina={disciplina}
              />
            )) :
            <Text style={styles.estadoText}>
              Não há disciplinas sendo estudadas.
            </Text>
          }
        </View>

        <View>
          <View style={styles.tituloFlex}>
            <View style={[styles.countContainer, { backgroundColor: "#E09A8A" }]}>
              <Text style={[styles.countText, { color: "rgb(69 10 10)" }]}>
                {quantidadeParado}
              </Text>
            </View>
            
            <Text style={styles.subtitulo}>
              Parado
            </Text>
          </View>

          {
            parado.length !== 0 ?
            parado.map((disciplina) => (
              <Disciplina 
                key={disciplina.id}
                navigation={navigation}
                disciplina={disciplina}
              />
            )) :
            <Text style={styles.estadoText}>
              Não há disciplinas paradas.
            </Text>
          }
        </View>

        <View>
          <View style={styles.tituloFlex}>
            <View style={[styles.countContainer, { backgroundColor: "#ccc" }]}>
              <Text style={[styles.countText, { color: "rgb(8 47 73)" }]}>
                {quantidadeFuturo}
              </Text>
            </View>
            
            <Text style={styles.subtitulo}>
              Futuro
            </Text>
          </View>

          {
            futuro.length !== 0 ?
            futuro.map((disciplina) => (
              <Disciplina 
                key={disciplina.id}
                navigation={navigation}
                disciplina={disciplina}
              />
            )) :
            <Text style={styles.estadoText}>
              Não há disciplinas futuras.
            </Text>
          }
        </View>

        <View>
          <View style={styles.tituloFlex}>
            <View style={[styles.countContainer, { backgroundColor: "#A2B5E6" }]}>
              <Text style={[styles.countText, { color: "rgb(30 41 59)" }]}>
                {quantidadeFinalizado}
              </Text>
            </View>
            
            <Text style={styles.subtitulo}>
              Finalizado
            </Text>
          </View>

          {
            finalizado.length !== 0 ?
            finalizado.map((disciplina) => (
              <Disciplina 
                key={disciplina.id}
                navigation={navigation}
                disciplina={disciplina}
              />
            )) :
            <Text style={styles.estadoText}>
              Não há disciplinas finalizadas.
            </Text>
          }
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  estadoText: { ...Count.estadoText },
  container: { ...General.container },
  countContainer: { ...Count.container},
  countText: { ...Count.text},
  tituloFlex: { ...Count.flex },
  titulo: { ...Typography.titulo },
  subtitulo: { ...Typography.subtitulo },
  buttonPrimary: { ...Buttons.primary },
  buttonText: { ...Buttons.text },
  cardContainer: { ...Card.container },
  cardText: { ...Card.text },
});