import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { TextPrimary } from '../../../components';
import { useNavigation } from '@react-navigation/native';

// Componente Card para exibir informações da redação
const Card = ({ redacao }) => {
  // Hook para acessar a navegação
  const navigation = useNavigation();

  // Função para lidar com o clique no card e navegar para a tela de detalhes da redação
  const handlePress = () => {
    navigation.navigate('RedacaoDetalhes', { id: redacao.id });
  };

  return (
    // Componente Pressable que responde ao toque do usuário
    <Pressable
      style={styles.card}
      onPress={handlePress}
    >
      <View>
        {/* Exibe o tema da redação usando o componente TextPrimary */}
        <TextPrimary>{redacao.tema}</TextPrimary>

        {/* Container para exibir a nota final e a nota máxima */}
        <View style={styles.notas}>
          <Text style={styles.notaFinal}>
            {redacao.notaFinal}
          </Text>
          <Text style={styles.notaMaxima}>
            / {redacao.notaMaxima}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  notas: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    backgroundColor: '#ddd',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  notaFinal: {
    fontSize: 24,
    fontWeight: '600',
  },
  notaMaxima: {
    fontSize: 20,
  },
});

export default Card;
