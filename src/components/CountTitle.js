import { 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';

import Title from './Title'

export default CountTitle = ({ count, title }) => {
  return (
    <View style={styles.flex}>
      <View style={[styles.container, { backgroundColor: "rgb(191 219 254)" }]}>
        <Text style={[styles.text, { color: "rgb(29 78 216)" }]}>
          {count}
        </Text>
      </View>
      
      <Title>
        {title}
      </Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc', 
    minWidth: 36, 
    height: 34, 
    paddingHorizontal: 10,
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 6
  },
  flex: {
    flexDirection: 'row', 
    alignItems: "center", 
    marginBottom: 10,
    marginTop: 8,
  },
  text: {
    fontSize: 20,
    color: "#707070",
    fontWeight: "600"
  }
});