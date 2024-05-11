import { 
  Text, 
  View,
  TextInput,
  StyleSheet
} from 'react-native';

export default TextInputWithLabel = ({ 
  label, 
  placeholder,
  value, 
  onChangeText, 
  keyboardType 
}) => {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  label : {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "500"
  },
  input : {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgb(203 213 225)',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: 'white'
  }
})