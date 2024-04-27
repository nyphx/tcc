import { useState, useEffect } from 'react'

import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  TextInput
} from 'react-native';

import { 
  db, 
  getDoc,
  doc,
  deleteDoc,
  updateDoc 
} from "../../firebase/firebaseConfig";

export default function App({ navigation, route }) {
  const { id } = route.params
  const [nome, setNome] = useState('')
 
  // obtem disciplina do banco de dados
  useEffect(() => {
    const getDisciplina = async () => {
      const docRef = doc(db, "disciplinas", id);
      const docSnap = await getDoc(docRef);
      
      setNome(docSnap.data().nome)
    }

    getDisciplina(); 
  }, [])

  // exclui a disciplina do banco de dados
  const deleteDisciplina = () => {
    const deletar = async () => {
      await deleteDoc(doc(db, "disciplinas", id));
    }
    
    deletar(); 
    navigation.navigate('Disciplinas')
  }

  // altera a disciplina
  const updateDisciplina = () => {
    const alterar = async () => {
      const docRef = doc(db, "disciplinas", id);

      await updateDoc(docRef, {
        "nome": nome
      });
    }

    alterar();
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text>Alterar disciplina</Text>

      <Text>Nome da disciplina</Text>
      <TextInput
        placeholder="Ex: Biologia"
        onChangeText={(text) => setNome(text)}
        value={nome}
      />

      <Button 
        title="Alterar disciplina"
        onPress={() => updateDisciplina()}
      />

      <Button 
        title="Excluir disciplina"
        onPress={() => deleteDisciplina()}
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