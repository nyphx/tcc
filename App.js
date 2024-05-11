import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Feather from '@expo/vector-icons/Feather';

import Disciplinas from './src/screens/disciplinas/Disciplinas.js'
import DisciplinasForm from './src/screens/disciplinas/DisciplinasForm.js'
import DisciplinaDetalhes from './src/screens/disciplinas/DisciplinaDetalhes.js'
import DisciplinaAlterar from './src/screens/disciplinas/DisciplinaAlterar.js'
import AssuntoForm from './src/screens/disciplinas/AssuntoForm.js'
import AssuntoAlterar from './src/screens/disciplinas/AssuntoAlterar.js'

import Simulados from './src/screens/simulados/Simulados.js'
import SimuladosForm from './src/screens/simulados/SimuladosForm.js'

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
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="NavSimulados"
        screenOptions={({ route }) => ({ 
          headerShown: false,
          tabBarStyle: { 
            height: 64,
            paddingBottom: 12,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500"
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'NavDisciplinas') {
              iconName = 'book'
            } if (route.nome === 'NavSimulados') {
              iconName = 'file-text'
            }

            return <Feather name={iconName} size={24} color={color} />;
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

      </Tab.Navigator>
    </NavigationContainer>
  );
}