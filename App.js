import React from 'react'
import { Text, 
  TouchableOpacity // eject touch por ejemplo a otrruta uso navigation que es una funcion en el atributo options por que inicialmente retornaba un object pero necsitaba un parametro por eso el metodo
 } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import TaskFormScreen from './screens/TaskFormScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen}  
          options= {({navigation})=> ({
            title: 'Tasks App',
            headerStyle: { backgroundColor: '#222f3e'},
            headerTitleStyle: { color: '#fff'},
            headerRight: () => (
              <TouchableOpacity onPress={()=> navigation.navigate('TaskFormScreen')}> 
                <Text style={{ color: '#fff', marginRight: 10, fontSize: 15}}>New</Text>
              </TouchableOpacity>
              )
          })}
        />
        <Stack.Screen 
          name="TaskFormScreen" 
          component={TaskFormScreen}
          options= {({navigation})=> ({
            title: 'Create a Task',
            headerStyle: { backgroundColor: '#222f3e'},
            headerTitleStyle: { color: '#fff'},
            headerTintColor: '#fff' // Change color of the icons
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App