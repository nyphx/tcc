import { View, Text, StyleSheet, ViewBase } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export default Info = ({ title, info, iconName }) => {
  return (
    <View>
      <View style={ styles.container }>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign name={iconName} size={20} color="rgb(107 114 128)" />
          </View>

          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        
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
    alignItems: 'center',
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
    width: 140,
    color: 'rgb(107 114 128)',
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft: 8,
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