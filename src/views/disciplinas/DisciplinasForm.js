import { useState } from 'react'

import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  TextInput
} from 'react-native';

export default function App({ navigation, route }) {
  const [nome, setNome] = useState("")

  return (
    <View style={styles.container}>
      <Text>Adicionar disciplina</Text>

      <Text>Nome da disciplina</Text>
      <TextInput
        placeholder="Ex: Biologia"
        onChangeText={(text) => setNome(text)}
        value={nome}
      />

      <Button 
        title="Adicionar disciplina"
        onPress={() => {
          // pass and merge params back to home screen
          navigation.navigate({
            name: 'Disciplinas',
            params: { nome: nome },
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
});