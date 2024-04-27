import { useState } from 'react'

import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  TextInput,
  Pressable
} from 'react-native';

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
    <View style={styles.container}>
      <Text>Adicionar assunto</Text>

      <View>
        <Text>Nome do assunto</Text>
        <TextInput
          placeholder="Ex: Biologia"
          onChangeText={(text) => setNome(text)}
          value={nome}
        />
      </View>

      <View>
        <Text>Dificuldade</Text>
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
            }>
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
        title="Adicionar assunto"
        onPress={() => {
          // pass and merge params back to home screen
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