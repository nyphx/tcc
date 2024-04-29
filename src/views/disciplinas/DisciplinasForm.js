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
  const [nome, setNome] = useState("")
  const [estado, setEstado] = useState("")

  const radioButtonsEstados = [
    { id: 0, value: 'Estudando' },
    { id: 1, value: 'Parado' },
    { id: 2, value: 'Finalizado' },
    { id: 3, value: 'Futuro' },
  ]

  return (
    <View style={styles.container}>
      <Text>Adicionar disciplina</Text>

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
        title="Adicionar disciplina"
        onPress={() => {
          // pass and merge params back to home screen
          navigation.navigate({
            name: 'Disciplinas',
            params: { 
              nome: nome,
              estado: estado
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