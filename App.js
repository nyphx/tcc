import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';

import Disciplinas from './src/screens/disciplinas/Disciplinas.js'
import DisciplinasForm from './src/screens/disciplinas/DisciplinasForm.js'
import DisciplinaDetalhes from './src/screens/disciplinas/DisciplinaDetalhes.js'
import DisciplinaAlterar from './src/screens/disciplinas/DisciplinaAlterar.js'
import AssuntoForm from './src/screens/disciplinas/AssuntoForm.js'
import AssuntoAlterar from './src/screens/disciplinas/AssuntoAlterar.js'

import Simulados from './src/screens/simulados/Simulados.js'
import SimuladosForm from './src/screens/simulados/SimuladosForm.js'
import SimuladoDetalhes from './src/screens/simulados/SimuladoDetalhes.js'
import SimuladoAlterar from './src/screens/simulados/SimuladoAlterar.js'

import Leituras from './src/screens/leituras/Leituras.js'
import LeiturasForm from './src/screens/leituras/LeiturasForm.js'
import LeituraDetalhes from './src/screens/leituras/LeituraDetalhes.js'
import LeituraAlterar from './src/screens/leituras/LeituraAlterar.js'

import Redacoes from './src/screens/redacoes/Redacoes.js'
import RedacoesForm from './src/screens/redacoes/RedacoesForm.js'
import RedacaoDetalhes from './src/screens/redacoes/RedacaoDetalhes.js'
import CompetenciaForm from './src/screens/redacoes/CompetenciaForm.js'
import CompetenciaAlterar from './src/screens/redacoes/CompetenciaAlterar.js'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const NavDisciplinas = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Disciplinas" 
        component={Disciplinas}
      />

      <Stack.Screen 
        name="DisciplinasForm" 
        component={DisciplinasForm}
      />

      <Stack.Screen 
        name="DisciplinaDetalhes" 
        component={DisciplinaDetalhes}
      />

      <Stack.Screen 
        name="DisciplinaAlterar" 
        component={DisciplinaAlterar}
      />

      <Stack.Screen 
        name="AssuntoForm" 
        component={AssuntoForm}
      />
      
      <Stack.Screen 
        name="AssuntoAlterar" 
        component={AssuntoAlterar}
      />
    </Stack.Navigator>
  )
}

const NavSimulados = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Simulados" 
        component={Simulados}
      />

      <Stack.Screen 
        name="SimuladosForm" 
        component={SimuladosForm}
      />

      <Stack.Screen 
        name="SimuladoDetalhes" 
        component={SimuladoDetalhes}
      />

      <Stack.Screen 
        name="SimuladoAlterar" 
        component={SimuladoAlterar}
      />
    </Stack.Navigator>
  )
}

const NavRedacoes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Redacoes" 
        component={Redacoes}
      />

      <Stack.Screen 
        name="RedacoesForm" 
        component={RedacoesForm}
      />

      <Stack.Screen 
        name="RedacaoDetalhes" 
        component={RedacaoDetalhes}
      />

      <Stack.Screen 
        name="CompetenciaForm" 
        component={CompetenciaForm}
      />

      <Stack.Screen 
        name="CompetenciaAlterar" 
        component={CompetenciaAlterar}
      />
    </Stack.Navigator>
  )
}

const NavLeituras = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Leituras" 
        component={Leituras}
      />

      <Stack.Screen 
        name="LeiturasForm" 
        component={LeiturasForm}
      />

      <Stack.Screen 
        name="LeituraDetalhes" 
        component={LeituraDetalhes}
      />

      <Stack.Screen 
        name="LeituraAlterar" 
        component={LeituraAlterar}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="white" />
      
      <NavigationContainer>
        <Tab.Navigator 
          initialRouteName="NavRedacoes"
          screenOptions={({ route }) => ({ 
            headerShown: false,
            tabBarStyle: { 
              height: 70,
              paddingBottom: 12,
              paddingTop: 12,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "500"
            },
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === 'NavDisciplinas') iconName = 'list';
              if (route.name === 'NavSimulados') iconName = 'documents';
              if (route.name === 'NavLeituras') iconName = 'book';
              if (route.name === 'NavRedacoes') iconName = 'pencil';

              return <Entypo name={iconName} size={24} color={color} />;
            },
            tabBarActiveTintColor: 'rgb(59 130 246)',
            tabBarInactiveTintColor: 'gray',
        })}>

          <Tab.Screen 
            name="NavDisciplinas" 
            component={NavDisciplinas} 
            options={{
              title: "Discplinas"
            }}
          />
          
          <Tab.Screen 
            name="NavSimulados" 
            component={NavSimulados} 
            options={{
              title: "Simulados"
            }}
          />

          <Tab.Screen 
            name="NavRedacoes" 
            component={NavRedacoes} 
            options={{
              title: "Redações"
            }}
          />

          <Tab.Screen 
            name="NavLeituras" 
            component={NavLeituras} 
            options={{
              title: "Leituras"
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}