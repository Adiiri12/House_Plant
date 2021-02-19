import React, { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = 'Plant_Storage_v2';

const PlantContext = React.createContext();

const PlantReducer = (state, action) => {
    switch (action.type) {
        case 'Add':
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 999999),
                    title: action.payload.title,
                    content: action.payload.content,
                    image: action.payload.image,
                    date: new Date(),
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
                    title: action.payload.title,
                    content: action.payload.content,
                    image: action.payload.image,
                    date: new Date(action.payload.date),
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

    const addPlant = (title, content, uri, callback) => {
        setPlants({ type: 'addPlant', payload: { title, content, image: uri } });
        setPlants({ type: 'SaveData' });
        if (callback) {
            callback();
        }
    };

    const updatePlant = (id, title, content, uri, date, callback) => {
        setPlants({ type: 'Update', payload: { id, title, content, image: uri, date } });
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

    const DateUpdate = (date, callback) => {
        setPlants({ type: 'Update', payload: { date } });
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
