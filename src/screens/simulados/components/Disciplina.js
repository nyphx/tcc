import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { calculatePercentage, Info } from './../../../components';

const Disciplina = ({ disciplina, dados }) => (
  <View key={disciplina}>
    <Text style={styles.conteudoTitulo}>
      {disciplina}
    </Text>

    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <Progress.Bar 
          progress={dados.acertadas / dados.totais} 
          width={null}
          height={24}
          color={'rgba(88, 94, 255, 1)'}
          unfilledColor={'rgba(217, 217, 217, 1)'}
          borderWidth={0}
        />
      </View>

      <Text style={styles.progressPercentage}>
        {calculatePercentage(dados.totais, dados.acertadas)}%
      </Text>
    </View>

    <View style={styles.infoContainer}>
      <Info 
        title="Acertos"
        info={`${dados.acertadas} questões`}
      />

      <Info 
        title="Total"
        info={`${dados.totais} questões`}
      />  
    </View>
  </View>
);

const styles = StyleSheet.create({
  conteudoTitulo: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
  },
  progressPercentage: {
    fontWeight: '700',
    fontSize: 20,
  },
  infoContainer: {
    marginHorizontal: -20,
  },
});

export default Disciplina;
