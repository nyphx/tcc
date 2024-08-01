import * as Progress from 'react-native-progress';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Info from './Info';

const ItemCompetencia = ({ competencia, idRedacao }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Competência {competencia.numeroCompetencia}</Text>
        <Pressable
          style={styles.editButton}
          onPress={() => navigation.navigate(
            'CompetenciaAlterar',
            { idCompetencia: competencia.id, idRedacao: idRedacao }
          )}
        >
          <MaterialIcons name="edit" size={24} color="#505050" />
        </Pressable>
      </View>

      <Progress.Bar
        progress={Number(competencia.notaFinal) / Number(competencia.notaMaxima)}
        width={null}
        height={24}
        color='rgba(88, 94, 255, 1)'
        unfilledColor='rgba(217, 217, 217, 1)'
        borderWidth={0}
      />

      <View style={styles.infoContainer}>
        <Info title="Nota tirada" info={competencia.notaFinal} />
        <Info title="Nota máxima" info={competencia.notaMaxima} />
        <Info title="Descrição" info={competencia.descricao} twoColumn={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  editButton: {
    padding: 6,
    marginLeft: 4,
  },
  infoContainer: {
    marginHorizontal: -20,
    marginTop: 20,
  },
});

export default ItemCompetencia;
