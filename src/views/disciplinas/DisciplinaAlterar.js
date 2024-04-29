import { useState, useEffect } from 'react'

import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  TextInput,
  Pressable
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
  const [estado, setEstado] = useState("")

  const radioButtonsEstados = [
    { id: 0, value: 'Estudando' },
    { id: 1, value: 'Parado' },
    { id: 2, value: 'Finalizado' },
    { id: 3, value: 'Futuro' },
  ]
 
  // obtem disciplina do banco de dados
  useEffect(() => {
    const getDisciplina = async () => {
      const docRef = doc(db, "disciplinas", id);
      const docSnap = await getDoc(docRef);
      
      setNome(docSnap.data().nome)
      setEstado(docSnap.data().estado)
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
        "nome": nome,
        "estado": estado
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

      <View>
        <Text>Estado</Text>
        {radioButtonsEstados.map((item) => {
          return (
            <Pressable 
              onPress={() => setEstado(item.value)}
              key={item.id}
              style={
                [ 
                  styles.radioButtons,
                  item.value === estado ? 
                  styles.selected : 
                  styles.unselected,
                ]
            }>
              <Text 
                style={
                  [ 
                    styles.radioLabels,
                    item.value === estado ? 
                    styles.selectedLabel : 
                    styles.unselectedLabel
                  ]
                }
              >
                {item.value}
              </Text>
            </Pressable>
          )
        })}

        <Text> User option: {estado}</Text>
      </View>

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
  radioButtons: {
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  radioLabels: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16
  },
  selected: {
    backgroundColor: 'blue'
  },
  unselected: {
    backgroundColor: '#ddd'
  },
  selectedLabel: {
    color: 'white'
  },
  unselectedLabel: {
    color: '#303030'
  },
});