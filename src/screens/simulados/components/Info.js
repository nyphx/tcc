import { View, Text, StyleSheet } from 'react-native'

const Item = ({ title, info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      
      <Text style={styles.data}>
        {info}
      </Text>
    </View>
  )
}

export default Info = ({ title, info }) => {
  return (
    <View>
      <Item 
        title={title}
        info={info}
      />
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
    width: 150,
    color: 'rgb(107 114 128)',
    fontWeight: 'bold',
    marginRight: 20,
    textTransform: 'uppercase'
  },
  data: {
    fontSize: 16,
    textAlign: 'center'
  }
})