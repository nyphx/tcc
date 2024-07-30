import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ButtonEdit = ({ routeName, id }) => {
  const navigation = useNavigation();

  // Adicionando uma verificação para id
  if (!id) {
    console.error('ID is not provided to ButtonEdit');
    return null; // Não renderiza o botão se id não estiver presente
  }

  return (
    <TouchableOpacity 
      style={styles.editButton} 
      onPress={() => navigation.navigate(routeName, { id })}
    >
      <MaterialIcons name="edit" size={26} color="#505050" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editButton: {
    padding: 10
  }
});

export default ButtonEdit;
