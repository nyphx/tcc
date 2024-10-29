import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextPrimary } from '../../../components';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Card = ({ simulado }) => {
  // Hook para acessar a navegação
  const navigation = useNavigation();

  // Função para lidar com o clique no card e navegar para detalhes
  const handlePress = () => {
    navigation.navigate('SimuladoDetalhes', { id: simulado.id });
  };

  // Função para calcular o total de acertos e questões.
  const calcularAcertos = (conteudos) => {
    let acertadas = 0;
    let totais = 0;

    if (conteudos) {
      for (let disciplina in conteudos) {
        if (conteudos.hasOwnProperty(disciplina)) {
          let dados = conteudos[disciplina];
          acertadas += Number(dados.acertadas);
          totais += Number(dados.totais);
        }
      }
    }

    return { acertadas, totais };
  };

  // Obtém o total de acertos e questões dos conteúdos do simulado.
  const { acertadas, totais } = calcularAcertos(simulado.conteudos);

  return (
    <Pressable
      style={styles.card}
      onPress={handlePress}
    >
      <View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 4}}>
          <MaterialCommunityIcons name="file-multiple-outline" size={22} color="black" />
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {simulado.nome}
          </Text>
        </View>

          <TextPrimary>{`${simulado.fase}ª fase / dia`}</TextPrimary>
      </View>

      <View style={styles.notas}>
          <Text style={styles.notaFinal}>
            {acertadas}
          </Text>
          <Text style={styles.notaMaxima}>
            / {totais}
          </Text>
        </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  notas: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgb(226 232 240)'
  },
  notaFinal: {
    fontSize: 22,
    fontWeight: '600',
    paddingBottom: 4
  },
  notaMaxima: {
    fontSize: 20,
  },
});

export default Card;
