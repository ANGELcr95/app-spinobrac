//Dependencies react Natigation && elemets
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import RiskScreen from './screens/RiskScreen'
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen'

//Styles Icons
import routesIcons from './custom/routesIcons';

//Redux && context
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { TodoApp } from './screens/TodoApp'; 
import { StateProvider } from './context/StateContext';

// Globas variables
import GLOBALS from './Globals';

// Icons
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function StackReportScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="ReportScreen" 
          component={ReportScreen}
          options= {()=> ({
            title: "Reporte",
            headerStyle: { backgroundColor: GLOBALS.COLOR.PRIMARY},
            headerTitleStyle: { color: '#fff'},
            headerTintColor: '#fff', 
          })}
        />
      </Stack.Navigator>
  );
}

function StackRiskScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="RiskScreen" 
        component={RiskScreen}  
        options= {({navigation})=> ({
          title: 'Lista reportes',
          headerStyle: { backgroundColor: '#222f3e'},
          headerTitleStyle: { color: '#fff'},
          headerRight: () => (
            <TouchableOpacity onPress={()=> {
              navigation.navigate('ReportScreen')
              }}> 
              <Text style={{ color: '#fff', marginRight: 10, fontSize: 15}}>Nuevo</Text>
            </TouchableOpacity>
            )
        })}
      />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <StateProvider>
      <NavigationContainer>
      <Tab.Navigator
       screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routesIcons(focused, route.name)
          return <Ionicons name={iconName} size={size} color={color}/>;
          },
          tabBarStyle: {
            height:65,
            paddingBottom:10,
            paddingTop:10,
            backgroundColor: GLOBALS.COLOR.PRIMARY
        },
      })}
        tabBarOptions={{
          activeTintColor: GLOBALS.COLOR.ICONS,
          inactiveTintColor: GLOBALS.COLOR.ICONSDOWN,
        }}>
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="todo" component={TodoApp} />
        <Tab.Screen 
          name="ReportScreen"
          options= {()=> ({
            title: "Reporte",
            headerShown: false
          })}
          component={StackReportScreen} />
        <Tab.Screen 
          name="RiskScreen"
          options= {()=> ({
            title: "Empleados",
            headerShown: false
          })}
         component={StackRiskScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    </StateProvider>
    </Provider>
  );
}