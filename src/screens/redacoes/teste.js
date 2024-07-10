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

  const [redacao, setRedacao] = useState({
    tema: '',
    notaFinal: '',
    notaMaxima: '',
    data: '',
    competencias: [],
  });

  const [competencia, setCompetencia] = useState({
    notaFinal: '',
    notaMaxima: '',
    descricao: '',
  })

  const handleInputRedacao = (name, value) => {
    setRedacao(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputCompetencia = (name, value) => {
    setCompetencia(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addCompetencia = () => {
    const novaCompetencia = {
      ...competencia,
      id: redacao.competencias.length
    }

    setRedacao(prevState => ({
      ...prevState,
      competencias: [ ...prevState.competencias, novaCompetencia]
    }));

    setModalVisible(false)

    setCompetencia({
      notaFinal: '',
      notaMaxima: '',
      descricao: '',
    });
  };

  return (
    <Container>
      <Title>Adicionar redação</Title>

      <View>
        <TextInputWithLabel
          label="Tema da redação"
          placeholder="Ex: (FUVEST) Educação básica e formação profissional: entre a multitarefa e a reflexão"
          value={redacao.tema}
          onChangeText={text => handleInputRedacao('tema', text)}
          keyboardType="default"
        />

        <TextInputWithLabel
          label="Nota final"
          placeholder="Ex: 42"
          value={redacao.notaFinal}
          onChangeText={text => handleInputRedacao('notaFinal', text)}
          keyboardType="numeric"
        />

        <TextInputWithLabel
          label="Nota máxima"
          placeholder="Ex: 50"
          value={redacao.notaMaxima}
          onChangeText={text => handleInputRedacao('notaMaxima', text)}
          keyboardType="numeric"
        />

        <TextInputWithLabel
          label="Data realizada"
          placeholder="Ex: 23/03/2024"
          value={redacao.data}
          onChangeText={text => handleInputRedacao('data', text)}
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
                Adicionar competência
              </Text>

              <View>
                <View>
                  <TextInputWithLabel
                    label="Nota final"
                    placeholder="Ex: 10"
                    value={competencia.notaFinal}
                    onChangeText={text => handleInputCompetencia('notaFinal', text)}
                    keyboardType="numeric"
                  />

                  <TextInputWithLabel
                    label="Nota máxima"
                    placeholder="Ex: 12"
                    value={competencia.notaMaxima}
                    onChangeText={text => handleInputCompetencia('notaMaxima', text)}
                    keyboardType="numeric"
                  />

                  <TextInputWithLabel
                    label="Descrição da correção"
                    placeholder="Ex: Estrutura sintática excelente e, no máximo, dois desvios"
                    value={competencia.descricao}
                    onChangeText={text => handleInputCompetencia('descricao', text)}
                    keyboardType="default"
                  />
                </View>
              </View>

              <View style={{ gap: 10, marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'rgb(59 130 246)', width: '100%' }]}
                  onPress={addCompetencia}
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

        <View>
          {
            redacao.competencias.map(data => (
              <Competencia 
                key={data.id}
                id={data.id}
                notaMaxima={data.notaMaxima}
                notaFinal={data.notaFinal}
                descricao={data.descricao}
              />
            ))
          }
        </View>
      </View>

      <ButtonPrimary handlePress={handleSubmitRedacao}>
        Adicionar redação
      </ButtonPrimary>
    </Container>
  );
};

const styles = StyleSheet.create({
  ...StyleModal,
  textCompetencia: {
    fontSize: 18,
    marginTop: 6
  }
});