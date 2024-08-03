import { 
  Text, 
  View,
  TextInput,
  StyleSheet
} from 'react-native';

const TextInputWithLabel = ({ 
  label, 
  placeholder,
  value, 
  onChangeText, 
  keyboardType,
  numberOfLines,
  twoColumn = false,
  errorMessage,
}) => {
  return (
    <View style={[{ marginBottom: 14 }, twoColumn && { flex: 1 }]}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        multiline
        numberOfLines={numberOfLines}
        style={[styles.input, errorMessage && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>
          {errorMessage}
        </Text>
      ) : null}
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
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600'
  },
});

export default TextInputWithLabel;
