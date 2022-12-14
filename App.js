//Dependencies react Natigation && elemets
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

//Screens
import LoginScreen from './screens/LoginScreen';
import RiskScreen from './screens/RiskScreen'
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen'
import WorkerScreen from './screens/WorkerScreen';
import ActivityScreen  from './screens/ActivityScreen';
import UpWorkerUpSreeen from './screens/UpWorkerUpSreeen';
import StatisticsScreen from './screens/StatisticsScreen';

//Styles Icons
import routesIcons from './custom/routesIcons';

//Redux && context
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { StateProvider } from './context/StateContext';

// Globas variables
import GLOBALS from './Globals';

// Icons
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import InitScreen from './screens/InitScreen';
import Profile from './components/Profile';

const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()




//------stack-----

function StackInitScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={InitScreen}
          options= {()=> ({
            headerShown: false
          })}
        />
      </Stack.Navigator>
  );
}


export function StackLoginScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options= {()=> ({
            title: "LOGIN",
            headerShown: false
          })}
        />
      </Stack.Navigator>
  );
}

function StackReportScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Reporte"
          component={ReportScreen}
          options= {()=> ({
            title: "Reporte",
            headerShown: false
          })}
        />
      </Stack.Navigator>
  );
}

function StackActivityScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Todo"
          component={ActivityScreen}
          options= {()=> ({
            title: "Actividades",
            headerShown: false
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
        options= {()=> ({
          title: "Lista",
          headerShown: false,
          
        })}
        // options= {({navigation})=> ({
        //   title: 'Lista reportes',
        //   headerStyle: {
        //     borderBottomEndRadius: 20,
        //     borderBottomStartRadius: 20
        //   },
        //   headerTitleStyle: { color: GLOBALS.COLOR.PRIMARY},
        //   headerRight: () => (
        //     <TouchableOpacity onPress={()=> {
        //       navigation.navigate('ReportScreen')
        //       }}>
        //       <Text style={{ color: 'black', marginRight: 10, fontSize: 15}}>Reportar</Text>
        //     </TouchableOpacity>
        //     )
        // })}
      />
    </Stack.Navigator>
  );
}


function StackWorkerScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Agregar"
          component={WorkerScreen}
          options= {()=> ({
            title: "WorkerScreen",
            headerShown: false,
            headerStyle: { backgroundColor: GLOBALS.COLOR.PRIMARY},
            headerTitleStyle: { color: '#fff'},
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
  );
}

function StackStaticsScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Indicadores"
          component={StatisticsScreen}
          options= {()=> ({
            title: "Indicadores",
            headerShown: false,
            headerStyle: { backgroundColor: GLOBALS.COLOR.PRIMARY},
            headerTitleStyle: { color: '#fff'},
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
  );
}


function StackUpWorkerScreen() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Datos Empleado"
          component={UpWorkerUpSreeen}
          options= {()=> ({
            title: "Datos Empleado",
            headerShown: false,
            headerStyle: { backgroundColor: GLOBALS.COLOR.SECONDARY},
            headerTitleStyle: { color: '#fff'},
            headerTintColor: '#fff',
          })}
        />
      </Stack.Navigator>
  );
}



//Tab----------------

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: GLOBALS.COLOR.PRIMARY,
      tabBarinactiveTintColor: GLOBALS.COLOR.ICONSDOWN,
       tabBarIcon: ({ focused, color, size }) => {
         let iconName = routesIcons(focused, route.name)
       return <Ionicons name={iconName} size={size} color={color}/>;
       },
       tabBarStyle: {
         height:65,
         paddingBottom:10,
         paddingTop:10,
         backgroundColor: GLOBALS.COLOR.SECONDARY
     }
   })}
    >
     <Tab.Screen name="Tools" 
      options= {()=> ({
        title: "Herramientas",
        headerShown: false
      })}
     component={HomeScreen} />
     <Tab.Screen name="Todo" 
     component={StackActivityScreen}
      options= {()=> ({
        title: "Actividades",
        headerShown: false
      })}
      />
     
     {/* <Tab.Screen
       name="ReportScreen"
       options= {()=> ({
         title: "Reporte",
         headerShown: false
       })}
       component={StackReportScreen} /> */}
     <Tab.Screen
      name="RiskScreen"
      component={StackRiskScreen}
      options= {()=> ({
        title: "Lista",
        headerShown: false
      })}
      />
   </Tab.Navigator>
  )
}


