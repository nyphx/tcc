import { 
  Text, 
  StyleSheet 
} from 'react-native';

export default TextPrimary = ({ children }) => {
  return (
    <Text style={styles.text}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  }
});