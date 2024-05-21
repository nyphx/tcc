import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, TextInput, Modal } from 'react-native'

import { Entypo } from '@expo/vector-icons';

export default ProcessoCapitulos = ({ id, atualCapitulos, totalCapitulos }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [atual, setAtual] = useState(atualCapitulos.toString())

  const aumentarValor = () => {
    setAtual((prev) => 
      (parseInt(prev, 10) + 1).toString()
    );
  };

  const diminuirValor = () => {
    setAtual((prev) => 
      (parseInt(prev, 10) > 0 ? (parseInt(prev, 10) - 1).toString() : '0')
    );
  };

  const handleSubmit = () => {
    setModalVisible(!modalVisible)
    console.log(atual)
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable 
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.title}>
          Capítulos
        </Text>

        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Text style={styles.textAtual}>
            {atualCapitulos}
          </Text>
          <Text style={styles.textTotal}>
            / {totalCapitulos}
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
                Capítulos
              </Text>
            <View style={styles.countForm}>

              <Pressable
                style={styles.buttonClose}
                onPress={diminuirValor}
              >
                <Text>
                  <Entypo name="minus" size={20} color="white" />
                </Text>
              </Pressable>

              <TextInput 
                style={styles.input}
                value={atual}
                onChangeText={(text) => setAtual(text)}
                keyboardType="numeric"
              />

              <Pressable
                style={styles.buttonClose}
                onPress={aumentarValor}
              >
                <Text>
                  <Entypo name="plus" size={20} color="white" />
                </Text>
              </Pressable>
            </View>
          
            <Pressable
              onPress={handleSubmit}
              style={styles.buttonClose}
            >
              <Text>
                Confirmar
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.buttonClose}
            >
              <Text>
                Cancelar
              </Text>
            </Pressable>
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
  buttonClose: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
    fontSize: 16,
    width: '70%'
  },
  countForm: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  }
})