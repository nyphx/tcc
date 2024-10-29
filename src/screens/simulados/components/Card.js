import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextPrimary } from '../../../components';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';

const Card = ({ simulado }) => {
  // Hook para acessar a navegação
  const navigation = useNavigation();

  // Função para lidar com o clique no card e navegar para detalhes
  const handlePress = () => {
    navigation.navigate('SimuladoDetalhes', { id: simulado.id });
  };

  return (
    <Pressable
      style={styles.card}
      onPress={handlePress}
    >
      <View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 6}}>
          <MaterialCommunityIcons name="file-multiple-outline" size={22} color="black" />
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {simulado.nome}
          </Text>
        </View>

          <TextPrimary>{`${simulado.fase}ª fase / dia`}</TextPrimary>
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
});

export default Card;
