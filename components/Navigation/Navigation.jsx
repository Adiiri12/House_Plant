import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../auth/AuthProvider';
import AuthNavigationStackComponent from './AuthNavigationStack';
import HomeNavigationStackComponent from './HomeNavigationStack';
import PlantsNavigationStackComponent from './PlantsNavigationStack';
import ProfileNavigationStackComponent from './ProfileNavigationStack';
import { NavigationTabs } from '../../common/navigation';

const TabNavigator = createBottomTabNavigator();

const Navigation = ({ theme }) => {
    const { currentUser } = useAuth();

    return (
        <NavigationContainer theme={theme}>
            {!currentUser && <AuthNavigationStackComponent />}
            {currentUser && (
                <TabNavigator.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName = '';

                            if (route.name === NavigationTabs.Home.name) {
                                iconName = 'home';
                            } else if (route.name === NavigationTabs.Plants.name) {
                                iconName = 'leaf';
                            } else if (route.name === NavigationTabs.Profile.name) {
                                iconName = 'person';
                            }

                            return (
                                <Ionicons
                                    name={iconName}
                                    ios={`ios-${iconName}`}
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                    })}
                >
                    <TabNavigator.Screen
                        name={NavigationTabs.Home.name}
                        component={HomeNavigationStackComponent}
                        options={{ title: NavigationTabs.Home.title }}
                    />
                    <TabNavigator.Screen
                        name={NavigationTabs.Plants.name}
                        component={PlantsNavigationStackComponent}
                        options={{ title: NavigationTabs.Plants.title }}
                    />
                    <TabNavigator.Screen
                        name={NavigationTabs.Profile.name}
                        component={ProfileNavigationStackComponent}
                        options={{ title: NavigationTabs.Profile.title }}
                    />
                </TabNavigator.Navigator>
            )}
        </NavigationContainer>
    );
}

export default Navigation;