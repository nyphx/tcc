import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';

import NavDisciplinas from './../StackNavigators/DisciplinasStack';
import NavSimulados from './../StackNavigators/SimuladosStack';
import NavRedacoes from './../StackNavigators/RedacoesStack';
import NavLeituras from './../StackNavigators/LeiturasStack';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route) => {
  const iconNames = {
    NavDisciplinas: 'list',
    NavSimulados: 'documents',
    NavLeituras: 'book',
    NavRedacoes: 'pencil'
  };
  return ({ color }) => <Entypo name={iconNames[route.name]} size={24} color={color} />;
};

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="NavDisciplinas"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { height: 70, paddingBottom: 12, paddingTop: 12 },
      tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
      tabBarIcon: getTabBarIcon(route),
      tabBarActiveTintColor: 'rgb(59 130 246)',
      tabBarInactiveTintColor: 'gray'
    })}
  >
    <Tab.Screen name="NavDisciplinas" component={NavDisciplinas} options={{ title: 'Disciplinas' }} />
    <Tab.Screen name="NavSimulados" component={NavSimulados} options={{ title: 'Simulados' }} />
    <Tab.Screen name="NavRedacoes" component={NavRedacoes} options={{ title: 'Redações' }} />
    <Tab.Screen name="NavLeituras" component={NavLeituras} options={{ title: 'Leituras' }} />
  </Tab.Navigator>
);


export default TabNavigator;
