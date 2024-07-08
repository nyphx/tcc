import { useState, useEffect } from 'react'
import { View, Text, Pressable, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native'

import { Entypo } from '@expo/vector-icons';

import ButtonPrimary from '../../../components/ButtonPrimary'
import ButtonCancel from '../../../components/ButtonCancel'

export default ProcessoPaginas = ({ atual, total }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [atualPaginas, setAtualPaginas] = useState(atual)

  const aumentarValor = () => {
    // verifica se o número atual de capítulos é menor que o número total de capítulos
    if (parseInt(atualPaginas) < parseInt(total)) {
      // incrementa o número atual de capítulos em 1
      const novoValor = parseInt(atualPaginas) + 1;
      // atualiza o estado com o novo valor convertido para string
      setAtualPaginas(novoValor.toString());
    }
  };

  const diminuirValor = () => {
    // verifica se o número atual de capítulos é maior que 1
    if (parseInt(atualPaginas) > 0) {
      // decrementa o número atual de capítulos em 1
      const novoValor = parseInt(atualPaginas) - 1;
      // atualiza o estado com o novo valor convertido para string
      setAtualPaginas(novoValor.toString());
    }
  };

  const handleSubmit = () => {
    setModalVisible(!modalVisible)
    console.log(atualPaginas)
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable 
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.title}>
          Páginas
        </Text>

        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Text style={styles.textAtual}>
            {atualPaginas}
          </Text>
          <Text style={styles.textTotal}>
            / {total}
          </Text>
        </View>
      </Pressable>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(!modalVisible) }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Páginas
              </Text>
            <View style={styles.countForm}>

              <TouchableOpacity
                style={styles.buttonControl}
                // onPress={diminuirValor}
              >
                <Text>
                  <Entypo name="minus" size={20} color="white" />
                </Text>
              </TouchableOpacity>

              <TextInput 
                style={styles.input}
                value={atualPaginas}
                onChangeText={(text) => setAtualPaginas(text)}
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={styles.buttonControl}
                // onPress={aumentarValor}
              >
                <Text>
                  <Entypo name="plus" size={20} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          
            <ButtonPrimary handlePress={handleSubmit}>
              <Text>Confirmar</Text>
            </ButtonPrimary>

            <View style={{ marginBottom: 10 }} />

            <ButtonCancel handlePress={() => setModalVisible(!modalVisible)} >
              <Text>Cancelar</Text>
            </ButtonCancel>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 6
  },
  title: {
    textTransform: 'uppercase', 
    fontSize: 14,
    marginBottom: 4
  },
  textAtual: {
    fontWeight: 'bold', 
    fontSize: 18
  },
  textTotal: {
    fontSize: 16, 
    color: "#909090"
  },
  buttonControl: {
    backgroundColor: 'rgb(22 163 74)',
    padding: 10,
    borderRadius: 6,
    alignContent: 'center',
    justifyContent: 'center'
  },
  input : {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgb(148 163 184)',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: 'white',
    width: '70%',
    textAlign: 'center'
  },
  countForm: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    margin: 30,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 14,
  }
})