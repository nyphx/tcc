import { StyleSheet, Text, View, Pressable } from 'react-native';

export default RadioForm = ({ label, options, selectedValue, onValueChange }) => {
  return (
    <View>
      <Text style={styles.label}>
        {label}
      </Text>

      {options.map((item) => (
        <Pressable 
          key={item.id}
          onPress={() => onValueChange(item.value)}
          style={[
            styles.buttons,
            item.value === selectedValue ? styles.selected : styles.unselected,
          ]}
        >
          <Text 
            style={[
              styles.radioLabels,
              item.value === selectedValue ? styles.selectedLabel : styles.unselectedLabel,
            ]}
          >
            {item.value}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainerForm: {
    marginTop: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgb(203 213 225)',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: 'white',
  },
  buttons: {
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  radioLabels: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16,
  },
  selected: {
    backgroundColor: 'rgb(219 234 254)',
    borderWidth: 2,
    borderColor: 'rgb(37 99 235)',
  },
  unselected: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgb(203 213 225)',
  },
  selectedLabel: {
    color: 'rgb(37 99 235)',
  },
  unselectedLabel: {
    color: 'rgb(100 116 139)',
  },
});
