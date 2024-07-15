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
  keyboardType,
  numberOfLines
}) => {
  return (
    <View style={{ marginBottom: 14, flex: 1 }}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        multiline
        numberOfLines={numberOfLines}
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
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "500"
  },
  input: {
    textAlignVertical: "top",
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgb(203 213 225)',
    borderRadius: 6,
    paddingTop: 14,
    paddingBottom: 6,
    paddingHorizontal: 16,
    backgroundColor: 'white'
  }
})