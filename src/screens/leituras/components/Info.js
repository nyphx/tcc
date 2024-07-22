import { View, Text, StyleSheet } from 'react-native'

export default Info = ({ title, info, center=false }) => {
  return (
    <View style={styles.container}>
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
    width: 130,
    color: 'rgb(107 114 128)',
    fontWeight: '700',
    marginRight: 20,
    textTransform: 'uppercase'
  },
  data: {
    fontSize: 18,
    flex: 1,
  }
})