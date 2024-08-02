import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { calculatePercentage } from '../../../components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getAssuntosByDisciplinaId } from '../../../services/disciplinasService';

const DisciplinaCard = React.memo(({ disciplina }) => {
  // Hook de navegação para manipular a navegação
  const navigation = useNavigation(); 

  const [assuntosTotais, setAssuntosTotais] = useState(0);
  const [assuntosCompletos, setAssuntosCompletos] = useState(0);

  const fetchData = async () => {
    try {
      const assuntos = await getAssuntosByDisciplinaId(disciplina.id);

      let total = 0;
      let completos = 0;

      assuntos.forEach(doc => {
        total += 1;
        if (doc.estado === 'Finalizado') {
          completos += 1;
        }
      });

      setAssuntosTotais(total);
      setAssuntosCompletos(completos);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [disciplina.id])
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate(
          'DisciplinaDetalhes', 
          { id: disciplina.id }
        )}
      >
        <View style={styles.header}>
          <Text style={styles.disciplinaNome}>
            {disciplina.nome}
          </Text>

          <Text style={styles.percentage}>
            {calculatePercentage(assuntosTotais, assuntosCompletos)}%
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <Progress.Bar 
            progress={assuntosTotais ? assuntosCompletos / assuntosTotais : 0} 
            width={null}
            height={12}
            color={'rgba(88, 94, 255, 1)'}
            unfilledColor={'rgba(217, 217, 217, 1)'}
            borderWidth={0}
          />
        </View>

        <Text style={styles.statusText}>
          {assuntosCompletos} de {assuntosTotais} assuntos foram estudados
        </Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disciplinaNome: {
    fontSize: 20,
    fontWeight: '600',
  },
  percentage: {
    fontSize: 20,
  },
  progressContainer: {
    marginVertical: 8,
  },
  statusText: {
    fontSize: 18,
    color: '#505050',
  },
});

export default DisciplinaCard;
