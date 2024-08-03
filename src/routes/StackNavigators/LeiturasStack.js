import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Lazy load das telas
const Leituras = React.lazy(() => import('../../screens/leituras/Leituras'));
const LeiturasForm = React.lazy(() => import('../../screens/leituras/LeiturasForm'));
const LeituraDetalhes = React.lazy(() => import('../../screens/leituras/LeituraDetalhes'));
const LeituraAlterar = React.lazy(() => import('../../screens/leituras/LeituraAlterar'));

const Stack = createNativeStackNavigator();

const LeiturasStack = React.memo(() => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Leituras" component={Leituras} />
    <Stack.Screen name="LeiturasForm" component={LeiturasForm} />
    <Stack.Screen name="LeituraDetalhes" component={LeituraDetalhes} />
    <Stack.Screen name="LeituraAlterar" component={LeituraAlterar} />
  </Stack.Navigator>
));

export default LeiturasStack;
