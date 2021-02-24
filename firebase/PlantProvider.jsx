import React, { useContext, useEffect, useState } from 'react';
import { storage, firestore } from './firebase';
import { useHouseholdStorage } from './HouseholdProvider';
import _ from 'lodash';

// PLANT DATA DEFINITION:
// name: name of plant
// decsription: description of plant
// lastWater: DateTime/Timestamp of when last watered
// imageURL: URL pointing to image in firebase storage

const PlantStorageContext = React.createContext();

export const FirebasePlantProvider = ({ children }) => {
    const images = storage.refFromURL('gs://myhouseplants-development.appspot.com/Images');

    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);

    const { households } = useHouseholdStorage();

    const addPlant = async (plant, imageData) => {
        const url = (await images.put(imageData)).ref.getDownloadURL();
        plant.imageURL = url;
        return firestore.collection('Plants').add(plant);
    };

    const updatePlant = (plantID, data) => {
        return firestore.collection('Plants').doc(plantID).update(data);
    };

    const deletePlant = (plantID) => {
        return firestore.collection('Plants').doc(plantID).delete();
    };

    useEffect(() => {
        const unsibscribe = firestore
            .collection('Plants')
            .where(
                'householdID',
                'in',
                !_.isEmpty(households) ? households.map((household) => household.id) : [0]
            )
            .onSnapshot((snapshot) => {
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setPlants(data);
                setLoading(false);
            });

        return unsibscribe;
    }, []);

    const value = {
        plants,
        addPlant,
        updatePlant,
        deletePlant,
    };

    return (
        <PlantStorageContext.Provider value={value}>
            {!loading && children}
        </PlantStorageContext.Provider>
    );
};

export const usePlantStorage = () => useContext(PlantStorageContext);
