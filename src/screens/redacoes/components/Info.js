import { View, Text, StyleSheet } from 'react-native'

export default Info = ({ title, info }) => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>
          {title}
        </Text>
        
        <Text style={styles.data}>
          {info}
        </Text>
      </View>
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
    marginTop: -1,
    flexDirection: 'row'
  },
  title: { 
    fontSize: 16,
    width: 135,
    color: 'rgb(107 114 128)',
    fontWeight: 'bold',
    marginRight: 20,
    textTransform: 'uppercase'
  },
  titleNotas: {
    fontSize: 16,
    color: 'rgb(107 114 128)',
    fontWeight: 'bold',
  },
  data: {
    fontSize: 18,
    flex: 2
  }
})