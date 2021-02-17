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
import {PlantProvider} from './context/PlantContext'
import Camera from './pages/CameraPage';



const Stack = new createStackNavigator();
const Tab = createBottomTabNavigator();

function PlantPages(){
  return(
    <Stack.Navigator 
    screenOptions = {{
        headerStyle:{
            backgroundColor : '#FFFFFF',
        },
        headerTintColor : 'black',
        headerTitleStyle : {
            fontWeight : 'bold',
        },
    }}
    >
    <Stack.Screen
      name = 'Plants'
      component = {Plants}
      options = {{title: "My Plants"}}
    />
    <Stack.Screen
   name = 'Add'
   component = {AddPlants}
    options = {{title: "Add"}}
    />
     <Stack.Screen
    name = 'Camera'
    component = {Camera}
    options = {{title: "Camera"}}
    />
    </Stack.Navigator>
  );
}

function HomeTab(){
  return(
    <Stack.Navigator 
    screenOptions = {{
        headerStyle:{
            backgroundColor : '#FFFFFF',
        },
        headerTintColor : 'black',
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
    <PlantProvider>
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style : {backgroundColor : '#FFFFFF'},
          activeTintColor: 'blue',
          inactiveTintColor: 'black',    
        }}>
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="Home"
                color= 'green'
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
                color= 'green'
                size={size}
              />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
    </PlantProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
