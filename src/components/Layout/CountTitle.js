import { 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';

import Title from '../Typography/Title'

export default CountTitle = ({ count, title, bgColor, textColor}) => {
  return (
    <View style={styles.flex}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[styles.text, { color: textColor }]}>
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
    minWidth: 34, 
    height: 32, 
    paddingHorizontal: 10,
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 8
  },
  flex: {
    flexDirection: 'row', 
    alignItems: "center",
    marginBottom: 10
  },
  text: {
    fontSize: 20,
    color: "#707070",
    fontWeight: "600"
  }
});