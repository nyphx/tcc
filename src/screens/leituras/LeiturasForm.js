import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addLeitura } from './../../services/leiturasService';

import {
  Container,
  Title,
  TextInputWithLabel,
  ButtonPrimary,
} from '../../components';

const LeiturasForm = () => {
  const navigation = useNavigation(); 

  const [leitura, setLeitura] = useState({
    livro: '',
    autor: '',
    totalPaginas: '',
    totalCapitulos: '',
    dataInicio: '',
    dataTerminio: '',
    vestibular: '',
    estado: '',
  });
  const [errors, setErrors] = useState({
    livro: '',
    autor: '',
    totalPaginas: '',
    totalCapitulos: '',
    dataInicio: '',
    dataTerminio: '',
    vestibular: '',
    estado: '',
  });

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

  const validate = () => {
    let valid = true;
    let errors = {
      livro: '',
      autor: '',
      totalPaginas: '',
      totalCapitulos: '',
      dataInicio: '',
      dataTerminio: '',
      vestibular: '',
      estado: '',
    };

    if (!leitura.livro) {
      errors.livro = 'Nome do livro é obrigatório';
      valid = false;
    }

    if (!leitura.autor) {
      errors.autor = 'Nome do autor é obrigatório';
      valid = false;
    }

    if (!leitura.vestibular) {
      errors.vestibular = 'Vestibular é obrigatório';
      valid = false;
    }

    if (!leitura.dataInicio) {
      errors.dataInicio = 'Data de início é obrigatória';
      valid = false;
    }

    if (!leitura.dataTerminio) {
      errors.dataTerminio = 'Data de término é obrigatória';
      valid = false;
    }

    if (!leitura.totalPaginas) {
      errors.totalPaginas = 'Total de páginas é obrigatório';
      valid = false;
    }

    if (!leitura.totalCapitulos) {
      errors.totalCapitulos = 'Total de capítulos é obrigatório';
      valid = false;
    }

    if (!leitura.estado) {
      errors.estado = 'Estado é obrigatório';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      const newLeitura = {
        ...leitura,
        atualPaginas: "0",
        atualCapitulos: "0"
      };

      await addLeitura(newLeitura);
      navigation.goBack();
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <Container>
      <Title>Adicionar leitura</Title>

      <View>
        <TextInputWithLabel
          label="Nome do livro"
          placeholder="Ex: A Ilustre Casa de Ramires"
          value={leitura.livro}
          onChangeText={text => handleInputChange('livro', text)}
          keyboardType="default"
          errorMessage={errors.livro}
        />

        <TextInputWithLabel
          label="Nome do Autor"
          placeholder="Ex: Eça de Queiros"
          value={leitura.autor}
          onChangeText={text => handleInputChange('autor', text)}
          keyboardType="default"
          errorMessage={errors.autor}
        />

        <TextInputWithLabel
          label="Vestibular"
          placeholder="Ex: FUVEST"
          value={leitura.vestibular}
          onChangeText={text => handleInputChange('vestibular', text)}
          keyboardType="default"
          errorMessage={errors.vestibular}
        />

        <View style={styles.row}>
          <TextInputWithLabel
            label="Data do início"
            placeholder="Ex: 20/03/2023"
            value={leitura.dataInicio}
            onChangeText={text => handleInputChange('dataInicio', text)}
            keyboardType="default"
            twoColumn={true}
            errorMessage={errors.dataInicio}
          />

          <TextInputWithLabel
            label="Data do término"
            placeholder="Ex: 03/04/2023"
            value={leitura.dataTerminio}
            onChangeText={text => handleInputChange('dataTerminio', text)}
            keyboardType="default"
            twoColumn={true}
            errorMessage={errors.dataTerminio}
          />
        </View>

        <View style={styles.row}>
          <TextInputWithLabel
            label="Total de páginas"
            placeholder="Ex: 350"
            value={leitura.totalPaginas}
            onChangeText={text => handleInputChange('totalPaginas', text)}
            keyboardType="numeric"
            twoColumn={true}
            errorMessage={errors.totalPaginas}
          />

          <TextInputWithLabel
            label="Total de capítulos"
            placeholder="Ex: 20"
            value={leitura.totalCapitulos}
            onChangeText={text => handleInputChange('totalCapitulos', text)}
            keyboardType="numeric"
            twoColumn={true}
            errorMessage={errors.totalCapitulos}
          />
        </View>

        <View style={styles.itemContainerForm}>
          <Text style={styles.label}>
            Estado
          </Text>

          {radioButtons.map((item) => (
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
                  item.value === leitura.estado ? styles.radioSelectedLabel : styles.radioUnselectedLabel,
                ]}
              >
                {item.value}
              </Text>
            </Pressable>
          ))}

          {errors.estado ? <Text style={styles.errorText}>{errors.estado}</Text> : null}
        </View>
      </View>

      <ButtonPrimary handlePress={handleSubmit}>
        Adicionar leitura
      </ButtonPrimary>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "500",
  },
  radioButtons: {
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  radioLabels: {
    textAlign: 'center',
    fontWeight: "600",
    fontSize: 16,
  },
  radioSelected: {
    backgroundColor: 'rgb(219 234 254)',
    borderWidth: 2,
    borderColor: 'rgb(37 99 235)',
  },
  radioUnselected: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgb(203 213 225)',
  },
  radioSelectedLabel: {
    color: 'rgb(37 99 235)',
  },
  radioUnselectedLabel: {
    color: 'rgb(100 116 139)',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default LeiturasForm;
