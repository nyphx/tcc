import { 
  TouchableOpacity, 
  Text, 
  StyleSheet 
} from 'react-native';

export default Button = ({ handlePress, children }) => {
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
    color: "#505050",
    fontWeight: "600",
    fontSize: 16
  },
   button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
    width: '100%'
  }
});