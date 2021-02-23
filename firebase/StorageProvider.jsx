import React from 'react';
import { HouseholdProvider } from './HouseholdProvider';
import { PlantProvider } from './PlantProvider';

const StorageProvider = ({ children }) => {
    return (
        <HouseholdProvider>
            <PlantProvider>{children}</PlantProvider>
        </HouseholdProvider>
    );
};

export default StorageProvider;
