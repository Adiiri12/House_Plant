import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationScreens } from '../../common/navigation';
import AddPlantPage from '../../pages/Plants/AddPlantPage';
import EditPlantPage from '../../pages/Plants/EditPlantPage';
import MyPlantsPage from '../../pages/Plants/MyPlantsPage';
import MyHouseholdsPage from '../../pages/Plants/MyHouseholdsPage';
import AddHouseholdPage from '../../pages/Plants/AddHouseholdPage';

const PlantsNavigationStack = createStackNavigator();

const PlantsNavigationStackComponent = () => {
    return (
        <PlantsNavigationStack.Navigator>
            <PlantsNavigationStack.Screen
                name={NavigationScreens.Households.name}
                component={MyHouseholdsPage}
                options={{
                    title: NavigationScreens.Households.title,
                }}
            />
            <PlantsNavigationStack.Screen
                name={NavigationScreens.AddHousehold.name}
                component={AddHouseholdPage}
                options={{
                    title: NavigationScreens.AddHousehold.title,
                }}
            />
            <PlantsNavigationStack.Screen
                name={NavigationScreens.Plants.name}
                component={MyPlantsPage}
                options={{
                    title: NavigationScreens.Plants.title,
                }}
            />
            <PlantsNavigationStack.Screen
                name={NavigationScreens.AddPlant.name}
                component={AddPlantPage}
                options={{
                    title: NavigationScreens.AddPlant.title,
                }}
            />
            <PlantsNavigationStack.Screen
                name={NavigationScreens.EditPlant.name}
                component={EditPlantPage}
                options={{
                    title: NavigationScreens.EditPlant.title,
                }}
            />
        </PlantsNavigationStack.Navigator>
    );
};

export default PlantsNavigationStackComponent;
