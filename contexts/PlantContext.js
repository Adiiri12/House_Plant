import React, { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = 'Plant_Storage_v2';

const PlantContext = React.createContext();

// TODO: change to correct plant structure

const PlantReducer = (state, action) => {
    switch (action.type) {
        case 'Add':
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 999999),
                    name: action.payload.name,
                    description: action.payload.description,
                    imageURL : action.payload.imageURL ,
                    lastWatered : action.payload.lastWatered ,
                },
            ];
        case 'Update':
            return state.map((e) => {
                if (e.id === action.payload.id) {
                    return action.payload;
                } else {
                    return e;
                }
            });
        case 'Delete':
            return state.filter((e) => e.id !== action.payload.id);
        case 'SaveData':
            try {
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (e) {
                console.log(e);
            } finally {
                return state;
            }
        case 'LoadData':
            return [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    description: action.payload.description,
                    imageURL : action.payload.imageURL ,
                    lastWatered: new Date(action.payload.lastWatered),
                },
            ];
        default:
            return state;
    }
};

const Myplants = [];

export const PlantProvider = ({ children }) => {
    const [plants, setPlants] = useReducer(PlantReducer, Myplants);
    useEffect(() => {
        const loadStorage = async () => {
            const storage = await AsyncStorage.getItem(STORAGE_KEY);
            if (storage !== null && plants.length === 0) {
                let initialState = JSON.parse(storage);
                initialState.forEach((element) => {
                    setPlants({ type: 'LoadData', payload: element });
                });
            }
        };

        loadStorage();
    }, [STORAGE_KEY]); // Persistant Storage until we move it to external storage

    const addPlant = (name, description, uri, lastWatered, callback) => {
        setPlants({ type: 'Add', payload: { name, description, imageURL: uri, lastWatered } });
        setPlants({ type: 'SaveData' });
        if (callback) {
            callback();
        }
    };

    const updatePlant = (id, name, description, uri, lastWatered, callback) => {
        setPlants({ type: 'Update', payload: { id, name, description, imageURL: uri, lastWatered } });
        setPlants({ type: 'SaveData' });
        if (callback) {
            callback();
        }
    };

    const deletePlant = (id, callback) => {
        setPlants({ type: 'Delete', payload: { id: id } });
        setPlants({ type: 'SaveData' });
        if (callback) {
            callback();
        }
    };

    const DateUpdate = (id, date, callback) => {
        setPlants({ type: 'Update', payload: { id, date } });
        setPlants({ type: 'SaveData' });
        if (callback) {
            callback();
        }
    };
    return (
        <PlantContext.Provider
            value={{
                state: plants,
                create: addPlant,
                Updating: updatePlant,
                remove: deletePlant,
                water: DateUpdate,
            }}
        >
            {children}
        </PlantContext.Provider>
    );
};

export default PlantContext;
