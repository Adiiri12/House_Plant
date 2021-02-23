import React from 'react';
import Navigation from './components/Navigation/Navigation';
import { AuthProvider } from './firebase/AuthProvider';
import { DefaultTheme } from '@react-navigation/native';
import StorageProvider from './firebase/StorageProvider';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#000',
        secondary: '#62BD69',
        background: '#eee',
    },
};

const App = () => {
    return (
        <AuthProvider>
            <StorageProvider>
                <Navigation theme={theme} />
            </StorageProvider>
        </AuthProvider>
    );
};

export default App;
