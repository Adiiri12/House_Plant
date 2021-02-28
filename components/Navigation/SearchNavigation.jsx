import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationScreens } from '../../common/navigation';
import SearchPage from '../../pages/Plants/SearchPage';
import MoreInfo from '../../pages/Plants/MoreInfo';

const SearchNavigationStack = createStackNavigator();

const SearchNavigationStackComponent = () => {
    return (
        <SearchNavigationStack.Navigator>
            <SearchNavigationStack.Screen
                name={NavigationScreens.Search.name}
                component={SearchPage}
                options={{
                    title: NavigationScreens.Search.title,
                }}
            />
                <SearchNavigationStack.Screen
                name={NavigationScreens.Info.name}
                component={MoreInfo}
                options={{
                    title: NavigationScreens.Info.title,
                }}
            />
        </SearchNavigationStack.Navigator>
    );
};

export default SearchNavigationStackComponent;