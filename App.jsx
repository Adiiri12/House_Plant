import React from 'react';
import Navigation from './components/Navigation/Navigation';
import { AuthProvider } from './firebase/AuthProvider';
import { DefaultTheme } from '@react-navigation/native';
import FirebaseStorageProvider from './firebase/StorageProvider';
import { FirebasePlantProvider } from './firebase/PlantProvider';
import { PlantProvider } from './contexts/PlantContext';

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
            {/* <FirebaseStorageProvider> */}
            <PlantProvider>
                <Navigation theme={theme} />
            </PlantProvider>
            {/* </FirebaseStorageProvider> */}
        </AuthProvider>
    );
};

export default App;
