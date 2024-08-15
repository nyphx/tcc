import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Redacoes from '../../screens/redacoes/Redacoes';
import RedacoesForm from '../../screens/redacoes/RedacoesForm';
import RedacaoDetalhes from '../../screens/redacoes/RedacaoDetalhes';
import RedacaoAlterar from '../../screens/redacoes/RedacaoAlterar';
import CompetenciaForm from '../../screens/redacoes/CompetenciaForm';
import CompetenciaAlterar from '../../screens/redacoes/CompetenciaAlterar';

const Stack = createNativeStackNavigator();

const RedacoesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Redacoes" component={Redacoes} />
    <Stack.Screen name="RedacoesForm" component={RedacoesForm} />
    <Stack.Screen name="RedacaoDetalhes" component={RedacaoDetalhes} />
    <Stack.Screen name="RedacaoAlterar" component={RedacaoAlterar} />
    <Stack.Screen name="CompetenciaForm" component={CompetenciaForm} />
    <Stack.Screen name="CompetenciaAlterar" component={CompetenciaAlterar} />
  </Stack.Navigator>
);

export default RedacoesStack;
