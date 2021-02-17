import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import{createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddPlants from './pages/AddPlant';
import Plants from './pages/MyPlantsPage';
import Home from './pages/HomePage';



const Stack = new createStackNavigator();
const Tab = createBottomTabNavigator();

function PlantPages(){
  return(
    <Stack.Navigator 
    screenOptions = {{
        headerStyle:{
            backgroundColor : '#00008b',
        },
        headerTintColor : '#fff',
        headerTitleStyle : {
            fontWeight : 'bold',
        },
    }}
    >
    <Stack.Screen
      name = 'Home'
      component = {Plants}
      options = {{title: "My Plants"}}
    />
    <Stack.Screen
   name = 'Add'
   component = {AddPlants}
    options = {{title: "Add"}}
    />
    </Stack.Navigator>
  );
}

function HomeTab(){
  return(
    <Stack.Navigator 
    screenOptions = {{
        headerStyle:{
            backgroundColor : '#00008b',
        },
        headerTintColor : '#fff',
        headerTitleStyle : {
            fontWeight : 'bold',
        },
    }}
    >
     <Stack.Screen
      name = 'Home'
      component = {Home}
      options = {{title: "Home"}}
    />
    </Stack.Navigator>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style : {backgroundColor : '#00008b'},
          activeTintColor: '#FFF700',
          inactiveTintColor: 'white',    
        }}>
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="Home"
                color= 'white'
                size={size}
              />
            ),
          }}/>
           <Tab.Screen
          name="Plants"
          component={PlantPages}
          options={{
            tabBarLabel: 'Plants',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="leaf"
                color= 'white'
                size={size}
              />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
