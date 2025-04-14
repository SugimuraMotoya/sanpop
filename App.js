import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './src/screens/Home';
import Map from './src/screens/Map';
import Diary from './src/screens/Diary';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Map') {
              iconName = 'map';
            } else if (route.name === 'Diary') {
              iconName = 'book';
            }

            return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Diary" component={Diary} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
