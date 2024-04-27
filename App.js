import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Disciplinas from './src/views/disciplinas/Disciplinas.js'
import DisciplinasForm from './src/views/disciplinas/DisciplinasForm.js'
import DisciplinaDetalhes from './src/views/disciplinas/DisciplinaDetalhes.js'
import DisciplinaAlterar from './src/views/disciplinas/DisciplinaAlterar.js'
import AssuntoForm from './src/views/disciplinas/AssuntoForm.js'

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
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name="NavDisciplinas" 
          component={NavDisciplinas} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}