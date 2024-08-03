import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateLeitura, deleteLeitura } from '../../services/leiturasService'; 

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary,
  ButtonDelete,
  ConfirmDeleteModal
} from '../../components';

const LeiturasAlterar = () => {
  const navigation = useNavigation(); 
  const { data } = useRoute().params; 

  const [leitura, setLeitura] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);

  const radioButtons = [
    { id: 0, value: 'Lendo' },
    { id: 1, value: 'Parado' },
    { id: 2, value: 'Finalizado' },
    { id: 3, value: 'Futuro' },
  ];

  const handleInputChange = (name, value) => {
    setLeitura(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateLeitura(data.id, leitura);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLeitura(data.id, leitura);
      navigation.navigate('Leituras');
    } catch (error) {
      console.error(error);
    }
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
            label="Data do término"
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
          <Text style={styles.label}>Estado</Text>

          {radioButtons.map((item) => {
            return (
              <Pressable 
                onPress={() => setLeitura({ ...leitura, estado: item.value })}
                key={item.id}
                style={[
                  styles.radioButtons,
                  item.value === leitura.estado ? styles.radioSelected : styles.radioUnselected,
                ]}
              >
                <Text 
                  style={[
                    styles.radioLabels,
                    item.value === leitura.estado ? styles.radioSelectedLabel : styles.radioUnselectedLabel
                  ]}
                >
                  {item.value}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </View>

      <View style={{ gap: 10, marginTop: 4 }}>
        <ButtonPrimary handlePress={handleUpdate}>
          Alterar leitura
        </ButtonPrimary>

        <ButtonDelete handlePress={() => setModalVisible(true)}>
          Excluir
        </ButtonDelete>
      </View>

      <ConfirmDeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
        title="leitura"
        message="esta leitura"
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  label: {
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
    fontWeight: '600',
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

export default LeiturasAlterar;
