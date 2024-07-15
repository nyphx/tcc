import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import TextPrimary from '../../../components/TextPrimary';

const Card = ({ redacao, onPress }) => {
  const { navigation } = onPress;

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate(
        'RedacaoDetalhes', 
        { id: redacao.id }
      )}
    >
      <View>
        <TextPrimary>{redacao.tema}</TextPrimary>

        <View style={styles.notas}>
          <Text style={{ fontSize: 24, fontWeight: '600' }}>
            {redacao.notaFinal} 
          </Text>

          <Text style={{ fontSize: 20 }}>
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
    marginTop: 10
  },
});

export default Card;
