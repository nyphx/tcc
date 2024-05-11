import { 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';

export default Header = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  }
});