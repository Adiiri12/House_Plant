import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationScreens } from '../../common/navigation';
import ResetPasswordPage from '../../pages/Auth/ResetPasswordPage';
import SignInPage from '../../pages/Auth/SignInPage';
import SignUpPage from '../../pages/Auth/SignUpPage';

const AuthNavigationStack = createStackNavigator();

const AuthNavigationStackComponent = () => {
    return (
        <AuthNavigationStack.Navigator>
            <AuthNavigationStack.Screen
                name={NavigationScreens.SignIn.name}
                component={SignInPage}
                options={{ title: NavigationScreens.SignIn.title }}
            />
            <AuthNavigationStack.Screen
                name={NavigationScreens.SignUp.name}
                component={SignUpPage}
                options={{ title: NavigationScreens.SignUp.title }}
            />
            <AuthNavigationStack.Screen
                name={NavigationScreens.ResetPassword.name}
                component={ResetPasswordPage}
                options={{ title: NavigationScreens.ResetPassword.title }}
            />
        </AuthNavigationStack.Navigator>
    );
};

export default AuthNavigationStackComponent;
