import { useState, useEffect } from 'react'

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal
} from 'react-native';

import {
  db,
  getDoc,
  doc,
} from "../../firebase/firebaseConfig";

import { MaterialIcons } from '@expo/vector-icons';

import Container from '../../components/Container'
import ButtonPrimary from '../../components/ButtonPrimary'
import Info from './components/Info'

const Header = ({ redacao }) => {
  return (
    <View style={styles.header}>
      <Text style={{ fontSize: 20, fontWeight: '600', flex: 1 }}>
        {redacao?.tema}
      </Text>

      <TouchableOpacity 
        style={styles.editButton}
        // onPress={() => navigation.navigate(
          //   'SimuladoAlterar',
          //   { data: simulado }
          // )}
          >
        <MaterialIcons name="edit" size={26} color="#505050" />
      </TouchableOpacity>
    </View>
  )
}

const ModalAdicionarCompetencia = ({ modalVisible, setModalVisible }) => {
  const [novaCompetencia, setNovaCompetencia] = useState({
    titulo: '',
    notaFinal: '',
    notaMaxima: '',
    descricao: ''
  });

  const handleInputNovaCompetencia = (name, value) => {
    setNovaCompetencia(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10 }}>
            Adicionar competência
          </Text>

          <TextInputWithLabel
            label="Título"
            placeholder="Ex: Competência 1"
            value={novaCompetencia.titulo}
            onChangeText={text => handleInputNovaCompetencia('titulo', text)}
            keyboardType="deafult"
          />

          <View style={{ flexDirection: 'row', gap: 20 }}>
            <TextInputWithLabel
              label="Nota final"
              placeholder="Ex: 2"
              value={novaCompetencia.notaFinal}
              onChangeText={text => handleInputNovaCompetencia('notaFinal', text)}
              keyboardType="numeric"
              twoColumn={true}
            />

            <TextInputWithLabel
              label="Nota máxima"
              placeholder="Ex: 10"
              value={novaCompetencia.notaMaxima}
              onChangeText={text => handleInputNovaCompetencia('notaMaxima', text)}
              keyboardType="numeric"
              twoColumn={true}
            />
          </View>

          <TextInputWithLabel
            label="Descrição"
            placeholder="Ex: Estrutura sintática excelente e, no máximo, dois desvios"
            value={novaCompetencia.titulo}
            onChangeText={text => handleInputNovaCompetencia('descricao', text)}
            keyboardType="deafult"
            numberOfLines={3}
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default RedacaoDetalhes = ({ route, navigation }) => {
  const { id } = route.params
  const [modalVisible, setModalVisible] = useState(false);

  const [redacao, setRedacao] = useState({});
  const [competencias, setCompetencias] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "redacoes", id);
        const docSnap = await getDoc(docRef);
        setRedacao({ ...docSnap.data(), id: docSnap.id });
      } catch (error) {
        console.error(error);
      }
    };

    return navigation.addListener('focus', fetchData);
  }, [navigation, id]);

  console.log("reload")
  console.log(redacao)

  return (
    <Container>
      <Header redacao={redacao} />

      <View style={{ marginHorizontal: -20 }}>
        <Info redacao={redacao} />
      </View>

      <View>
        <View style={styles.competenciaHeader}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            Competências
          </Text>

          <ButtonPrimary handlePress={() => setModalVisible(true)}>
            Adicionar
          </ButtonPrimary>
        </View>

        { competencias.length === 0 &&
          <Text style={{ fontSize: 16, marginTop: 16 }}>
            Você ainda adicionou nenhuma competência.
          </Text>
        }
      </View>

      <ModalAdicionarCompetencia
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  headerContent: {
    gap: 4,
  },
  subTitle: {
    fontSize: 20,
  },
  editButton: {
    padding: 6,
    marginLeft: 4
  },
  info: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  competenciaHeader: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginTop: 6
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingBottom: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});