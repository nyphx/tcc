import { 
  StyleSheet, 
  ScrollView,
  View
} from 'react-native';

export default Container = ({ children }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
    gap: 20
  }
});