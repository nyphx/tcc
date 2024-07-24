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

import * as Progress from 'react-native-progress';

const Disciplina = ({ navigation, disciplina }) => {
  const [assuntosTotais, setAssuntosTotais] = useState(0);
  const [assuntosCompletos, setAssuntosCompletos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assuntoRef = collection(db, 'disciplinas', disciplina.id, 'assunto');
        const assuntoSnap = await getDocs(assuntoRef);

        let total = 0;
        let completos = 0;

        assuntoSnap.forEach(doc => {
          total += 1;

          if (doc.data()["estado"] === 'Finalizado') {
            completos += 1;
          }
        });

        setAssuntosTotais(total);
        setAssuntosCompletos(completos);
      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, [navigation, disciplina.id]);

  function calcularPorcentagem(acertos, totais) {
    if (totais === 0) {
        return 0;
    }
    return ((acertos / totais) * 100).toFixed();
  } 

  return (
    <View style={styles.cardContainer}>
      <Pressable
        onPress={() => navigation.navigate(
            'DisciplinaDetalhes', 
            { id: disciplina.id }
          )
        }
      > 
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.cardText}>
            {disciplina.nome}
          </Text>

          <Text style={{ fontSize: 20 }}>
            {calcularPorcentagem(assuntosCompletos, assuntosTotais)}%
          </Text>
        </View>

        <View style={{ marginVertical: 8 }}>
          <Progress.Bar 
            progress={assuntosTotais ? assuntosCompletos / assuntosTotais : 0} 
            width={null}
            height={12}
            color={'rgba(88, 94, 255, 1)'}
            unfilledColor={'rgba(217, 217, 217, 1)'}
            borderWidth={0}
          />
        </View>

        <Text style={{ fontSize: 18, color: '#505050' }}>
          {assuntosCompletos} de {assuntosTotais} assuntos foram estudados
        </Text>
      </Pressable>
    </View>
  )
}

export default function App({ navigation, route }) {
  // mostra disciplinas 

  const [disciplinas, setDisciplinas] = useState({
    estudando: [],
    finalizado: [],
    parado: [],
    futuro: []
  });
  
  const { estudando, finalizado, parado, futuro } = disciplinas;

  const quantidadeEstudando = estudando.length
  const quantidadeFinalizado = finalizado.length
  const quantidadeParado = parado.length
  const quantidadeFuturo = futuro.length

  const quantidadeDisciplinas = quantidadeEstudando + quantidadeFinalizado + quantidadeParado + quantidadeFuturo
  
  useEffect(() => {
    const home = navigation.addListener('focus', async () => {
      const disciplinasRef = collection(db, "disciplinas");
      const snapshot = await getDocs(disciplinasRef);
      
      const disciplinasData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  
      setDisciplinas({
        estudando: disciplinasData.filter(disciplina => disciplina.estado === "Estudando"),
        finalizado: disciplinasData.filter(disciplina => disciplina.estado === "Finalizado"),
        parado: disciplinasData.filter(disciplina => disciplina.estado === "Parado"),
        futuro: disciplinasData.filter(disciplina => disciplina.estado === "Futuro")
      });
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