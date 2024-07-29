import { useEffect, useState } from 'react'
import { Text, View, Pressable } from 'react-native';
import { 
  db, 
  collection, 
  getDoc,
  addDoc,
  doc,
  getDocs,
  query,
  where
} from "../../firebase/firebaseConfig";
import { AntDesign } from '@expo/vector-icons';

const Assunto = ({ navigation, assunto, disciplinaId }) => {
  return (
    <Pressable 
      onPress={() => navigation.navigate(
        'AssuntoAlterar', 
        { 
          assuntoId: assunto.id,
          disciplinaId: disciplinaId,
        }
      )}
    >
      <Text>
        {assunto.nome}
      </Text>
    </Pressable>
  )
}

const Estado = ({ children, estado }) => {
  let background; 
  let text;

  if (estado === "Estudando") {
    background = "#B5E08A"
    text = "rgb(2 44 34)"
  } else if (estado === "Parado") {
    background = "#E09A8A"
    text = "rgb(69 10 10)"
  } else if (estado === "Finalizado") {
    background = "#A2B5E6"
    text = "rgb(8 47 73)"
  } else {
    background = "#ccc"
    text = "rgb(30 41 59)"
  }

  return (
    <Text style={{
      textAlign: 'center',
      backgroundColor: background,
      padding: 10,
      borderRadius: 6,
      fontSize: 18,
      fontWeight: "500",
      color: text
    }}>
      { children }
    </Text>
  )
}

export default function App({ navigation, route }) {
  console.log('reload')

  const { id } = route.params

  const [detalhes, setDetalhes] = useState({})
  const [estudando, setEstudando] = useState([])
  const [finalizado, setFinalizado] = useState([])
  const [futuro, setFuturo] = useState([])

  const quantidadeEstudando = estudando.length
  const quantidadeFinalizado = finalizado.length
  const quantidadeFuturo = futuro.length

  useEffect(() => {
    const home = navigation.addListener('focus', () => {
      const disciplinaRef = doc(db, "disciplinas", id);
      const assuntosRef = collection(disciplinaRef, "assunto");

      const estudandoQuery = query(assuntosRef, where("estado", "==", "Estudando"));
      const finalizadoQuery = query(assuntosRef, where("estado", "==", "Finalizado"));
      const futuroQuery = query(assuntosRef, where("estado", "==", "Futuro"));

      const getDisciplina = async () => {
        const disciplinaSnap = await getDoc(disciplinaRef);
        setDetalhes(disciplinaSnap.data())
        
        const estudandoSnapshot = await getDocs(estudandoQuery);
        const finalizadoSnapshot = await getDocs(finalizadoQuery);
        const futuroSnapshot = await getDocs(futuroQuery);
        
        setEstudando(estudandoSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setFinalizado(finalizadoSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setFuturo(futuroSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
  
      getDisciplina(); 
    });

    return home;
  }, [navigation]);

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
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={32} color="black" />
        </Pressable>

        <Pressable 
          onPress={() => navigation.navigate('DisciplinaAlterar', { id: id })}
        >
          <Text>
            Alterar
          </Text>
        </Pressable>
      </View>

      <View>
        <Text>
          {detalhes.nome}
        </Text>

        <Estado estado={detalhes.estado}>
          {detalhes.estado}
        </Estado>
      </View>

      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginBottom: -10 }}>
          <Text>
            Assuntos
          </Text>

          <Pressable 
            onPress={() => navigation.navigate('AssuntoForm', { id: id })}
          >
            <Text>
              Adicionar
            </Text>
          </Pressable>
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: "#B5E08A", padding: 5, borderRadius: 4 }}>
              <Text style={{ color: "rgb(2 44 34)" }}>
                {quantidadeEstudando}
              </Text>
            </View>
            
            <Text>
              Estudando
            </Text>
          </View>
          
          { 
            quantidadeEstudando !== 0 ?
            estudando.map(item => 
              <Assunto 
                key={item.id} 
                navigation={navigation}
                disciplinaId={id}
                assunto={item}
              />
            ) :
            <Text>
              Não há disciplinas sendo estudadas.
            </Text>
          }
        </View>
        
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: "#ccc", padding: 5, borderRadius: 4 }}>
              <Text style={{ color: "rgb(8 47 73)" }}>
                {quantidadeFuturo}
              </Text>
            </View>
            
            <Text>
              Futuro
            </Text>
          </View>
          
          { 
            quantidadeFuturo !== 0 ?
            futuro.map(item => 
              <Assunto 
                key={item.id} 
                navigation={navigation}
                disciplinaId={id}
                assunto={item}
              />
            ) :
            <Text>
              Não há disciplinas futuras.
            </Text>
          }
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: "#A2B5E6", padding: 5, borderRadius: 4 }}>
              <Text style={{ color: "rgb(30 41 59)" }}>
                {quantidadeFinalizado}
              </Text>
            </View>
            
            <Text>
              Finalizado
            </Text>
          </View>
          
          { 
            quantidadeFinalizado !== 0 ?
            finalizado.map(item => 
              <Assunto 
                key={item.id} 
                navigation={navigation}
                disciplinaId={id}
                assunto={item}
              />
            ) :
            <Text>
              Não há disciplinas finalizadas.
            </Text>
          }
        </View>
      </View>
    </View>
  );
}
