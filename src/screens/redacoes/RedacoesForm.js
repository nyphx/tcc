import { useState } from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { db, collection, addDoc } from "../../firebase/firebaseConfig";

import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import ButtonPrimary from '../../components/ButtonPrimary'

import { StyleModal } from '../../styles/modal'

export default RedacoesForm = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [simulado, setSimulado] = useState({
    nome: '',
    fase: '',
    data: '',
    notaFinal: '',
    notaMaxima: '',
  });

  const [conteudo, setConteudo] = useState({
    nome: '',
    notaFinal: '',
    notaMaxima: '',
  })

  const handleInputSimulados = (name, value) => {
    setSimulado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputConteudos = (name, value) => {
    setConteudo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitSimulado = async () => {
    try {
      const docRef = collection(db, "simulados")
      await addDoc(docRef, simulado);
      
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitConteudo = async () => {
    try {
      const docRef = collection(db, "simulados")
      await addDoc(docRef, simulado);
      
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Adicionar redação</Title>

      <View>
        <TextInputWithLabel
          label="Tema da redação"
          placeholder="Ex: (FUVEST) Educação básica e formação profissional: entre a multitarefa e a reflexão"
          value={simulado.nome}
          onChangeText={text => handleInputSimulados('nome', text)}
          keyboardType="default"
        />

        <TextInputWithLabel
          label="Nota final"
          placeholder="Ex: 42"
          value={simulado.fase}
          onChangeText={text => handleInputSimulados('fase', text)}
          keyboardType="numeric"
        />

        <TextInputWithLabel
          label="Nota máxima"
          placeholder="Ex: 50"
          value={simulado.data}
          onChangeText={text => handleInputSimulados('data', text)}
          keyboardType="numeric"
        />

        <TextInputWithLabel
          label="Data realizada"
          placeholder="Ex: 23/03/2024"
          value={simulado.notaFinal}
          onChangeText={text => handleInputSimulados('notaFinal', text)}
          keyboardType="default"
        />
      </View>

      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: "700" }}>
            Competência
          </Text>

          <ButtonPrimary handlePress={() => setModalVisible(true)}>
            Adicionar
          </ButtonPrimary>
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
                Adicionar conteúdo
              </Text>

              <View>
                <TextInputWithLabel
                  label="Nome"
                  placeholder="Ex: Biologia"
                  value={conteudo.nome}
                  onChangeText={text => handleInputConteudos('nome', text)}
                  keyboardType="default"
                />

                <View>
                  <TextInputWithLabel
                    label="Nota final"
                    placeholder="Ex: 12"
                    value={conteudo.notaFinal}
                    onChangeText={text => handleInputConteudos('notaFinal', text)}
                    keyboardType="numeric"
                  />

                  <TextInputWithLabel
                    label="Nota máxima"
                    placeholder="Ex: 15"
                    value={conteudo.notaMaxima}
                    onChangeText={text => handleInputConteudos('notaMaxima', text)}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={{ gap: 10, marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'rgb(59 130 246)', width: '100%' }]}
                >
                  <Text style={styles.modalButtonText}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#e1e1e1', width: '100%' }]}
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
      </View>

      <ButtonPrimary handlePress={handleSubmitSimulado}>
        Adicionar simulado
      </ButtonPrimary>
    </Container>
  );
};

const styles = StyleSheet.create({
  ...StyleModal
});