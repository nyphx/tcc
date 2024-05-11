import { useNavigation } from '@react-navigation/native';

import { 
  TouchableOpacity, 
  Text, 
  StyleSheet 
} from 'react-native';

export default RedirectButton = ({ screen, children }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // nome da tela para onde deseja redirecionar
    const screenName = screen;
    // navega para a tela especificada
    navigation.navigate(screenName);
  };

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={handlePress}
    >
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: "white",
    fontWeight: "600",
    fontSize: 16
  },
   button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "rgb(59 130 246)"
  }
});