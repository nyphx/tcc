import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Lazy load das telas
const Disciplinas = React.lazy(() => import('../../screens/disciplinas/Disciplinas'));
const DisciplinasForm = React.lazy(() => import('../../screens/disciplinas/DisciplinasForm'));
const DisciplinaDetalhes = React.lazy(() => import('../../screens/disciplinas/DisciplinaDetalhes'));
const DisciplinaAlterar = React.lazy(() => import('../../screens/disciplinas/DisciplinaAlterar'));
const AssuntoForm = React.lazy(() => import('../../screens/disciplinas/AssuntoForm'));
const AssuntoAlterar = React.lazy(() => import('../../screens/disciplinas/AssuntoAlterar'));

const Stack = createNativeStackNavigator();

const DisciplinasStack = React.memo(() => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Disciplinas" component={Disciplinas} />
    <Stack.Screen name="DisciplinasForm" component={DisciplinasForm} />
    <Stack.Screen name="DisciplinaDetalhes" component={DisciplinaDetalhes} />
    <Stack.Screen name="DisciplinaAlterar" component={DisciplinaAlterar} />
    <Stack.Screen name="AssuntoForm" component={AssuntoForm} />
    <Stack.Screen name="AssuntoAlterar" component={AssuntoAlterar} />
  </Stack.Navigator>
));

export default DisciplinasStack;
