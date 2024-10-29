import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
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
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {/* Exibe o tema da redação usando o componente TextPrimary */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18 }}>
            {redacao.tema}
          </Text>
        </View>

        {/* Container para exibir a nota final e a nota máxima */}
        <View style={styles.notas}>
          <Text style={styles.notaFinal}>
            {redacao.notaFinal}
          </Text>
          <Text style={styles.notaMaxima}>
            {redacao.notaMaxima}
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
    backgroundColor: 'rgb(226 232 240)',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  notaFinal: {
    fontSize: 22,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderColor: '#202020',
    paddingBottom: 4
  },
  notaMaxima: {
    fontSize: 20,
  },
});

export default Card;
