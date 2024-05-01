import { useState, useEffect } from 'react'

import { 
  StyleSheet, 
  Text, 
  View,
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

import { 
  Typography, 
  Buttons,
  General,
  Form
} from '../../styles/index.js';

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
      <View>
        <Text style={styles.titulo}>
          Alterar disciplina
        </Text>

        <View style={styles.itemContainerForm}>
          <Text style={styles.label}>
            Nome da disciplina
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Biologia"
            onChangeText={(text) => setNome(text)}
            value={nome}
          />
        </View>

        <View style={styles.itemContainerForm}>
          <Text style={styles.label}>
            Estado
          </Text>
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
      </View>
      
      <View style={{ gap: 10 }}>
        <Pressable 
          style={styles.buttonPrimary}
          onPress={() => updateDisciplina()}
        >
          <Text style={styles.buttonText}>
            Alterar disciplinas
          </Text>
        </Pressable>

        <Pressable 
          style={styles.buttonDelete}
          onPress={() => deleteDisciplina()}
        >
          <Text style={styles.buttonDeleteText}>
            Excluir disciplina
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...General.containerForm },
  titulo: { ...Typography.tituloForm },
  buttonPrimary: { ...Buttons.primary },
  buttonText: { ...Buttons.text },
  buttonDelete: { ...Buttons.secondary },
  buttonDeleteText: { ...Buttons.secondaryText },
  label: { ...Form.label },
  input: { ...Form.input },
  itemContainerForm: { ...Form.itemContainerForm },
  radioButtons: { ...Form.radioButtons },
  radioLabels: { ...Form.radioLabels },
  selected: { ...Form.radioSelected },
  unselected: { ...Form.radioUnselected },
  selectedLabel: { ...Form.radioSelectedLabel },
  unselectedLabel: { ...Form.radioUnselectedLabel },
});