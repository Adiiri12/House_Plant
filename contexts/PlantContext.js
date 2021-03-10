import React, { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { usePlantStorage } from '../firebase/PlantProvider';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const STORAGE_KEY = 'Plant_Storage_v2';

const PlantContext = React.createContext();

const PlantReducer = (state, action) => {
	switch (action.type) {
		case 'Add':
			return [
				...state,
				{
					id: action.payload.id || uuid(),
					name: action.payload.name,
					description: action.payload.description,
					imageURL: action.payload.imageURL,
					lastWatered: action.payload.lastWatered,
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
					imageURL: action.payload.imageURL,
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

	const addPlant = async (name, description, uri, lastWatered, callback) => {
		const plant = { type: 'Add', payload: { id: uuid(), name, description, imageURL: uri, lastWatered } };
		setPlants(plant);
		setPlants({ type: 'SaveData' });
		if (callback) {
			await callback(plant);
		}
	};

	const updatePlant = async (id, name, description, uri, lastWatered, callback) => {
		const plant = { type: 'Update', payload: { id, name, description, imageURL: uri, lastWatered } };
		setPlants(plant);
		setPlants({ type: 'SaveData' });
		if (callback) {
			await callback(plant);
		}
	};

	const deletePlant = async (id, callback) => {
		setPlants({ type: 'Delete', payload: { id: id } });
		setPlants({ type: 'SaveData' });
		if (callback) {
			await callback();
		}
	};

	const DateUpdate = async (id, date, callback) => {
		setPlants({ type: 'Update', payload: { id, date } });
		setPlants({ type: 'SaveData' });
		if (callback) {
			await callback();
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
