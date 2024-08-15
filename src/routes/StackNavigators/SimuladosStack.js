import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Simulados from '../../screens/simulados/Simulados';
import SimuladosForm from '../../screens/simulados/SimuladosForm';
import SimuladoDetalhes from '../../screens/simulados/SimuladoDetalhes';
import SimuladoAlterar from '../../screens/simulados/SimuladoAlterar';

const Stack = createNativeStackNavigator();

const SimuladosStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Simulados" component={Simulados} />
    <Stack.Screen name="SimuladosForm" component={SimuladosForm} />
    <Stack.Screen name="SimuladoDetalhes" component={SimuladoDetalhes} />
    <Stack.Screen name="SimuladoAlterar" component={SimuladoAlterar} />
  </Stack.Navigator>
);

export default SimuladosStack;
