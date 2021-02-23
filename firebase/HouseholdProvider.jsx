import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { firestore } from './firebase';

const HouseholdStorageContext = React.createContext();

export const HouseholdProvider = ({ children }) => {
    const { currentUser } = useAuth();

    const [households, setHouseholds] = useState([]);
    const [loading, setLoading] = useState(true);

    const addHousehold = (household) => {
        return firestore.collection('Households').add(household);
    };

    const updateHousehold = (householdID, data) => {
        return firestore.collection('Households').doc(householdID).update(data);
    };

    const deleteHousehold = (householdID) => {
        return firestore.collection('Households').doc(householdID).delete();
    };

    useEffect(() => {
        const unsibscribe = firestore
            .collection('Households')
            .where('users', 'array-contains', currentUser?.uid || 0)
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setHouseholds(data);
                setLoading(false);
            });

        return unsibscribe;
    }, []);

    const value = {
        households,
        addHousehold,
        updateHousehold,
        deleteHousehold,
    };

    return (
        <HouseholdStorageContext.Provider value={value}>
            {!loading && children}
        </HouseholdStorageContext.Provider>
    );
};

export const useHouseholdStorage = () => useContext(HouseholdStorageContext);
