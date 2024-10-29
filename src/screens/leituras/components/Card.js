import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TextPrimary } from '../../../components';

const Card = ({ leitura }) => {
  // Hook de navegação para manipular a navegação
  const navigation = useNavigation(); 

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate(
        'LeituraDetalhes', 
        { id: leitura.id }
      )}
    >
      <View style={{ gap: 6 }}>
        <View style={styles.flex}>
          <AntDesign name="user" size={24} color="black" />
          <TextPrimary>
            {leitura.livro}
          </TextPrimary>
        </View>

        <View style={styles.flex}>
          <AntDesign name="book" size={24} color="black" />
          <TextPrimary>
            {leitura.autor}
          </TextPrimary>
        </View>
        
        <View style={styles.flex}>
          <AntDesign name="filetext1" size={24} color="black" />
          <TextPrimary>
            {leitura.vestibular}
          </TextPrimary>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    gap: 6
  },
  card: {
    marginVertical: 8,
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
