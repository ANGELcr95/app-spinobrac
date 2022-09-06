import React from 'react'
import { Text, 
  TouchableOpacity // eject touch por ejemplo a otrruta uso navigation que es una funcion en el atributo options por que inicialmente retornaba un object pero necsitaba un parametro por eso el metodo
 } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RiskScreen from './screens/RiskScreen'
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen'
import routesIcons from './custom/routesIcons';
import TabNavigator from './components/TabNavigator';


import GLOBALS from './Globals';

import Ionicons from '@expo/vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
            headerTintColor: '#fff', // Change color of the icons
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
          title: 'Tasks App',
          height: 0,
          headerStyle: { backgroundColor: '#222f3e'},
          headerTitleStyle: { color: '#fff'},
          headerRight: () => (
            <TouchableOpacity onPress={()=> navigation.navigate('ReportScreen')}> 
              <Text style={{ color: '#fff', marginRight: 10, fontSize: 15}}>New</Text>
            </TouchableOpacity>
            )
        })}
      />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
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
        <Tab.Screen 
          name="Reporte"
          options= {()=> ({
            headerShown: false
          })}
          component={StackReportScreen} />
        <Tab.Screen 
          name="Empleados"
          options= {()=> ({
            headerShown: false
          })}
         component={StackRiskScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}