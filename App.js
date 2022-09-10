//Dependencies react Natigation && elemets
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

//Screens
import RiskScreen from './screens/RiskScreen'
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen'
import AddWorker from './screens/AddWorker';

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
import { MaterialIcons } from '@expo/vector-icons';
import { notInitialized } from 'react-redux/es/utils/useSyncExternalStore';

const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()




//------stack-----

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


function StackAddWorker() {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="AddWorker"
          component={AddWorker}
          options= {()=> ({
            title: "AddWorker",
            headerStyle: { backgroundColor: GLOBALS.COLOR.PRIMARY},
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
     <Tab.Screen name="Home" 
      options= {()=> ({
        title: "Spinobrac",
        headerShown: false
      })}
     component={HomeScreen} />
     <Tab.Screen name="todo" component={TodoApp} />
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
    <DrawerContentScrollView
      style={styles.drawerContent}
    {...props}>
      {
        Object.entries(props.descriptors).map(([key, descriptor], index) => {
          const focused = index === props.state.index
          let iconName = routesIcons(focused,descriptor.route.name)
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
  )
}



//Drawer-------------
const DrawerNavigator = () => {
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
      <Drawer.Screen name="Home" component={BottomTabNavigator}
        options={{
          title: 'Spinobrac',
        }}
      />
      <Drawer.Screen name="Reporte" component={StackReportScreen}
        options={{
          title: 'Reporte',
          headerShown: false
        }}
      />
      <Drawer.Screen name="RiskScreen" component={StackRiskScreen}
        options={{
          title: 'Lista',
        }}
      />
      <Drawer.Screen name="Worker" component={StackAddWorker}
        options={{
          title: 'Agregar',
        }}
      />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: GLOBALS.COLOR.SECONDARY,
    paddingRight: 10,
    paddingTop: 20,
  },
  drawerItem: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 0,
    marginLeft: '5%',
    flexDirection: 'column',
    height:49,
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
          <DrawerNavigator />
        </NavigationContainer>
      </StateProvider>
    </Provider>
  );
}