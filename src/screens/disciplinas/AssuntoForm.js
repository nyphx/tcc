import { useState } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native';

export default function App({ navigation, route }) {
  const [nome, setNome] = useState('')
  const [dificuldade, setDificuldade] = useState('');
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

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          Adicionar assunto
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            Nome do assunto
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

      <Pressable 
        style={{
          backgroundColor: '#007BFF',
          padding: 15,
          borderRadius: 5,
          alignItems: 'center'
        }}
        onPress={() => {
          navigation.navigate({
            name: 'DisciplinaDetalhes',
            params: { 
              assunto: {
                nome: nome,
                dificuldade: dificuldade,
                estado: estado
              }
            },
            merge: true,
          });
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>
          Adicionar assunto
        </Text>
      </Pressable>
    </View>
  );
}
