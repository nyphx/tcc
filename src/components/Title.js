import { 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';

export default Title = ({ children }) => {
  return (
    <Text style={styles.title}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700"
  }
});