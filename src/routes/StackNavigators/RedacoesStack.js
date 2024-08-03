import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Lazy load das telas
const Redacoes = React.lazy(() => import('../../screens/redacoes/Redacoes'));
const RedacoesForm = React.lazy(() => import('../../screens/redacoes/RedacoesForm'));
const RedacaoDetalhes = React.lazy(() => import('../../screens/redacoes/RedacaoDetalhes'));
const RedacaoAlterar = React.lazy(() => import('../../screens/redacoes/RedacaoAlterar'));
const CompetenciaForm = React.lazy(() => import('../../screens/redacoes/CompetenciaForm'));
const CompetenciaAlterar = React.lazy(() => import('../../screens/redacoes/CompetenciaAlterar'));

const Stack = createNativeStackNavigator();

const RedacoesStack = React.memo(() => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Redacoes" component={Redacoes} />
    <Stack.Screen name="RedacoesForm" component={RedacoesForm} />
    <Stack.Screen name="RedacaoDetalhes" component={RedacaoDetalhes} />
    <Stack.Screen name="RedacaoAlterar" component={RedacaoAlterar} />
    <Stack.Screen name="CompetenciaForm" component={CompetenciaForm} />
    <Stack.Screen name="CompetenciaAlterar" component={CompetenciaAlterar} />
  </Stack.Navigator>
));

export default RedacoesStack;
