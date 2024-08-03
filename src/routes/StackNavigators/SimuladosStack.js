import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Lazy load das telas
const Simulados = React.lazy(() => import('../../screens/simulados/Simulados'));
const SimuladosForm = React.lazy(() => import('../../screens/simulados/SimuladosForm'));
const SimuladoDetalhes = React.lazy(() => import('../../screens/simulados/SimuladoDetalhes'));
const SimuladoAlterar = React.lazy(() => import('../../screens/simulados/SimuladoAlterar'));

const Stack = createNativeStackNavigator();

const SimuladosStack = React.memo(() => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Simulados" component={Simulados} />
    <Stack.Screen name="SimuladosForm" component={SimuladosForm} />
    <Stack.Screen name="SimuladoDetalhes" component={SimuladoDetalhes} />
    <Stack.Screen name="SimuladoAlterar" component={SimuladoAlterar} />
  </Stack.Navigator>
));

export default SimuladosStack;