//-------------CustomDrawer-------------
const CustomDrawerContent = (props) => {
  return (
    <View style={{flex:1}}>
    <Profile/>
    <DrawerContentScrollView
      style={styles.drawerContent}
    {...props}>
      {
        Object.entries(props.descriptors).map(([key, descriptor], index) => {
          const focused = index === props.state.index
          let iconName = routesIcons(focused,descriptor.route.name)
          if (!descriptor.options.title) {
            return
          }
          return (
          
            <DrawerItem
              key={key}
              label={() => (
                <View style={focused ?  styles.drawerViewtFocused : styles.drawerView}>
                  <View style={styles.drawerView}>
                    <Ionicons name={iconName} size={GLOBALS.SIZE.MEDIUM} color={GLOBALS.COLOR.ICONSDOWN}/>
                    <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>
                      {descriptor.options.title}
                    </Text>
                  </View>
                  {focused ?<Ionicons name='arrow-back-outline' size={GLOBALS.SIZE.MEDIUM} color={GLOBALS.COLOR.ICONS}/> : null }
                  
                </View>
                
                )}
                onPress={() => descriptor.navigation.navigate(descriptor.route.name)}
                style={[styles.drawerItem]}
                // style={[styles.drawerItem, focused ? styles.drawerItemFocused : null]}
                // cuando precio le doy stylo a drawer
                />
          
          )
        })
      }
    </DrawerContentScrollView>
    </View>
  )
}



//Drawer-------------
export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    useLegacyImplementation={true}
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: GLOBALS.COLOR.PRIMARY,
        height: 50,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
      },
      headerTitleStyle: {
        fontSize: GLOBALS.FONT.EXTRA_BIG,
        textAlign: 'center',
        fontWeight: GLOBALS.WEIGHT.MEDIUM,
      },
      headerTitleAlign: "center",
      headerTintColor: GLOBALS.COLOR.THETIARY,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
           <MaterialIcons name="menu-open" size={GLOBALS.SIZE.EXTRA_BIG} color={GLOBALS.COLOR.ICONSDOWN} />
        </TouchableOpacity>
      ),
    })}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    > 
      <Drawer.Screen name="Tools" component={BottomTabNavigator}
        options={{
          title: 'Spinobrac',
        }}
      />
      <Drawer.Screen name="Todo" component={StackActivityScreen}
        options={{
          title: 'Actividades',
        }}
      />
      <Drawer.Screen name="RiskScreen" component={StackRiskScreen}
        options={{
          title: 'Lista',
        }}
      />
      <Drawer.Screen name="WorkerScreen" component={StackWorkerScreen}
        options={{
          title: 'Agregar',
          headerShown: false
        }}
      />
      <Drawer.Screen name="Datos Empleado" component={StackUpWorkerScreen}
        options={{
          headerShown: false
        }}
      />
      <Drawer.Screen name="Reporte" component={StackReportScreen}
        options={{
          headerShown: false
        }}
      />
      <Drawer.Screen name="Indicadores" component={StackStaticsScreen}
        options={{
          headerShown: false
        }}
      />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: GLOBALS.COLOR.SECONDARY,
    paddingRight: 15,
    borderTopRightRadius: 50,
    marginTop: -50,

  },
  drawerItem: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 0,
    marginLeft: '5%',
    flexDirection: 'column',
    height:55,
    marginBottom: 0
  },
  drawerView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  drawerViewtFocused:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginLeft:12
  },
  headerLeft: {
    marginLeft: 15,

  },
  // drawer content
  drawerLabel: {
    fontSize: GLOBALS.SIZE.EXTRA_SMALL,
    marginLeft:20,
    color: GLOBALS.COLOR.ICONSDOWN,
  },
  drawerLabelFocused: {
    fontSize: GLOBALS.SIZE.EXTRA_SMALL,
    color: GLOBALS.COLOR.THETIARY,
    fontWeight: '800',
    marginLeft:20,
  }
})

export default function App() {
  return (
    <Provider store={store}>
      <StateProvider>
        <NavigationContainer>
          <StackInitScreen/>
        </NavigationContainer>
      </StateProvider>
    </Provider>
  );
}