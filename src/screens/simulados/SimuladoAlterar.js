import { useState } from 'react'
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db, doc, updateDoc, deleteDoc } from "../../firebase/firebaseConfig";

import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import ButtonPrimary from '../../components/ButtonPrimary'
import ButtonDelete from '../../components/ButtonDelete'

import { StyleModal } from '../../styles/modal'

export default SimuladosForm = ({ route, navigation }) => {
  const { data } = route.params
  const [simulado, setSimulado] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (name, value) => {
    setSimulado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "simulados", data.id);
      await updateDoc(docRef, simulado);
      
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "simulados", data.id);
      await deleteDoc(docRef);
      navigation.navigate('Simulados');
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = () => {
    handleDelete();
    setModalVisible(false);
  };

  return (
    <Container>
      <Title>Alterar simulado</Title>

      <View>
        <TextInputWithLabel
          label="Nome"
          placeholder="Ex: UNESP 2018"
          value={simulado.nome}
          onChangeText={text => handleInputChange('nome', text)}
          keyboardType="default"
        />

        <TextInputWithLabel
          label="Fase"
          placeholder="Ex: 1ª fase"
          value={simulado.fase}
          onChangeText={text => handleInputChange('fase', text)}
          keyboardType="numeric"
        />

        <TextInputWithLabel
          label="Data Realizada"
          placeholder="Ex: 23/03/2023"
          value={simulado.data}
          onChangeText={text => handleInputChange('data', text)}
          keyboardType="default"
        />

        <TextInputWithLabel
          label="Nota Final"
          placeholder="Ex: 70"
          value={simulado.notaFinal}
          onChangeText={text => handleInputChange('notaFinal', text)}
          keyboardType="numeric"
        />

        <TextInputWithLabel
          label="Nota Máxima"
          placeholder="Ex: 90"
          value={simulado.notaMaxima}
          onChangeText={text => handleInputChange('notaMaxima', text)}
          keyboardType="numeric"
        />
      </View>

      <View style={{ gap: 10 }}>
        <ButtonPrimary handlePress={handleSubmit}>
          Alterar simulado
        </ButtonPrimary>

        <ButtonDelete handlePress={() => setModalVisible(true)}>
          Excluir
        </ButtonDelete>
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Deletar simulado
            </Text>

            <View style={{ width: '70%' }}>
              <Text style={styles.modalText}>
                Você tem certeza que deseja excluir este simulado? 
              </Text>
              <Text style={styles.modalText}>
                Esta ação é irreversível.
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 26 }}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'rgb(220 38 38)', flex: 1 }]}
                onPress={confirmDelete}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#e1e1e1', flex: 1 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: "#505050" }]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  ...StyleModal
});