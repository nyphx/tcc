import { useState, useEffect } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native';
import { db, getDoc, doc, deleteDoc, updateDoc } from "../../firebase/firebaseConfig"

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

  // obtem assunto do banco de dados
  useEffect(() => {
    const getAssunto = async () => {
      // obtem referencia da disciplina do banco de dados
      const disciplinaRef = doc(db, "disciplinas", disciplinaId);
      // obtem referencia do assunto da disciplina do banco de dados
      const assuntoRef = doc(disciplinaRef, "assunto", assuntoId);

      // obtem os dados do banco de dados
      const assuntoSnap = await getDoc(assuntoRef)
      
      setNome(assuntoSnap.data().nome);
      setDificuldade(assuntoSnap.data().dificuldade);
      setEstado(assuntoSnap.data().estado);
    }

    getAssunto();  
  }, [])

  // exclui o assunto do banco de dados
  const deleteAssunto = () => {
    const deletar = async () => {
      // obtem referencia da disciplina do banco de dados
      const disciplinaRef = doc(db, "disciplinas", disciplinaId);
      // obtem referencia do assunto da disciplina do banco de dados
      const assuntoRef = doc(disciplinaRef, "assunto", assuntoId);

      await deleteDoc(assuntoRef);
    }
    
    deletar(); 
    navigation.goBack()
  }

  // altera o assunto
  const updateAssunto = () => {
    const alterar = async () => {
      // obtem referencia da disciplina do banco de dados
      const disciplinaRef = doc(db, "disciplinas", disciplinaId);
      // obtem referencia do assunto da disciplina do banco de dados
      const assuntoRef = doc(disciplinaRef, "assunto", assuntoId);

      await updateDoc(assuntoRef, {
        "nome": nome,
        "dificuldade": dificuldade,
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
          Alterar assunto
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Nome do assunto
          </Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 }}
            onChangeText={(text) => setNome(text)}
            value={nome}
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Dificuldade
          </Text>
          {radioButtonsDificuldades.map((item) => {
            return (
              <Pressable 
                onPress={() => setDificuldade(item.value)}
                key={item.id}
                style={{
                  padding: 10,
                  marginVertical: 5,
                  borderRadius: 5,
                  backgroundColor: item.value === dificuldade ? '#ddd' : '#fff',
                  borderWidth: 1,
                  borderColor: '#ccc'
                }}
              >
                <Text 
                  style={{
                    color: item.value === dificuldade ? '#000' : '#888',
                    fontSize: 16
                  }}
                >
                  {item.value}
                </Text>
              </Pressable>
            )
          })}

          <Text>User option: {dificuldade}</Text>
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
          onPress={() => updateAssunto()}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>
            Alterar assunto
          </Text>
        </Pressable>

        <Pressable 
          style={{
            backgroundColor: '#dc3545',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center'
          }}
          onPress={() => deleteAssunto()}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>
            Excluir assunto
          </Text>  
        </Pressable>
      </View>
    </View>
  );
}
