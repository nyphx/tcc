import { useEffect, useState } from 'react'

import { 
  StyleSheet, 
  Text, 
  View,
  Button,
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

export default function App({ navigation, route }) {
  console.log('reload')

  const { id } = route.params
  const [detalhes, setDetalhes] = useState({})
  const [assuntos, setAssuntos] = useState({})
 
  // obtem disciplina do banco de dados
  useEffect(() => {
    const home = navigation.addListener('focus', () => {
      const getDisciplina = async () => {
        const docRef = doc(db, "disciplinas", id);
        const docSnap = await getDoc(docRef);
        
        setDetalhes(docSnap.data())
      }
  
      getDisciplina(); 
    });

    return home;
  }, [navigation]);

  // obtem assuntos do banco de dados
  useEffect(() => {
    const home = navigation.addListener('focus', () => {
      const docRef = collection(db, "disciplinas");
      const q = query(collection(docRef, "assuntos"));
      
      const getAssuntos = async () => {
        const querySnapshot = await getDocs(q);
        setAssuntos(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      
      getAssuntos(); 
    });

    return home;
  }, [navigation]);

  console.log(assuntos)

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
      <Button 
        title="Alterar"
        onPress={() => navigation.navigate('DisciplinaAlterar', { id: id })}
      />
      <Text>{detalhes.nome}</Text>
      <Text>{detalhes.estado}</Text>

      <Button 
        title="Adicionar assunto"
        onPress={() => navigation.navigate('AssuntoForm', { id: id })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 70
  },
});