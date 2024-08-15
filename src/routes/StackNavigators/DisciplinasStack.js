import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Disciplinas from '../../screens/disciplinas/Disciplinas';
import DisciplinasForm from '../../screens/disciplinas/DisciplinasForm';
import DisciplinaDetalhes from '../../screens/disciplinas/DisciplinaDetalhes';
import DisciplinaAlterar from '../../screens/disciplinas/DisciplinaAlterar';
import AssuntoForm from '../../screens/disciplinas/AssuntoForm';
import AssuntoAlterar from '../../screens/disciplinas/AssuntoAlterar';

const Stack = createNativeStackNavigator();

const DisciplinasStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Disciplinas" component={Disciplinas} />
    <Stack.Screen name="DisciplinasForm" component={DisciplinasForm} />
    <Stack.Screen name="DisciplinaDetalhes" component={DisciplinaDetalhes} />
    <Stack.Screen name="DisciplinaAlterar" component={DisciplinaAlterar} />
    <Stack.Screen name="AssuntoForm" component={AssuntoForm} />
    <Stack.Screen name="AssuntoAlterar" component={AssuntoAlterar} />
  </Stack.Navigator>
);

export default DisciplinasStack;
