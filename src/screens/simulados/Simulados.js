import { 
  Text, 
  View,
  TextInput,
  StyleSheet
} from 'react-native';

import { 
  Typography, 
  Buttons, 
  Count,
  General,
  Card
} from '../../styles/index.js';

import Title from '../../components/Title'
import Header from '../../components/Header'
import RedirectButton from '../../components/RedirectButton'
import Container from '../../components/Container'

export default Simulados = () => {
  return (
    <Container>
      <Header>
        <Title>Simulados</Title>

        <RedirectButton screen="SimuladosForm">
          Adicionar simulado
        </RedirectButton>
      </Header>

      <View>
        <Text>dfçklajdflçadk</Text>
      </View>
    </Container>
  );
};