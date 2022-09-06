import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabNavigator = ({HomeScreen, TaskFormScreen}) => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={TaskFormScreen} />
      </Tab.Navigator>
  );
}

export default TabNavigator;

