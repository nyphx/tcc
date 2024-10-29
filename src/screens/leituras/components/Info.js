import { View, Text, StyleSheet } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export default Info = ({ title, info, center=false, iconName }) => {
  return (
    <View style={styles.container}>
      { iconName &&
        <AntDesign name={iconName} size={24} color="black" />
      }

      <Text style={styles.title}>
        {title}
      </Text>
      
      <Text style={[styles.data, center && { textAlign: 'center'} ]}>
        {info}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    marginTop: -1,
  },
  title: {
    fontSize: 16,
    width: 120,
    color: 'rgb(107 114 128)',
    fontWeight: '700',
    marginRight: 10,
    marginLeft: 8,
    textTransform: 'uppercase'
  },
  data: {
    fontSize: 18,
    flex: 1,
  }
})