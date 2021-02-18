import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { PlantProvider } from './contexts/PlantContext';
import Navigation from './components/Navigation/Navigation';
import { AuthProvider } from './auth/AuthProvider';
import { DefaultTheme } from '@react-navigation/native';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#000',
        secondary: 'lightgreen',
        background: '#eee',
    },
};

const App = () => {
    return (
        <AuthProvider>
            <PlantProvider>
                <Navigation theme={theme}/>
            </PlantProvider>
        </AuthProvider>
    );
};

const styles = StyleSheet.create({});

export default App;
