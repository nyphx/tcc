import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { db, doc, updateDoc, deleteDoc } from "../../firebase/firebaseConfig";

import Container from '../../components/Container'
import Title from '../../components/Title'
import TextInputWithLabel from '../../components/TextInputWithLabel'
import ButtonPrimary from '../../components/ButtonPrimary'
import ButtonDelete from '../../components/ButtonDelete'

import { StyleModal } from '../../styles/modal'

export default LeiturasAlterar = ({ route, navigation }) => {
  const { data } = route.params
  const [leitura, setLeitura] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);

  const radioButtons = [
    { id: 0, value: 'Lendo' },
    { id: 1, value: 'Parado' },
    { id: 2, value: 'Finalizado' },
    { id: 3, value: 'Futuro' },
  ]

  const handleInputChange = (name, value) => {
    setLeitura(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "leituras", data.id);
      await updateDoc(docRef, leitura);
      
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "leituras", data.id);
      await deleteDoc(docRef);
      navigation.navigate('Leituras');
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
      <Title>Alterar leitura</Title>

      <View>
        <TextInputWithLabel
          label="Nome do livro"
          placeholder="Ex: A Ilustre Casa de Ramires"
          value={leitura.livro}
          onChangeText={text => handleInputChange('livro', text)}
          keyboardType="default"
        />

        <TextInputWithLabel
          label="Nome do Autor"
          placeholder="Ex: Eça de Queiros"
          value={leitura.autor}
          onChangeText={text => handleInputChange('autor', text)}
          keyboardType="default"
        />

        <TextInputWithLabel
          label="Vestibular"
          placeholder="Ex: FUVEST"
          value={leitura.vestibular}
          onChangeText={text => handleInputChange('vestibular', text)}
          keyboardType="default"
        />

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Data do início"
            placeholder="Ex: 20/03/2023"
            value={leitura.dataInicio}
            onChangeText={text => handleInputChange('dataInicio', text)}
            keyboardType="default"
            twoColumn={true}
          />

          <TextInputWithLabel
            label="Data do términio"
            placeholder="Ex: 03/04/2023"
            value={leitura.dataTerminio}
            onChangeText={text => handleInputChange('dataTerminio', text)}
            keyboardType="default"
            twoColumn={true}
          />
        </View>

        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TextInputWithLabel
            label="Total de páginas"
            placeholder="Ex: 350"
            value={leitura.totalPaginas}
            onChangeText={text => handleInputChange('totalPaginas', text)}
            keyboardType="numeric"
            twoColumn={true}
          />

          <TextInputWithLabel
            label="Total de capítulos"
            placeholder="Ex: 20"
            value={leitura.totalCapitulos}
            onChangeText={text => handleInputChange('totalCapitulos', text)}
            keyboardType="numeric"
            twoColumn={true}
          />
        </View>

        <View style={styles.itemContainerForm}>
          <Text style={styles.label}>
            Estado
          </Text>

          {radioButtons.map((item) => {
            return (
              <Pressable 
                onPress={() => setLeitura({...leitura, estado: item.value})}
                key={item.id}
                style={
                  [ 
                    styles.radioButtons,
                    item.value === leitura.estado ? 
                    styles.radioSelected : 
                    styles.radioUnselected,
                  ]
              }>
                <Text 
                  style={
                    [ 
                      styles.radioLabels,
                      item.value === leitura.estado ? 
                      styles.radioSelectedLabel : 
                      styles.radioUnselectedLabel
                    ]
                  }
                >
                  {item.value}
                </Text>
              </Pressable>
            )
          })}

          <Text> User option: {leitura.estado}</Text>
        </View>
      </View>
      
      <View style={{ gap: 10, marginTop: 4 }}>
        <ButtonPrimary handlePress={handleSubmit}>
          Alterar leitura
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
          <View style={[styles.modalContent, { alignItems: 'center' }]}>
            <Text style={styles.modalTitle}>
              Deletar leitura
            </Text>

            <View style={{ width: '70%' }}>
              <Text style={styles.modalText}>
                Você tem certeza que deseja excluir esta leitura? 
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
  ...StyleModal,
  label : {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "500"
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
  radioSelected: {
    backgroundColor: 'rgb(219 234 254)',
    borderWidth: 2,
    borderColor: 'rgb(37 99 235)'
  },
  radioUnselected: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgb(203 213 225)',
  },
  radioSelectedLabel: {
    color: 'rgb(37 99 235)'
  },
  radioUnselectedLabel: {
    color: 'rgb(100 116 139)'
  },
});
