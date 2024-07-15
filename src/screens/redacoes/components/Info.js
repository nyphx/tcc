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

const Nota = ({ notaFinal, notaMaxima }) => {
  return (
    <View style={[styles.container, { flexDirection: 'column' }]}>
      <Text style={styles.titleNotas}>
        Nota da redação
      </Text>
      
      <Text>{ notaFinal } / { notaMaxima }</Text>
    </View>
  )
}

export default Info = ({ redacao }) => {
  return (
    <View>
      <Nota
        notaFinal={redacao.notaFinal}
        notaMaxima={redacao.notaMaxima}
      />

      <Item 
        title="Data realizada"
        info={redacao.data}
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
    width: 100,
    color: 'rgb(107 114 128)',
    fontWeight: 'bold',
    marginRight: 20,
    flex: 1
  },
  titleNotas: {
    fontSize: 16,
    color: 'rgb(107 114 128)',
    fontWeight: 'bold',
  },
  data: {
    fontSize: 16,
  }
})