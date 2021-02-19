import React, { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = 'Plant_Storage_v2';

const PlantContext = React.createContext();

const Plant = (state, action) => {
    switch (action.type) {
        case 'addPlant':
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 999999),
                    title: action.payload.title,
                    content: action.payload.content,
                    image: action.payload.image,
                    date : new Date()
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
                    date : new Date(action.payload.date)
                },
            ];
        default:
            return state;
    }
};

const Myplants = [];

export const PlantProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Plant, Myplants);
    useEffect(() => {
        const loadStorage = async () => {
            const storage = await AsyncStorage.getItem(STORAGE_KEY);
            if (storage !== null && state.length === 0) {
                let initialState = JSON.parse(storage);
                initialState.forEach((element) => {
                    dispatch({ type: 'LoadData', payload: element });
                });
            }
        };
        loadStorage();
    }, [STORAGE_KEY]); // Persistant Storage until we move it to external storage

    const addPlant = (title, content, uri, callback) => {
        dispatch({ type: 'addPlant', payload: { title, content, image: uri,} });
        dispatch({ type: 'SaveData' });
        if (callback) {
            callback();
        }
    };

    const updatePlant = (id,title, content, uri,date,callback) => {
        dispatch({ type: 'Update', payload: {id,title, content, image: uri,date} });
        dispatch({ type: 'SaveData' });
        if (callback) {
            callback();
        }
    };

    const deletePlant = (id, callback) => {
        dispatch({ type: 'Delete', payload: { id: id } });
        dispatch({ type: 'SaveData' });
        if (callback) {
            callback();
        }
    };


    const DateUpdate = (date,callback) =>{
        dispatch({ type: 'Update', payload: { date } });
        dispatch({ type: 'SaveData' });
        if (callback) {
            callback();
        }
    };
    return (
        <PlantContext.Provider
            value={{
                state: state,
                create: addPlant,
                Updating: updatePlant,
                remove: deletePlant,
                water : DateUpdate
            }}
        >
            {children}
        </PlantContext.Provider>
    );
};

export default PlantContext;
