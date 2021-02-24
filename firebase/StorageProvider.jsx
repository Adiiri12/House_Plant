import React from 'react';
import { FirebaseHouseholdProvider } from './HouseholdProvider';
import { FirebasePlantProvider } from './PlantProvider';
import { View } from 'react-native';

const FirebaseStorageProvider = ({ children }) => {
    return (
        <HouseholdProvider>
            <PlantProvider>{children}</PlantProvider>
        </HouseholdProvider>
    );
};

export default FirebaseStorageProvider;
