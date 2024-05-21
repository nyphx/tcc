import { Text, StyleSheet } from 'react-native'

export default Estado = ({ estado }) => {
  let background; 
  let text;

  if (estado == "Lendo") {
    background = "#D2E69E"
    text = "rgb(2 44 34)"
  } else if (estado == "Parado") {
    background = " rgb(252 165 165)"
    text = "rgb(69 10 10)"
  } else if (estado == "Finalizado") {
    background = "rgb(125 211 252)"
    text = "rgb(8 47 73)"
  } else {
    background = "rgb(203 213 225)"
    text = "rgb(30 41 59)"
  }
  
  return (
    <Text style={[
      styles.estado, 
      { 
        backgroundColor: background,
        color: text
      }
    ]}>
      {estado}
    </Text>
  )
}

const styles = StyleSheet.create({
  estado: {
    backgroundColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: -6
  },
})