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
} from "../../firebase/firebaseConfig"

import { 
  Typography, 
  Buttons,
  General,
  Form
} from '../../styles/index.js';

export default function App({ navigation, route }) {
  const { assuntoId, disciplinaId } = route.params

  const [nome, setNome] = useState('')
  const [dificuldade, setDificuldade] = useState('')
  const [estado, setEstado] = useState('')

  const radioButtonsDificuldades = [
    { id: 0, value: 'Fácil' },
    { id: 1, value: 'Médio' },
    { id: 2, value: 'Difícil' },
  ]

  const radioButtonsEstados = [
      { id: 0, value: 'Estudando' },
      { id: 1, value: 'Finalizado' },
      { id: 2, value: 'Futuro' },
  ]

  // obtem disciplina do banco de dados
  useEffect(() => {
    const getAssunto = async () => {
      // obtem referencia da disciplina do banco de dados
      const disciplinaRef = doc(db, "disciplinas", disciplinaId);
      // obtem referencia do assunto da disciplina do banco de dados
      const assuntosRef = doc(disciplinaRef, "assunto", assuntoId);

      // obtem os dados do banco de dados
      const assuntosSnap = await getDoc(assuntosRef)
      
      setNome(assuntosSnap.data().nome);
      setDificuldade(assuntosSnap.data().dificuldade);
      setEstado(assuntosSnap.data().estado);
    }

    getAssunto();  
  }, [])

  // exclui a disciplina do banco de dados
  const deleteAssunto = () => {
    const deletar = async () => {
     // obtem referencia da disciplina do banco de dados
     const disciplinaRef = doc(db, "disciplinas", disciplinaId);
     // obtem referencia do assunto da disciplina do banco de dados
     const assuntosRef = doc(disciplinaRef, "assunto", assuntoId);

      await deleteDoc(assuntosRef);
    }
    
    deletar(); 
    navigation.goBack()
  }

  // altera a disciplina
  const updateAssunto = () => {
    const alterar = async () => {
      // obtem referencia da disciplina do banco de dados
      const disciplinaRef = doc(db, "disciplinas", disciplinaId);
      // obtem referencia do assunto da disciplina do banco de dados
      const assuntosRef = doc(disciplinaRef, "assunto", assuntoId);

      await updateDoc(assuntosRef, {
        "nome": nome,
        "dificuldade": dificuldade,
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
            onChangeText={(text) => setNome(text)}
            value={nome}
          />
        </View>
          
        <View style={styles.itemContainerForm}>
          <Text style={styles.label}>
            Dificuldade
          </Text>

          {radioButtonsDificuldades.map((item) => {
            return (
              <Pressable 
                onPress={() => setDificuldade(item.value)}
                key={item.id}
                style={
                  [ 
                    styles.radioButtons,
                    item.value === dificuldade ? 
                    styles.selected : 
                    styles.unselected,
                  ]
                }
              >
                <Text 
                  style={
                    [ 
                      styles.radioLabels,
                      item.value === dificuldade ? 
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

          <Text> User option: {dificuldade}</Text>
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
          onPress={() => updateAssunto()}
        >
          <Text style={styles.buttonText}>
            Alterar assunto
          </Text>
        </Pressable>

        <Pressable 
          style={styles.buttonDelete}
          onPress={() => deleteAssunto()}
        >
          <Text style={styles.buttonDeleteText}>
            Excluir assunto
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