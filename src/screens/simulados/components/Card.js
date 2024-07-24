import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';

import { TextPrimary } from '../../../components';

const Card = ({ simulado, onPress }) => {
  const { navigation } = onPress;

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate(
        'SimuladoDetalhes', 
        { id: simulado.id }
      )}
    >
      <View>
        <TextPrimary>{simulado.nome}</TextPrimary>
        <TextPrimary>{simulado.fase}ª fase / dia</TextPrimary>
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
    justifyContent: 'space-between',
  },
  notas: {
    fontSize: 20,
    backgroundColor: '#ddd',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});

export default Card;
