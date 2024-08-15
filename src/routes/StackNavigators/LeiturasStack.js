import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Leituras from '../../screens/leituras/Leituras';
import LeiturasForm from '../../screens/leituras/LeiturasForm';
import LeituraDetalhes from '../../screens/leituras/LeituraDetalhes';
import LeituraAlterar from '../../screens/leituras/LeituraAlterar';

const Stack = createNativeStackNavigator();

const LeiturasStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Leituras" component={Leituras} />
    <Stack.Screen name="LeiturasForm" component={LeiturasForm} />
    <Stack.Screen name="LeituraDetalhes" component={LeituraDetalhes} />
    <Stack.Screen name="LeituraAlterar" component={LeituraAlterar} />
  </Stack.Navigator>
);

export default LeiturasStack;
