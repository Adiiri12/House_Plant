import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../firebase/AuthProvider';
import AuthNavigationStackComponent from './AuthNavigationStack';
import HomeNavigationStackComponent from './HomeNavigationStack';
import PlantsNavigationStackComponent from './PlantsNavigationStack';
import ProfileNavigationStackComponent from './ProfileNavigationStack';
import SearchNavigationStackComponent from './SearchNavigation';
import { NavigationTabs } from '../../common/navigation';
import { useTheme } from 'react-navigation';

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
                            } else if (route.name === NavigationTabs.Search.name) {
                                iconName = 'search';
                            }

                            return (
                                <Ionicons
                                    name={iconName}
                                    ios={`ios-${iconName}`}
                                    size={size}
                                    color={focused ? theme.colors.secondary : color}
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
                        name={NavigationTabs.Search.name}
                        component={SearchNavigationStackComponent}
                        options={{ title: NavigationTabs.Search.title }}
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
};

export default Navigation;
