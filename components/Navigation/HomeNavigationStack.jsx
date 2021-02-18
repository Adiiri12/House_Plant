import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationScreens } from '../../common/navigation';
import HomePage from '../../pages/Home/HomePage';

const HomeNavigationStack = createStackNavigator();

const HomeNavigationStackComponent = () => {
    return (
        <HomeNavigationStack.Navigator>
            <HomeNavigationStack.Screen
                name={NavigationScreens.Home.name}
                component={HomePage}
                options={{ title: NavigationScreens.Home.title }}
            />
        </HomeNavigationStack.Navigator>
    );
};

export default HomeNavigationStackComponent;
