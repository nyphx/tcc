import { useState, useEffect } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native';
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
    <View style={{ flex: 1, padding: 20 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Alterar disciplina
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Nome da disciplina
          </Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
            placeholder="Ex: Biologia"
            onChangeText={(text) => setNome(text)}
            value={nome}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Estado
          </Text>
          {radioButtonsEstados.map((item) => {
            return (
              <Pressable 
                onPress={() => setEstado(item.value)}
                key={item.id}
                style={{
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                  backgroundColor: item.value === estado ? '#ddd' : '#fff',
                  borderWidth: 1,
                  borderColor: '#ccc'
                }}
              >
                <Text 
                  style={{
                    color: item.value === estado ? '#000' : '#888',
                    fontSize: 16
                  }}
                >
                  {item.value}
                </Text>
              </Pressable>
            )
          })}

          <Text>User option: {estado}</Text>
        </View>
      </View>
      
      <View style={{ gap: 10 }}>
        <Pressable 
          style={{
            backgroundColor: '#007BFF',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center'
          }}
          onPress={() => updateDisciplina()}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>
            Alterar disciplina
          </Text>
        </Pressable>

        <Pressable 
          style={{
            backgroundColor: '#dc3545',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center'
          }}
          onPress={() => deleteDisciplina()}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>
            Excluir disciplina
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
