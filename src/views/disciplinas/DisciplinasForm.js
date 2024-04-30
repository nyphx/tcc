import { 
  useState 
} from 'react'

import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  Pressable
} from 'react-native';

import { 
  Typography, 
  Buttons,
  General,
  Form
} from '../../styles/index.js';

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
      <View>
        <Text style={styles.titulo}>
          Adicionar disciplina
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

        <View>
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

      <Pressable
        style={styles.buttonPrimary}
        onPress={() => {
          navigation.navigate({
            name: 'Disciplinas',
            params: { 
              nome: nome,
              estado: estado
            },
            merge: true,
          });
        }}
      >
        <Text style={styles.buttonText}>
          Adicionar disciplina
        </Text>
      </Pressable> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...General.containerForm },
  titulo: { ...Typography.tituloForm },
  buttonPrimary: { ...Buttons.primary },
  buttonText: { ...Buttons.text },
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