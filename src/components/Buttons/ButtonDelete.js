import { useNavigation } from '@react-navigation/native';

import { 
  TouchableOpacity, 
  Text, 
  StyleSheet 
} from 'react-native';

export default ButtonDelete = ({ handlePress, children }) => {
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
    color: "rgb(220 38 38)",
    fontWeight: "600",
    fontSize: 16
  },
   button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgb(220 38 38)'
  }
});